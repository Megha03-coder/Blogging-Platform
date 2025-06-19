import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/blogs/myblogs', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBlogs(res.data);
      } catch (err) {
        console.error("❌ Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-600 mb-6">📚 My Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs found. Start by creating one!</p>
      ) : (
        blogs.map(blog => (
          <div key={blog._id} className="bg-white rounded-xl shadow p-6 mb-4">
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <div className="text-sm text-gray-600 mb-2">Created on {new Date(blog.createdAt).toLocaleDateString()}</div>
            <div dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 200) + '...' }} />
            <div className="mt-3 flex gap-3">
              <Link to={`/edit/${blog._id}`} className="text-blue-600 hover:underline">Edit</Link>
              <Link to={`/blog/${blog._id}`} className="text-green-600 hover:underline">Read More</Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
