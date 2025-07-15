import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getTokenPayload } from '../utils/auth';
import { Trash2, ShieldCheck, User } from 'lucide-react';

export default function AdminPanel() {
  const user = getTokenPayload();
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
      fetchBlogs();
    }
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/users');
    setUsers(res.data.users);
  };

  const fetchBlogs = async () => {
    const res = await axios.get('http://localhost:5000/api/blogs');
    setBlogs(res.data.blogs);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  const deleteBlog = async (id) => {
    await axios.delete(`http://localhost:5000/api/blogs/${id}`);
    fetchBlogs();
  };

  if (user?.role !== 'admin') {
    return <div className="text-center text-red-500 mt-10">⛔ Unauthorized. Admins only.</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100">
      <h2 className="text-3xl font-bold text-orange-700 mb-6 text-center">🔐 Admin Panel</h2>

      {/* Users Section */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-gray-700 mb-3">👥 All Users</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((u) => (
            <div key={u._id} className="bg-white p-4 rounded shadow">
              <p><strong>Name:</strong> {u.name}</p>
              <p><strong>Email:</strong> {u.email}</p>
              <p><strong>Role:</strong> {u.role}</p>
              <div className="flex gap-3 mt-3">
                <button onClick={() => deleteUser(u._id)} className="text-red-600 flex items-center gap-1">
                  <Trash2 size={16} /> Delete
                </button>
                {u.role !== 'admin' && (
                  <button className="text-green-600 flex items-center gap-1">
                    <ShieldCheck size={16} /> Promote
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blogs Section */}
      <section>
        <h3 className="text-xl font-bold text-gray-700 mb-3">📝 All Blogs</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((b) => (
            <div key={b._id} className="bg-white p-4 rounded shadow">
              <p><strong>Title:</strong> {b.title}</p>
              <p><strong>Author:</strong> {b.author?.name}</p>
              <div className="mt-3">
                <button onClick={() => deleteBlog(b._id)} className="text-red-600 flex items-center gap-1">
                  <Trash2 size={16} /> Delete Blog
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
