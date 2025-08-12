import { STRIPE_SECRET_KEY } from '@/constants'
// import 'server-only'
export const runtime = 'nodejs';

import Stripe from 'stripe'

export const stripe = new Stripe(STRIPE_SECRET_KEY)