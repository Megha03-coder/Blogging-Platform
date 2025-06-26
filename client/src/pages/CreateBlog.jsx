
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image from '../assets/image.png'; // Ensure this path is correct

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:5000/api/blogs',
        { title, content },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Blog posted:", response.data);
      alert("🎉 Blog posted successfully!");
      navigate('/my-blogs');
    } catch (err) {
      console.error("❌ Error posting blog:", err);
      setError(err.response?.data?.msg || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-4 md:p-10">
      <div className="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-xl grid md:grid-cols-2 gap-6 p-6 md:p-10">
        
        {/* Left: Image */}
        <div className="flex items-center justify-center">
          <img
            src={image}
            alt="Blog illustration"
            className="w-full max-w-sm rounded-lg shadow-lg"
          />
        </div>

        {/* Right: Blog Form */}
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <h2 className="text-3xl font-bold text-purple-700 text-center mb-4">
            📝 Write a New Blog
          </h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />

          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Start writing your blog..."
            className="bg-white h-[250px] mb-2"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            🚀 Post Blog
          </button>
        </form>
      </div>
    </div>
  );
}
