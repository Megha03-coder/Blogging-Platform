import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, content });
    alert("Blog submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-purple-700 mb-6">✍️ Write a New Blog</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
            <ReactQuill
              value={content}
              onChange={setContent}
              placeholder="Write your blog content here..."
              className="h-[200px]"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition"
          >
            🚀 Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
}
