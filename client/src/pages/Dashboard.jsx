import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PencilLine, Plus, Notebook, Users, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTokenPayload } from '../utils/auth';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getTokenPayload();
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ user: '', type: '' });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const blogTypes = ['Tech', 'Travel', 'Recipe'];

  useEffect(() => {
    fetchBlogs();
    fetchUsers();
  }, [filters, page]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blogs`, {
        params: {
          user: filters.user,
          type: filters.type,
          page,
          limit: 6,
        },
      });
      const blogsData = res.data.blogs || [];

      // Get blogs from localStorage
      const localBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');

      // Merge local blogs with fetched blogs, avoiding duplicates by _id or title
      const mergedBlogs = [...blogsData];

      localBlogs.forEach(localBlog => {
        const exists = mergedBlogs.some(blog => blog._id === localBlog._id || blog.title === localBlog.title);
        if (!exists) {
          // Assign a temporary _id if missing
          if (!localBlog._id) {
            localBlog._id = `local-${Date.now()}-${Math.random()}`;
          }
          mergedBlogs.push(localBlog);
        }
      });

      setBlogs(mergedBlogs);
      setHasMore(mergedBlogs.length > 0);
    } catch (err) {
      console.error("Error fetching blogs:", err.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data.users);
    } catch (err) {
      console.error("Error fetching users:", err.message);
    }
  };

  const handleFilterChange = (e) => {
    setBlogs([]);
    setPage(1);
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const templates = [
    { title: "Tech Review", content: "<p>Tech overview...</p>" },
    { title: "Travel Blog", content: "<p>Your adventure story...</p>" },
    { title: "Recipe", content: "<p>Cooking made fun...</p>" },
  ];

  const handleTemplateClick = (template) => {
    navigate("/create-blog", { state: { template } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-200 p-6">
      <motion.h2
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-bold text-center text-purple-700 mb-8"
      >
        ✨ Welcome to Your Dashboard
      </motion.h2>

      {/* Top Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer" onClick={() => navigate('/create-blog')}>
          <Plus className="text-purple-600 mx-auto" />
          <p className="mt-2 font-semibold">Create Blog</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer" onClick={() => navigate('/my-blogs')}>
          <Notebook className="text-purple-600 mx-auto" />
          <p className="mt-2 font-semibold">My Blogs</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer" onClick={() => navigate('/admin')}>
          <Users className="text-purple-600 mx-auto" />
          <p className="mt-2 font-semibold">Admin Panel</p>
        </motion.div>
      </div>

      {/* Logout */}
      <div className="absolute top-4 right-6">
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Blog Templates */}
      <div className="text-center mb-10">
        <h3 className="text-2xl font-semibold text-purple-800 mb-4">🧩 Blog Templates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {templates.map((tpl, idx) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={idx}
              onClick={() => handleTemplateClick(tpl)}
              className="bg-white p-5 rounded-lg shadow-md cursor-pointer hover:bg-purple-50"
            >
              <PencilLine className="text-purple-500 mb-2" />
              <h4 className="text-lg font-bold">{tpl.title}</h4>
              <p className="text-sm text-gray-600 mt-1">Click to start with this template</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <select
          name="user"
          value={filters.user}
          onChange={handleFilterChange}
          className="p-2 rounded-md border border-gray-300"
        >
          <option value="">All Users</option>
          {users.map(u => (
            <option key={u._id} value={u._id}>{u.name}</option>
          ))}
        </select>

        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="p-2 rounded-md border border-gray-300"
        >
          <option value="">All Types</option>
          {blogTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* All Blogs Section */}
      <h3 className="text-xl font-bold text-purple-700 mb-4">📰 Blogs</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {(blogs?.length || 0) === 0 ? (
          <p className="text-center text-gray-600 col-span-full">No blogs found.</p>
        ) : blogs.map(blog => (
          <div key={blog._id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover rounded-md mb-3" />
            <h4 className="text-lg font-bold mb-1">{blog.title}</h4>
            <p className="text-sm text-gray-500 mb-1">{blog.type}</p>
            <p className="text-sm text-gray-400">By {blog.author?.name}</p>
            <button
              className="mt-2 text-purple-600 font-medium hover:underline"
              onClick={() => navigate(`/view-blog/${blog._id}`)}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
