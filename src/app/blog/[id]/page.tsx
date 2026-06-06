'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { postService } from '@/services/postService';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabaseClient';

export default function BlogViewPage() {
  const { id } = useParams(); // URL එකෙන් බ්ලොග් ID එක ගන්නවා
  const [post, setPost] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();
  }, []);

  useEffect(() => {
    if (!id) return;
    
    const fetchPost = async () => {
      try {
        const data = await postService.getPostById(id as string);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar user={user} userType="Basic Member" />
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="animate-pulse space-y-6">
            <div className="h-96 bg-slate-100 rounded-2xl w-full" />
            <div className="h-8 bg-slate-100 rounded w-3/4 mx-auto" />
            <div className="h-4 bg-slate-100 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar user={user} userType="Basic Member" />
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-800">Article Not Found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pb-20">
      <Navbar user={user} userType="Basic Member" />

      {/* Figma UI Layout එකට අනුව හැදූ සිංගල් පෝස්ට් වීව් එක */}
      <main className="max-w-4xl mx-auto px-6 mt-10">
        
        {/* 📸 1. Featured Image එක (මැදින් ලොකුවට) */}
        {post.image_url && (
          <div className="w-full overflow-hidden rounded-2xl shadow-sm mb-10">
            <img 
              src={post.image_url} 
              alt={post.title} 
              className="w-full h-auto object-cover max-h-[500px] mx-auto"
            />
          </div>
        )}

        {/* 📝 2. Blog Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-950 leading-tight mb-6">
          {post.title}
        </h1>

        {/* 👤 3. Author Info ("By Ravindu") */}
        <div className="flex items-center gap-2 mb-8 text-sm text-slate-600">
          <span className="font-semibold text-slate-900">By</span>
          <span>Ravindu</span>
          <span className="text-slate-300">•</span>
          <span>
            {new Date(post.created_at).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>

        {/* 📖 4. Full Content Area */}
        <article className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-base whitespace-pre-line">
          {post.content}
        </article>

      </main>
    </div>
  );
}