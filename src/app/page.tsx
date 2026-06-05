'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar';
import BlogCardMini from '@/components/BlogCardMini';

const dummyBlogs = [
  { id: 1, title: "Take-Two confirms GTA 6 is on track to launch on November 19, 2026.", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop", date: "November 19, 2026", isPremium: false },
  { id: 2, title: "Trophy Launch Sri Lanka vs West Indies ODI Series", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=600&auto=format&fit=crop", date: "June 5, 2026", isPremium: false },
  { id: 3, title: "IMF approves third review of Sri Lanka's $2.9bn bailout, but warns of risks", image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=600&auto=format&fit=crop", date: "June 5, 2026", isPremium: false },
  { id: 4, title: "McGregor to make UFC comeback on July 11", image: "https://images.unsplash.com/photo-1517438476312-10d79c67756d?q=80&w=600&auto=format&fit=crop", date: "July 11", isPremium: false },
  { id: 5, title: "US House votes to end Trump's Iran war: Does it matter?", image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=600&auto=format&fit=crop", date: "June 5, 2026", isPremium: false },
  { id: 6, title: "US government releases UFO sighting reports - 'Orbs swarming in all directions'", image: "", date: "June 5, 2026", isPremium: true }
];

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  let userType: string = "Basic Member";

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* Reusable Navbar */}
      <Navbar user={user} userType={userType} />

      {/* Search Bar Section */}
      <div className="max-w-2xl mx-auto px-4 mt-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full px-5 py-3.5 bg-white border border-slate-300 rounded-full shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition pl-12"
          />
          <svg className="absolute left-4 top-4 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Blog Grid using Reusable BlogCard */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyBlogs.map((blog) => (
            <BlogCardMini key={blog.id} blog={blog} />
          ))}
        </div>
      </main>

    </div>
  );
}