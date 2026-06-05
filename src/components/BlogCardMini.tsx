'use client';

import React from 'react';

interface BlogProps {
  blog: {
    id: number;
    title: string;
    image: string;
    date: string;
    isPremium: boolean;
  };
}

export default function BlogCardMini({ blog }: BlogProps) {
  return (
    <div className="group cursor-pointer">
      {blog.isPremium ? (
        <div className="aspect-[16/10] w-full bg-gradient-to-br from-amber-400 to-orange-400 rounded-xl flex items-center justify-center p-6 text-center shadow-sm">
          <span className="text-xl font-bold text-white tracking-wide">Premium Content</span>
        </div>
      ) : (
        <div className="aspect-[16/10] w-full bg-slate-100 rounded-xl overflow-hidden shadow-sm relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blog.image}
            alt={blog.title}
            className="object-cover w-full h-full group-hover:scale-102 transition duration-300"
          />
        </div>
      )}

      <div className="mt-4">
        <h3 className="font-bold text-base text-slate-900 line-clamp-2 group-hover:text-blue-600 transition leading-snug">
          {blog.title}
        </h3>
      </div>
    </div>
  );
}