'use client';

import React from 'react';

interface BlogProps {
  blog: {
    id: string;
    title: string;
    image: string;
    date: string;
    isPremium: boolean;
  };
}

export default function BlogCardMini({ blog }: BlogProps) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition duration-200">
      
      {/* 📸 Image Section */}
      {blog.isPremium ? (
        <div className="aspect-[16/10] w-full bg-gradient-to-br from-amber-400 to-orange-500 flex flex-col items-center justify-center p-6 text-center shadow-sm relative">
          <span className="text-2xl mb-1">🔒</span>
          <span className="text-sm font-bold text-white tracking-wide uppercase">
            Premium Content
          </span>
        </div>
      ) : (
        <div className="aspect-[16/10] w-full bg-slate-100 overflow-hidden relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blog.image}
            alt={blog.title}
            className="object-cover w-full h-full group-hover:scale-102 transition duration-300"
          />
        </div>
      )}

      {/* 📝 Text Section */}
      <div className="p-4">
        <h3 className="font-bold text-base text-slate-900 line-clamp-2 group-hover:text-blue-600 transition leading-snug">
          {blog.title}
        </h3>
      </div>

    </div>
  );
}