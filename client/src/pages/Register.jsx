import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value }); // ✅ fixed

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...", form); // ✅ fixed

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form); // ✅ fixed
      console.log("✅ Registration success:", res.data);
      alert("Registered successfully");
      navigate('/login'); // optional: redirect after success
    } catch (err) {
      console.error("❌ Registration failed:", err);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-teal-300">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-teal-700">Join Our Blogging Community!</h2>
        <input name="username" placeholder="Username"
               onChange={handleChange}
               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400" />
        <input name="email" placeholder="Email" type="email"
               onChange={handleChange}
               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400" />
        <input name="password" placeholder="Password" type="password"
               onChange={handleChange}
               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400" />
        <button type="submit"
                className="w-full bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition">
          Register
        </button>
      </form>
    </div>
  );
}
