import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { motion } from 'framer-motion';
import 'react-quill/dist/quill.snow.css';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Load template if redirected from dashboard
  useEffect(() => {
    if (location.state?.template) {
      const { title, content } = location.state.template;
      setTitle(title);
      setContent(content);
    }
  }, [location]);

  // Preview image when user selects one
  useEffect(() => {
    if (!image) {
      setPreview('');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(image);
  }, [image]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) return alert('Please fill in all fields');

    const newBlog = {
      title,
      content,
      image: preview || 'https://via.placeholder.com/400x300.png?text=Blog+Image',
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('blogs') || '[]');
    existing.push(newBlog);
    localStorage.setItem('blogs', JSON.stringify(existing));

    alert('✅ Blog published!');
    navigate('/my-blogs');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Blog Image Preview */}
        <div className="flex flex-col items-center justify-center">
          <motion.img
            src={preview ? preview : 'https://via.placeholder.com/400x300.png?text=Blog+Preview'}
            alt="Blog Preview"
            className="w-full max-w-sm h-64 object-cover rounded-lg shadow mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <p className="text-center text-gray-600">
            Upload a custom image or use the default
          </p>
        </div>

        {/* Blog Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-3xl font-bold text-purple-700 flex items-center gap-2">
            📝 Create a New Blog
          </h2>

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
