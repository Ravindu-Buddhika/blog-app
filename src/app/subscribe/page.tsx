'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabaseClient';

export default function SubscribePage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (planPrice: number) => {
    try {
      setLoadingPlan(planPrice.toString());

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        alert('Please login first to subscribe!');
        window.location.href = '/login';
        return;
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceAmount: planPrice,
          userId: session.user.id,
          userEmail: session.user.email,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Stripe session creation failed:', data.error);
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar user={null} userType="reader" />

      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-light tracking-tight text-slate-900 md:text-6xl">
          Be a Contributor
        </h1>
        <p className="text-slate-500 mt-4 text-lg">
          Lets be a Part of this amazing journey
        </p>

        {/* 📋 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16 items-stretch">
          
          {/* Card 1: Rs 0 */}
          <div className="bg-[#404040] rounded-2xl p-8 flex flex-col justify-between text-white shadow-lg min-h-[420px] text-left">
            <div>
              <h2 className="text-4xl font-normal">Rs 0</h2>
              <ul className="mt-8 space-y-4 text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" /> Read public Blogs
                </li>
              </ul>
            </div>
            <button className="w-full py-3.5 border border-slate-500 text-slate-300 rounded-xl font-medium text-sm cursor-not-allowed bg-transparent mt-8">
              Current plan
            </button>
          </div>

          {/* Card 2: Rs 50 */}
          <div className="bg-[#a3a3a3] rounded-2xl p-8 flex flex-col justify-between text-slate-900 shadow-lg min-h-[420px] text-left">
            <div>
              <h2 className="text-4xl font-normal">Rs 50</h2>
              <ul className="mt-8 space-y-4 text-sm text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-slate-600 rounded-full" /> Read public Blogs
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-slate-600 rounded-full" /> Read Premium Blogs
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-slate-600 rounded-full" /> Community club access
                </li>
              </ul>
            </div>
            <button 
              onClick={() => handleSubscribe(50)}
              disabled={loadingPlan !== null}
              className="w-full py-3.5 bg-transparent border border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 rounded-xl font-medium text-sm transition mt-8"
            >
              {loadingPlan === '50' ? 'Connecting...' : 'Buy Now'}
            </button>
          </div>

          {/* Card 3: Rs 100 (Premium Plan) */}
          <div className="bg-[#d99400] rounded-2xl p-8 flex flex-col justify-between text-slate-950 shadow-lg min-h-[420px] text-left border border-amber-500">
            <div>
              <h2 className="text-4xl font-normal">Rs 100</h2>
              <ul className="mt-8 space-y-4 text-sm text-slate-900/90 font-medium">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-slate-950 rounded-full" /> Read public Blogs
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-slate-950 rounded-full" /> Read Premium Blogs
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-slate-950 rounded-full" /> Community club access
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-slate-950 rounded-full" /> Join monthly online Discussion
                </li>
              </ul>
            </div>
            <button 
              onClick={() => handleSubscribe(100)}
              disabled={loadingPlan !== null}
              className="w-full py-3.5 bg-transparent border border-slate-950 hover:bg-slate-950 hover:text-amber-400 text-slate-950 rounded-xl font-bold text-sm transition mt-8"
            >
              {loadingPlan === '100' ? 'Connecting...' : 'Buy Now'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}