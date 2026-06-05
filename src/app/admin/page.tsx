'use client';

import React from 'react';
import Link from 'next/link';
import AdminBlogCard from '@/components/AdminBlogCard';

// Dummy blogs owned by the author
const authorBlogs = [
  { id: 1, title: "Take-Two confirms GTA 6 is on track to launch on November 19, 2026.", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop", date: "November 19, 2026" },
  { id: 2, title: "Trophy Launch Sri Lanka vs West Indies ODI Series", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=600&auto=format&fit=crop", date: "June 5, 2026" },
  { id: 3, title: "IMF approves third review of Sri Lanka's $2.9bn bailout, but warns of risks", image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=600&auto=format&fit=crop", date: "June 5, 2026" },
];

export default function AdminDashboard() {
  
  const handleEdit = (id: number) => {
    alert(`Redirecting to edit blog ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this blog post?");
    if (confirmDelete) {
      alert(`Blog ID ${id} deleted successfully!`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex">
      
      {/* Left Sidebar Layout */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between p-6 h-screen sticky top-0">
        <div className="space-y-8">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif font-black tracking-tight text-black block">
            Blog<span className="text-blue-600 text-sm">.admin</span>
          </Link>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            <Link href="/admin" className="flex items-center space-x-3 px-4 py-3 bg-slate-900 text-white font-medium text-sm rounded-xl transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>My Blogs</span>
            </Link>
            
            <Link href="/" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-100 font-medium text-sm rounded-xl transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7-7-7M19 10v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>View Website</span>
            </Link>
          </nav>
        </div>

        {/* User Footer Note */}
        <div className="border-t border-slate-100 pt-4 text-xs text-slate-400 font-medium">
          Author Panel v1.0
        </div>
      </aside>

      {/* Right Main Content Panel */}
      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto">
        {/* Top Bar inside content */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Author Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Manage and publish your stories, articles and news.</p>
          </div>
          
          {/* Create Post Button */}
          <button className="inline-flex items-center justify-center space-x-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm transition self-start sm:self-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Post</span>
          </button>
        </div>

        {/* Blog Post List Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your Published Articles ({authorBlogs.length})</h3>
          
          {authorBlogs.map((blog) => (
            <AdminBlogCard 
              key={blog.id} 
              blog={blog} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      </main>

    </div>
  );
}