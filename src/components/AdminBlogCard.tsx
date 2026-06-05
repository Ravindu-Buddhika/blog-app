'use client';

import React from 'react';

interface AdminBlogCardProps {
  blog: {
    id: number;
    title: string;
    image: string;
    date: string;
  };
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function AdminBlogCard({ blog, onEdit, onDelete }: AdminBlogCardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition">
      
      {/* Left: Image & Title */}
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        <div className="w-16 h-16 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 relative">
          {blog.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={blog.image}
              alt={blog.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-white text-[10px] font-bold">
              No Img
            </div>
          )}
        </div>
        
        <div className="truncate pr-4">
          <h4 className="font-bold text-slate-900 text-sm md:text-base truncate group-hover:text-blue-600">
            {blog.title}
          </h4>
          <span className="text-xs text-slate-400 font-medium block mt-1">{blog.date}</span>
        </div>
      </div>

      {/* Right: Action Buttons (Edit & Delete) */}
      <div className="flex items-center space-x-2">
        {/* Edit Button */}
        <button
          onClick={() => onEdit(blog.id)}
          className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition"
          title="Edit Post"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(blog.id)}
          className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl border border-rose-200 transition"
          title="Delete Post"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

    </div>
  );
}