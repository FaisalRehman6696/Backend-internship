import Stripe from "stripe";

export const stripe = new Stripe(process.env.SECRET_key);

export default stripe;
