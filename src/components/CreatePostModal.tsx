'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { postService } from '@/services/postService';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: () => void;
  editingPost?: any;
}

export default function CreatePostModal({ isOpen, onClose, onPostCreated, editingPost }: CreatePostModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Science & Technology');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPremium, setIsPremium] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title || '');
      setCategory(editingPost.category || 'Science & Technology');
      setContent(editingPost.content || '');
      setImageUrl(editingPost.image_url || '');
      setIsPremium(editingPost.is_premium || false);
    } else {

      setTitle('');
      setCategory('Science & Technology');
      setContent('');
      setImageUrl('');
      setIsPremium(false);
    }
    setError('');
  }, [editingPost, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User session not found. Please log in again.');
      }

      if (editingPost) {

        await postService.updatePost(editingPost.id, {
          title,
          category,
          content,
          imageUrl,
          isPremium,
        });
        alert('Post updated successfully!');
      } else {

        await postService.createPost({
          title,
          category,
          content,
          imageUrl, 
          authorId: user.id,
          isPremium,
        });
        alert('Post created successfully!');
      }


      setTitle('');
      setCategory('Science & Technology');
      setContent('');
      setImageUrl('');
      setIsPremium(false);
      onPostCreated();
      onClose();

    } catch (err: any) {
      setError(err.message || 'Something went wrong while saving the post.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <div>
            {/* 🔄 Dynamic Title */}
            <h3 className="text-xl font-bold text-slate-900">
              {editingPost ? '✏️ Edit Blog Post' : 'Create New Post'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {editingPost ? 'Modify the details of your published article.' : 'Publish a new story, article, or news update.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium rounded-2xl">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Post Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Take-Two confirms GTA 6 launch date..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-black transition text-slate-900"
            />
          </div>

          {/* Category & Image URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-black transition text-slate-900"
              >
                <option value="Science & Technology">Science & Technology</option>
                <option value="Economy">Economy</option>
                <option value="Sport">Sport</option>
                <option value="News">News</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Featured Image URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg (Optional)"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-black transition text-slate-900"
              />
            </div>
          </div>

          {/* 🔒 Premium Content Checkbox */}
          <div className="flex items-center space-x-3 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl my-2">
            <input
              type="checkbox"
              id="isPremium"
              checked={isPremium}
              onChange={(e) => setIsPremium(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 transition cursor-pointer"
            />
            <label htmlFor="isPremium" className="text-xs font-bold text-amber-900 select-none cursor-pointer">
              ⭐ Mark as Premium Content (Only accessible for Subscribers)
            </label>
          </div>

          {/* Content TextArea */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Content</label>
            <textarea
              required
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your story here..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-black transition resize-none text-slate-900"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-medium text-sm rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium text-sm rounded-xl transition shadow-sm flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>{editingPost ? 'Updating...' : 'Publishing...'}</span>
                </>
              ) : (
                <span>{editingPost ? 'Update Post' : 'Publish Post'}</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}