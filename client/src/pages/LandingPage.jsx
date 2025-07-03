import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-100">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-700">Blogging Platform</h1>
        <div className="space-x-4">
          <Link to="/login" className="text-purple-700 hover:text-purple-900 font-medium">Login</Link>
          <Link to="/register" className="text-purple-700 hover:text-purple-900 font-medium">Register</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-32 px-4">
        <motion.h2
          className="text-5xl font-extrabold text-purple-800 mb-6"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to <span className="text-pink-600">Blogging Platform</span>
        </motion.h2>

        <motion.p
          className="text-lg text-gray-700 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Share your thoughts, stories, and experiences with the world. Blogify gives you the tools to write, edit, and publish effortlessly.
        </motion.p>

        <motion.div
          className="mt-10 space-x-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link to="/login" className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-md">
            Login
          </Link>
          <Link to="/register" className="bg-white text-purple-600 px-6 py-2 border border-purple-600 rounded-xl hover:bg-purple-100 transition-all duration-300 shadow-md">
            Register
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
