import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { motion } from 'framer-motion';
import { getTokenPayload } from '../utils/auth';
import 'react-quill/dist/quill.snow.css';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80');
  const navigate = useNavigate();
  const location = useLocation();
  const user = getTokenPayload();

  useEffect(() => {
    if (location.state?.template) {
      const { title, content } = location.state.template;
      setTitle(title);
      setContent(content);
    }
  }, [location]);

  useEffect(() => {
    if (!image && !preview) {
      setPreview('https://source.unsplash.com/400x300/?blog,writing');
      return;
    }

    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    }
  }, [image, preview]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Please fill in all fields');
      return;
    }

    const newBlog = {
      title,
      content,
      image: preview,
      createdAt: new Date().toISOString(),
      author: user ? { id: user.id || user._id, name: user.name || user.username || user.email } : null
    };

    const existing = JSON.parse(localStorage.getItem('blogs') || '[]');
    existing.push(newBlog);
    localStorage.setItem('blogs', JSON.stringify(existing));

    alert('✅ Blog published!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="flex flex-col items-center justify-center">
          <motion.img
            src={preview}
            alt="Blog preview"
            style={{ width: '100%', maxWidth: '400px', height: '240px', objectFit: 'cover' }}
            className="rounded-lg shadow mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-3xl font-bold text-purple-700 flex items-center gap-2">📝 Create a New Blog</h2>

          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-lg"
          />

          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Start writing your blog..."
            className="bg-white"
            style={{ height: '250px' }}
          />

          <div>
            <label className="block font-medium text-gray-700 mb-1">📸 Upload Blog Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="border rounded-md p-2 w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-3 rounded-md hover:bg-purple-700 transition"
          >
            🚀 Publish Blog
          </button>
        </form>
      </motion.div>
    </div>
  );
}
