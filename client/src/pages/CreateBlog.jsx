
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

export default function CreateBlog() {
  const location = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Load template if passed via location.state
  useEffect(() => {
    if (location.state?.template) {
      setTitle(location.state.template.title);
      setContent(location.state.template.content);
    }
  }, [location]);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/blogs',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('✅ Blog posted!');
      navigate('/my-blogs');
    } catch (err) {
      console.error(err);
      alert('Error posting blog');
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">📝 Write a New Blog</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog Title"
        className="w-full border border-gray-300 p-2 rounded mb-4"
      />
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        className="mb-6"
        placeholder="Start writing your blog..."
      />
      <button
        onClick={handleSubmit}
        className="bg-purple-600 text-white py-2 px-6 rounded hover:bg-purple-700"
      >
        Post Blog
      </button>
    </div>
  );
}
