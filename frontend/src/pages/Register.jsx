import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Plus, Github } from "lucide-react";
import axios from "axios";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    fullname: {
      firstName: "",
      lastName: "",
    },
    password: "",
  });

  // 🔥 REGISTER HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData,
        { withCredentials: true }
      );

      // ✅ SAVE REAL USER (VERY IMPORTANT)
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // ✅ GO TO ASSISTANT UI
      navigate("/");

    } catch (error) {
      console.error(
        "register error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans selection:bg-indigo-500/30">
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-[120px]" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-tr from-indigo-600 to-purple-500 mb-4 shadow-lg shadow-indigo-500/20">
            <Plus size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Create Account
          </h1>
          <p className="text-zinc-500 mt-2">
            Join the future of AI-driven productivity
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-zinc-200"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullname: {
                        ...formData.fullname,
                        firstName: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <input
                type="text"
                placeholder="Last Name"
                required
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl py-3 px-4 text-zinc-200"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullname: {
                      ...formData.fullname,
                      lastName: e.target.value,
                    },
                  })
                }
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                type="email"
                placeholder="Email address"
                required
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-zinc-200"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                type="password"
                placeholder="Create Password"
                required
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-zinc-200"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
            >
              Create Account <ArrowRight size={18} />
            </button>
          </form>

          <p className="text-center text-zinc-500 mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
