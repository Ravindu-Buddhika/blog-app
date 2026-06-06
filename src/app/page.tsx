'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { postService } from '@/services/postService';
import { authService } from '@/services/authService';
import Navbar from '@/components/Navbar';
import BlogCardMini from '@/components/BlogCardMini';

export default function HomePage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState<string>('reader'); // 👈 ආපහු සිම්පල් 'reader' කලා කිසිම අවුලක් නොවෙන්න
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true); // 👈 Auth එක චෙක් කරලා ඉවර වෙනකන් ට්‍රැක් කරන්න

  // 🔐 Auth Session සහ User Role එක Profiles ටේබල් එකෙන් ලයිව් ඇදලා ගැනීම
  useEffect(() => {
    async function fetchUserSessionAndRole() {
      try {
        setIsAuthLoading(true);
        
        // 1. මුලින්ම දැනට ඉන්න Auth යූසර්ව ගන්නවා
        const { data: { session } } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          // 2. යූසර් ඉන්නවා නම්Profiles එකෙන් රෝල් එක අරන් lowercase කරලාම ස්ටේට් එකට දානවා
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

    // ලයිව් ලොග් ඉන් / ලොග් අවුට් ට්‍රැක් කරන ලිස්නර් එක
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

  // 📝 බ්ලොග් පෝස්ට් ටික ලෝඩ් කරන සෙක්ෂන් එක
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

  // Auth එක චෙක් කරලා ඉවර වෙනකන් විතරක් මුළු පේජ් එකම ලෝඩින් එකක් පෙන්වනවා (පළවෙනි කෝඩ් එකේ වගේමයි)
  if (isAuthLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-black" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* Reusable Navbar - දැන් ලයිව් යූසර් රෝල් එක මෙතනට නූලට පාස් වෙනවා */}
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