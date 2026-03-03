import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Typography from "./common/Typography";
import { Heart, LoaderPinwheel, Star, Truck } from "lucide-react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AddCard, RemoveCard } from "../counter/cardSlice";
import { fetchProductsById } from "../services/productServices";
import { toast } from "react-toastify";
import handleFeedback from "../services/feedbackService";
const Size = ["XS", "S", "M", "XL", "L"];
const colors = ["#DB4444", "#E07575", "#000000", "#00FF66"];

const ProductDetail = () => {
  const path = window.location.pathname.split("/").filter(Boolean);
  const navigate = useNavigate();
  // product id
  const { id } = useParams();
  const [input, setInput] = useState();
  const [starrating, setStarRating] = useState(0);
  let handleClick = (star) => {
    setStarRating(Number(star));
  };
  const handleSubmit = async () => {
    try {
      const res = await handleFeedback(id, input, starrating);

      toast.success(res.message);
      setInput("");
      setStarRating(0);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const dispatch = useDispatch();
  const selecter = useSelector((state) =>
    state?.card?.product.find((item) => item._id === id)
  );

  const [colorchange, setColorChange] = useState("#DB4444");
  const [product, setProduct] = useState(null);
  const [productimg, setProductImg] = useState();
  const [rating, setRating] = useState(null);
  const FetchProduct = async (id) => {
    try {
      const res = await fetchProductsById(id);
      setProduct(res.data.product);
      setRating(res.data.average);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
  useEffect(() => {
    if (id) FetchProduct(id);
  }, [id]);
  if (!product) return;
  const { name, imageUrl, images, description, feedbackId, price } = product;
  return (
    <div>
      <Navbar id={id} />
      <div className=" w-full max-w-6xl mx-auto mt-20 px-4">
        <ol className=" flex space-x-1 md:space-x-3 font-popinns font-normal text-xs md:text-sm">
          <Link to="/" className="opacity-50">
            Home
          </Link>
          <li className="opacity-50">/</li>
          <li className="opacity-50 flex items-center cursor-pointer">
            {" "}
            {path[0]}
          </li>
          <li className="opacity-50">/ </li>
          <li className=""> {name}</li>
        </ol>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full max-w-[1170px] px-4 md:px-6 mx-auto mt-10 md:mt-20">
        {/* LEFT SECTION: Images */}
        <div className="flex flex-col-reverse md:flex-row gap-4 w-full lg:w-3/5">
          {/* Thumbnails List */}
          <div className="flex flex-row md:flex-col gap-3 ">
            {images?.map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-[150px] md:h-[138px] bg-[#F5F5F5] rounded-sm overflow-hidden"
              >
                <img
                  onClick={() => setProductImg(img)}
                  src={`http://localhost:8000/${img}`}
                  alt="thumbnail"
                  className="w-full h-full object-contain cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>

          {/* Main Large Image */}
          <div className="w-full bg-[#F5F5F5] rounded-sm flex items-center justify-center h-[350px] sm:h-[450px] md:h-[600px]">
            <img
              src={`http://localhost:8000/${imageUrl}`}
              alt="Main product"
              className="max-h-full max-w-full object-contain p-4"
            />
          </div>
        </div>

        {/* RIGHT SECTION: Content Details */}
        <div className="w-full lg:w-2/5 space-y-5">
          {/* Name & Rating */}
          <div className="space-y-3">
            <h1 className="font-inter font-semibold text-2xl md:text-3xl">
              {name}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <span key={index}>
                    {index + 1 <= rating ? (
                      <FaStar color="#FFAD33" />
                    ) : (
                      <FaRegStar />
                    )}
                  </span>
                ))}
              </div>
              <span className="text-sm opacity-50">
                ({product.feedbackId?.length} Reviews)
              </span>
              <span className="hidden sm:block border-r border-black/30 h-4"></span>
              <span className="text-[#00FF66] text-sm">In stock</span>
            </div>
            <div className="font-inter text-2xl">${price}</div>
          </div>

          <p className="font-popinns text-sm leading-6 text-gray-700 text-justify max-w-[400px]">
            {description}
          </p>

          <hr className="opacity-30" />

          {/* Colors & Sizes */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-inter text-xl">Colors:</span>
              <div className="flex gap-2">
                {colors.map((color, index) => (
                  <span
                    key={index}
                    onClick={() => setColorChange(color)}
                    className={`w-5 h-5 rounded-full cursor-pointer ring-2 ring-offset-2 ${
                      colorchange === color ? "ring-black" : "ring-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-inter text-xl">Size:</span>
              <div className="flex gap-2">
                {Size.map((s, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-center border border-black/30 rounded-md w-8 h-8 text-sm font-medium hover:bg-[#DB4444] hover:text-white transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions: Quantity & Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center border border-black/30 rounded-md overflow-hidden">
              <button
                onClick={() => dispatch(RemoveCard({ _id: id }))}
                className="w-10 h-10 hover:bg-[#DB4444] hover:text-white transition-colors"
              >
                -
              </button>
              <span className="w-12 text-center font-medium border-x border-black/30 leading-10">
                {selecter?.quantity || 0}
              </span>
              <button
                onClick={() =>
                  dispatch(AddCard({ _id: id, name, imageUrl, price }))
                }
                className="w-10 h-10 hover:bg-[#DB4444] hover:text-white transition-colors"
              >
                +
              </button>
            </div>

            <Link
              to="/cart"
              className="flex-1 bg-[#DB4444] text-white rounded-md flex items-center justify-center font-medium h-10 min-w-[120px]"
            >
              Buy Now
            </Link>

            <button className="w-10 h-10 border border-black/30 rounded-md flex items-center justify-center hover:bg-gray-50">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Info Box */}
          <div className="border border-black/30 rounded-md divide-y divide-black/30">
            <div className="flex items-center gap-4 p-4">
              <Truck className="w-8 h-8" />
              <div>
                <p className="font-medium">Free Delivery</p>
                <p className="text-xs underline cursor-pointer">
                  Enter your postal code for Availability
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <LoaderPinwheel className="w-8 h-8" />
              <div>
                <p className="font-medium">Return Delivery</p>
                <p className="text-xs">
                  Free 30 Days Delivery Returns.{" "}
                  <span className="underline cursor-pointer">Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*last component*/}
      <div className="w-full max-w-6xl mx-auto mt-20 px-4">
        {Array.isArray(feedbackId) && feedbackId.length > 0
          ? feedbackId.map((rs) => {
              const { _id, userId, date, comment } = rs;
              const userName = userId?.name
                ?.split(" ")
                .map((item) => item.charAt(0))
                .join("");

              return (
                <React.Fragment key={_id}>
                  <div className="flex justify-between w-full mt-20">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-16 h-16 bg-[#F5F5F5] rounded-full">
                        {userName}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex">{userName}</div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, index) => {
                            const value = index + 1;
                            return (
                              <Typography variant="span" key={index}>
                                {value <= rating ? (
                                  <FaStar color="#FFAD33" />
                                ) : (
                                  <FaRegStar color="#000000" />
                                )}
                              </Typography>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col text-right">
                      <div className="text-green-500   ">verified</div>
                      <Typography className="">
                        {moment(date).format("ll")}
                      </Typography>
                    </div>
                  </div>
                  <Typography variant="p" className="mt-10">
                    {comment}
                  </Typography>
                </React.Fragment>
              );
            })
          : null}

        <div className="flex flex-col  mt-20">
          <textarea
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Something.... "
            required
            className=" w-full border h-28 py-2 border-black/30 outline-none rounded-[4px] px-2 font-popinns font-normal text-[16px] leading-6 bg-transparent "
          />

          <div className="flex mt-6 gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleClick(star)}
                className="cursor-pointer"
              >
                {starrating >= star ? (
                  <FaStar className="text-yellow-400 w-6 h-6" />
                ) : (
                  <FaRegStar className="text-black-400 w-6 h-6" />
                )}
              </span>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="md:w-28 mt-10 bg-[#DB4444] text-white px-5 py-3 rounded-[4px] cursor-pointer hover:bg-[#d72626]"
          >
            Comment
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
