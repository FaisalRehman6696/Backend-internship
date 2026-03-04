import AddressModel from "../models/addressModel.js";
import orderModel from "../models/orderModel.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import userModel from "../models/userModel.js";
import { SendMailOrder } from "../mailer/appMailer.js";
import { SendMailProcessOrder } from "../mailer/orderProcessing.js";
import { SendMailShippedOrder } from "../mailer/orderShipped.js";
import { SendMailDeliveredOrder } from "../mailer/orderDelivered.js";
import { SendMailCancelledOrder } from "../mailer/orderCancelled.js";
import { stripe } from "../config/stripe.js";
import paymentModel from "../models/paymentModel.js";
import refundModel from "../models/refundModel.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const { form, items, total, paymentMethod } = req.body.data;

    if (!form || !items || items.length === 0 || !total || !paymentMethod) {
      return errorResponse(res, 400, "fields are required");
    }

    let address = await AddressModel.findOne({ userId });

    if (!address) {
      address = new AddressModel({
        userId,
        name: form.name,
        streetAddress: form.streetAddress,
        apartment: form.apartment,
        city: form.city,
        phone: form.phone,
        email: form.email,
      });
      await address.save();
    } else {
      (address.name = form.name),
        (address.streetAddress = form.streetAddress),
        (address.apartment = form.apartment),
        (address.city = form.city),
        (address.phone = form.phone),
        (address.email = form.email),
        await address.save();
    }
    await userModel.findByIdAndUpdate(userId, { addressId: address._id });
    const mappedProduct = items.map((itm) => ({
      productId: itm._id,
      quantity: itm.quantity,
      price: itm.price,
      name: itm.name,
    }));
    const order = new orderModel({
      userId,
      products: mappedProduct,
      total,
      paymentMethod,
    });
    await order.save();
    if (paymentMethod === "cash") {
      SendMailOrder(form.name, form.email);
      return successResponse(res, "Thanks For Order Continue Shopping .....! ");
    }
    if (paymentMethod === "bank") {
      const payment = await stripe.paymentIntents.create({
        amount: total * 100,
        currency: "usd",
        payment_method_types: ["card"],
        receipt_email: form.email,
      });
      const paymentRecord = new paymentModel({
        userId,
        orderId: order._id,
        paymentIntentId: payment.id,
        amount: total,
        currency: "usd",
        status: "processing",
      });
      await paymentRecord.save();
      return successResponse(res, "Client Secret", {
        clientSecret: payment.client_secret,
      });
    }
  } catch (error) {
    console.log({ error });
    return errorResponse(res, 500, "internal Server Error");
  }
};
export const verifyPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return errorResponse(res, 400, "payment id required");
    }
    const result = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (result.status !== "succeeded") {
      return errorResponse(res, 400, "payment not completed");
    }
    const payment = await paymentModel.findOne({ paymentIntentId });
    if (!payment) {
      return errorResponse(res, 400, "paymentId not found");
    }
    payment.status = "paid";
    await payment.save();

    return successResponse(res, "sucessfully verified");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Internal server error");
  }
};
export const refundPaymentRequest = async (req, res) => {
  try {
    console.log("rout hit");
    const userId = req.user.id;
    const { selectorderid, reason } = req.body;
    console.log(req.body);
    if (!selectorderid || !reason) {
      return errorResponse(res, 400, "fields are required");
    }
    const payment = await paymentModel.findOne({ orderId: selectorderid });
    console.log(payment);
    const paymentRecord = new refundModel({
      userId,
      orderId: selectorderid,
      paymentIntent: payment.paymentIntentId,
      amount: payment.total,
      reason,
      refundStatus: "processing",
    });
    await paymentRecord.save();
    console.log(paymentRecord);
    return successResponse(res, "requested sucessful", paymentRecord);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "internal server error");
  }
};
export const fetchRefundStatus = async (req, res) => {
  try {
    console.log("rout hit");
    const { orderId } = req.params;
    const payment = await refundModel.findOne({ orderId });
    console.log(payment);
    return successResponse(res, "sucessful", payment);
  } catch (error) {
    return errorResponse(res, 500, "internal server error");
  }
};
export const getOrder = async (req, res) => {
  try {
    const order = await orderModel
      .find({})
      .populate({
        path: "userId",
        populate: {
          path: "addressId",
          model: "Address",
        },
      })
      .populate({
        path: "products.productId",
        select: "name imageUrl",
      });

    return successResponse(res, "Order get successfully", order);
  } catch (error) {
    return errorResponse(res, 500, "internal server error");
  }
};
export const getOrderById = async (req, res) => {
  try {
    const { _id } = req.params;
    const order = await orderModel.findById(_id).populate({
      path: "products.productId",
      select: "name imageUrl category",
    });
    return successResponse(res, "Order get successfully", order);
  } catch (error) {
    console.log({ error });
    return errorResponse(res, 500, "internal server error");
  }
};
export const getOrderByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    const order = await orderModel
      .find({
        userId,
      })
      .populate({ path: "products.productId", select: "name imageUrl price" });
    return successResponse(res, "Order get successfully", order);
  } catch (error) {
    return errorResponse(res, 500, "internal server error");
  }
};
export const getCancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const order = await orderModel.find({ userId, status: "Cancelled" });
    return successResponse(res, "Order get successfully", order);
  } catch (error) {
    return errorResponse(res, 500, "internal server error");
  }
};
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { _id } = req.params;

    const order = await orderModel
      .findByIdAndUpdate(_id, {
        status,
      })
      .populate("userId");
    const name = order.userId.name;
    const email = order.userId.email;
    if (status === "Processing") {
      await SendMailProcessOrder(name, email, order);
    }
    if (status === "shipped") {
      await SendMailShippedOrder(name, email, order);
    }
    if (status === "Delivered") {
      await SendMailDeliveredOrder(name, email, order);
    }
    if (status === "Cancelled") {
      await SendMailCancelledOrder(name, email);
    }

    return successResponse(res, "Order update successfully", order);
  } catch (error) {
    console.log({ error });
    return errorResponse(res, 500, "internal server error");
  }
};
export const getAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const order = await AddressModel.find({ userId });
    return successResponse(res, "Address get successfully", order);
  } catch (error) {
    return errorResponse(res, 500, "internal server error");
  }
};
export default {
  createOrder,
  getOrder,
  getOrderById,
  updateStatus,
  getCancelOrder,
  getAddress,
  verifyPayment,
  refundPaymentRequest,
  fetchRefundStatus,
};
