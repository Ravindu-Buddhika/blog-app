import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia' as any,
});

export async function POST(request: Request) {
  try {
    const { priceAmount, userId, userEmail } = await request.json();


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'sgd',
            product_data: {
              name: `Premium Membership Plan (Rs. ${priceAmount})`,
              description: 'Unlock exclusive premium blog contents and features.',
            },
            unit_amount: priceAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/subscribe`,

      metadata: {
        userId: userId,
        userEmail: userEmail,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Session Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}