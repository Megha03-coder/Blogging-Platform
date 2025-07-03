import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Notebook, Users, PencilLine } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const navigate = useNavigate();

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

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer"
          onClick={() => navigate('/create-blog')}>
          <Plus className="text-purple-600 mx-auto" />
          <p className="mt-2 font-semibold">Create Blog</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer"
          onClick={() => navigate('/my-blogs')}>
          <Notebook className="text-purple-600 mx-auto" />
          <p className="mt-2 font-semibold">My Blogs</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer"
          onClick={() => navigate('/admin')}>
          <Users className="text-purple-600 mx-auto" />
          <p className="mt-2 font-semibold">Admin Panel</p>
        </motion.div>
      </div>

      {/* Blog Templates */}
      <h3 className="text-2xl font-semibold text-center text-purple-800 mb-4">Start with a Template</h3>
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
  );
}
