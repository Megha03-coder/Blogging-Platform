import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'], // ✅ Enable image uploads
    ['clean'],
  ],
};

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/blogs/create',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('✅ Blog posted successfully!');
      navigate('/my-blogs'); // Redirect to user's blog list
    } catch (err) {
      console.error('❌ Failed to post blog:', err);
      alert(err.response?.data?.msg || 'Failed to post blog');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">✍️ Create New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Enter Blog Title"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <ReactQuill
          value={content}
          onChange={setContent}
          modules={modules}
          placeholder="Start writing your blog here..."
          className="bg-white"
        />

        <button
          type="submit"
          className="w-full py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
}
