'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { postService } from '@/services/postService';
import { authService } from '@/services/authService';
import Navbar from '@/components/Navbar';
import BlogCardMini from '@/components/BlogCardMini';

export default function HomePage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState<string>('reader'); 
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true); 

  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);


  useEffect(() => {
    async function fetchUserSessionAndRole() {
      try {
        setIsAuthLoading(true);
        
        const { data: { session } } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          const role = await authService.getUserRole(currentUser.id);
          setUserType(role.toLowerCase()); 
        } else {
          setUserType('reader');
        }
      } catch (error) {
        console.error("Error fetching user session or role:", error);
      } finally {
        setIsAuthLoading(false);
      }
    }

    fetchUserSessionAndRole();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        const role = await authService.getUserRole(currentUser.id);
        setUserType(role.toLowerCase());
      } else {
        setUserType('reader');
      }
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

  const handlePostClick = (post: any) => {

    if (!user) {
      router.push('/login');
      return;
    }


    if (post.is_premium && userType !== 'premium' && userType !== 'admin') {
      setIsPremiumModalOpen(true);
      return;
    }

    router.push(`/blog/${post.id}`);
  };

  if (isAuthLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-black" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans relative">
      
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

      {/* Blog Grid */}
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
              <div 
                key={post.id} 
                onClick={() => handlePostClick(post)} 
                className="cursor-pointer block"
              >
                <BlogCardMini 
                  blog={{
                    id: post.id,
                    title: post.title,
                    image: post.image_url,
                    date: new Date(post.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    }),
                    isPremium: post.is_premium 
                  }} 
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 🚨 Premium Upgrade Popup Modal */}
      {isPremiumModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-sm p-6 text-center animate-in zoom-in-95 duration-150">
            
            <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-100">
              <span className="text-2xl">⭐</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">Premium Content Locked</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              This article is exclusive to Premium Members. Upgrade your subscription today to unlock unlimited access.
            </p>

            {/* Buttons */}
            <div className="mt-5 flex flex-col space-y-2.5">
              <button
                onClick={() => {
                  setIsPremiumModalOpen(false);
                  router.push('/subscribe');
                }}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition shadow-sm"
              >
                Buy Premium Membership
              </button>
              
              <button
                onClick={() => setIsPremiumModalOpen(false)}
                className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-medium text-xs rounded-xl transition"
              >
                Go Back
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}