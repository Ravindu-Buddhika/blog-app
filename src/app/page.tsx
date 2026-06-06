'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { postService } from '@/services/postService';
import Navbar from '@/components/Navbar';
import BlogCardMini from '@/components/BlogCardMini';

export default function HomePage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
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

  useEffect(() => {
    const fetchHomePosts = async () => {
      setIsLoading(true);
      try {
        const data = await postService.getPublicPosts(category);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching public posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomePosts();
  }, [category]); 

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

      {/* Blog Grid using Reusable BlogCardMini */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="h-64 bg-slate-100 rounded-2xl animate-pulse" />
            <div className="h-64 bg-slate-100 rounded-2xl animate-pulse" />
            <div className="h-64 bg-slate-100 rounded-2xl animate-pulse" />
          </div>
        ) : posts.length === 0 ? (

          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500 font-medium">No articles found {category ? `in "${category}"` : ''}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCardMini 
                key={post.id} 
                blog={{
                  id: post.id,
                  title: post.title,
                  image: post.image_url,
                  date: new Date(post.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  }),
                  isPremium: false 
                }} 
              />
            ))}
          </div>
        )}
      </main>

    </div>
  );
}