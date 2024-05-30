import Stripe from 'stripe';
import 'dotenv/config';

const stripeKey = process.env.STRIPE_SECRET_KEY as string;

const stripeClient = new Stripe(stripeKey);

export default stripeClient;