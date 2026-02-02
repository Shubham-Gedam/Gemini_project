import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Github, Mail, Lock, ArrowRight } from 'lucide-react';
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      'http://localhost:3000/api/auth/login',
      { email, password },
      { withCredentials: true }
    );

    // ✅ YE LINE SABSE IMPORTANT
    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    navigate('/'); // AssistantUI

  } catch (error) {
    console.error(
      'login error:',
      error.response?.data || error.message
    );
  }
};


  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans selection:bg-indigo-500/30">
      {/* Background Glow Decor */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-md z-10">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl from-indigo-600 to-purple-500 mb-4 shadow-lg shadow-indigo-500/20">
            <div className="w-6 h-6 border-2 border-white rounded-sm rotate-45" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back</h1>
          <p className="text-zinc-500 mt-2">Enter your details to access your assistant</p>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-zinc-600"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-zinc-600"
              />
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 transition">
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group">
              Sign In
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <span className="relative px-4 bg-zinc-900/50 text-zinc-500 text-xs uppercase tracking-widest">
              Or continue with
            </span>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-2.5 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition text-zinc-300 text-sm">
              <Github size={18} /> Github
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition text-zinc-300 text-sm">
              Google
            </button>
          </div>
        </div>

        <p className="text-center text-zinc-500 mt-8 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-white hover:underline font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
