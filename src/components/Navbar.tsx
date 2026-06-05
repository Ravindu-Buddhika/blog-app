'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

interface NavbarProps {
  user: any;
  userType: string;
}

export default function Navbar({ user, userType }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsDropdownOpen(false);
  };

  return (
    <header className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center border-b border-slate-100">
      <Link href="/" className="text-3xl font-serif font-black tracking-tight text-black">
        Blog
      </Link>
      
      <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
        <span className="hover:text-black cursor-pointer transition">Science & Technology</span>
        <span className="hover:text-black cursor-pointer transition">Economy</span>
        <span className="hover:text-black cursor-pointer transition">Sport</span>
        <span className="hover:text-black cursor-pointer transition">News</span>
        <span className="hover:text-black cursor-pointer transition">Entertainment</span>
      </nav>

      <div className="relative" ref={dropdownRef}>
        {user ? (
          <>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-10 h-10 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full flex items-center justify-center border border-slate-200 transition shadow-sm focus:outline-none"
            >
              {user.email?.charAt(0).toUpperCase()}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-5 py-2.5 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Logged in as</p>
                  <p className="text-sm font-bold text-slate-800 truncate mt-0.5">{user.email}</p>
                  
                  <span className={`inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                    userType === 'Premium Member' 
                      ? 'bg-amber-100 text-amber-800 border-amber-200' 
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {userType}
                  </span>
                </div>

                <div className="px-3 pt-3">
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <Link
            href="/login"
            className="px-6 py-2.5 bg-black hover:bg-slate-800 text-white font-medium text-sm rounded-xl transition shadow-sm"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}