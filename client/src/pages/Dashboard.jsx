import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-purple-700 mb-8">📊 Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Link to="/create-blog" className="bg-green-100 p-6 rounded-xl shadow hover:bg-green-200">
          ➕ Create Blog
        </Link>
        <Link to="/my-blogs" className="bg-blue-100 p-6 rounded-xl shadow hover:bg-blue-200">
          📃 My Blogs
        </Link>
        <Link to="/admin" className="bg-yellow-100 p-6 rounded-xl shadow hover:bg-yellow-200">
          👥 Admin Dashboard
        </Link>
      </div>
    </div>
  );
}
