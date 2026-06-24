import "server-only";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  lawyer_payment: "price_1TlDG2FNpS9hO6VuTwX7fOpP",
};