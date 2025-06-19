import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // fetch user...
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 mt-10">
        <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>
        {user ? (
          <div className="mt-4">
            <p className="text-lg">Hello, <span className="text-purple-600 font-semibold">{user.username}</span>!</p>
            <p className="text-gray-500">Your email: {user.email}</p>
          </div>
        ) : (
          <p>Loading user...</p>
        )}
      </div>
    </div>
  );
}
