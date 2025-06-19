import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔍 Login form submitted", form);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);

      console.log("✅ Login success:", res.data);

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }

      alert("Login successful");
      navigate('/dashboard'); // ✅ or use window.location.href = '/dashboard';
    } catch (err) {
      console.error("❌ Login failed:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 to-purple-300">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-purple-700">Welcome Back!</h2>
        <input name="email" placeholder="Email" onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md" />
        <button type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition">
          Login
        </button>
      </form>
    </div>
  );
}
