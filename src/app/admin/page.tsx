'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminBlogCard from '@/components/AdminBlogCard';
import CreatePostModal from '@/components/CreatePostModal';
import { postService } from '@/services/postService';

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  const [editingPost, setEditingPost] = useState<any>(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const data = await postService.getDashboardPosts();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching dashboard posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  const handleEdit = (id: number) => {
    const postToEdit = blogs.find(blog => blog.id === id);
    if (postToEdit) {
      setEditingPost(postToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this blog post?");
    if (confirmDelete) {
      try {
        await postService.deletePost(id);
        alert(`Blog deleted successfully!`);
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete the post. Try again.');
      }
    }
  };


  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex">
      
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between p-6 h-screen sticky top-0">
        <div className="space-y-8">
          <Link href="/" className="text-2xl font-serif font-black tracking-tight text-black block">
            Blog<span className="text-blue-600 text-sm">.admin</span>
          </Link>

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

        <div className="border-t border-slate-100 pt-4 text-xs text-slate-400 font-medium">
          Author Panel v1.0
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Author Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Manage and publish your stories, articles and news.</p>
          </div>
          
          <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center justify-center space-x-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm transition self-start sm:self-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Post</span>
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Your Published Articles ({blogs.length})
          </h3>
          
          {isLoading ? (
            <div className="space-y-3">
              <div className="h-20 bg-slate-100 rounded-2xl animate-pulse" />
              <div className="h-20 bg-slate-100 rounded-2xl animate-pulse" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 p-6">
              <p className="text-sm font-medium text-slate-500">You haven't published any articles yet.</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <AdminBlogCard 
                key={blog.id} 
                blog={{
                  id: blog.id,
                  title: blog.title,
                  image: blog.image_url,
                  date: new Date(blog.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })
                }} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            ))
          )}
        </div>
      </main>

      <CreatePostModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        onPostCreated={fetchPosts}
        editingPost={editingPost}
      />

    </div>
  );
}