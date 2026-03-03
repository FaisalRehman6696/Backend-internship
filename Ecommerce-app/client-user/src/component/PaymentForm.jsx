import { CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCard } from "../counter/cardSlice";
import { useDispatch } from "react-redux";
import { persistor } from "../app/store";
const PaymentForm = () => {
  const location = useLocation();
  const { clientSecret } = location.state || {};
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [billingdetail, setBillingDetail] = useState({
    name: "",
  });
  const handleInput = (e) => {
    setBillingDetail({ ...billingdetail, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const card = elements.getElement(CardNumberElement);
    if (!stripe || !elements) return;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: billingdetail.name,
        },
      },
    });
    console.log(result);
    if (result.error) {
      alert(result.error.message);
      setLoading(false);
    } else {
      try {
        if (result.paymentIntent.status === "succeeded") {
          const res = await axios.post("http://localhost:8000/verifypayment", {
            paymentIntentId: result.paymentIntent.id,
          });
          if (res.data.success === true) {
            toast.success("sucessfull verify");
            dispatch(clearCard());
            await persistor.flush();
            navigate("/");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <h1 className="flex justify-center items-center mt-10 font-inter font-bold text-2xl overflow-y-auto">
        Add Payment Method
      </h1>
      <div className="w-full max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white mt-12 overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="mt-6 font-inter font-bold text-sm">Payment Method</h1>
          <div>
            <input
              name="name"
              required
              placeholder="name on card"
              className="border p-2 w-full rounded mt-6"
              onChange={handleInput}
            />
          </div>

          <div className="max-w-md mx-auto mt-10">
            <CardNumberElement className="border p-3 rounded" />
          </div>
          <div className="max-w-md mx-auto mt-10">
            <CardExpiryElement className="border p-3 rounded" />
          </div>
          <div className="max-w-md mx-auto mt-10">
            <CardCvcElement className="border p-3 rounded" />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-500 text-white px-5 py-2 rounded mt-6 cursor-pointer"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
