import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Notebook, Users, PencilLine } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const templates = [
    {
      title: "Tech Review Template",
      content: "<h2>Introduction</h2><p>Review the latest tech...</p>",
    },
    {
      title: "Travel Blog Template",
      content: "<h2>Destination</h2><p>Describe your journey...</p>",
    },
    {
      title: "Recipe Blog Template",
      content: "<h2>Ingredients</h2><ul><li>1 cup sugar</li></ul>",
    }
  ];

  const handleTemplateClick = (template) => {
    navigate("/create-blog", { state: { template } });
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8 flex justify-center items-center gap-2">
        📊 Dashboard
      </h2>

      {/* Options Row */}
      <div className="flex justify-center gap-6 mb-12">
        <button onClick={() => navigate("/create-blog")} className="bg-green-100 p-6 rounded-xl shadow hover:shadow-md">
          <Plus className="mx-auto text-purple-600" />
          <p className="mt-2 font-medium">Create Blog</p>
        </button>
        <button onClick={() => navigate("/my-blogs")} className="bg-blue-100 p-6 rounded-xl shadow hover:shadow-md">
          <Notebook className="mx-auto text-purple-600" />
          <p className="mt-2 font-medium">My Blogs</p>
        </button>
        <button onClick={() => navigate("/admin")} className="bg-yellow-100 p-6 rounded-xl shadow hover:shadow-md">
          <Users className="mx-auto text-purple-600" />
          <p className="mt-2 font-medium">Admin Dashboard</p>
        </button>
      </div>

      {/* Blog Templates */}
      <h3 className="text-xl font-semibold text-center mb-4">📝 Start with a Template</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {templates.map((tpl, idx) => (
          <div key={idx} onClick={() => handleTemplateClick(tpl)}
            className="cursor-pointer p-5 border border-gray-200 rounded-lg shadow hover:shadow-lg hover:bg-gray-50 transition">
            <PencilLine className="text-purple-500 mb-2" />
            <h4 className="text-lg font-bold">{tpl.title}</h4>
            <p className="text-sm text-gray-500 mt-1">Click to start with this template</p>
          </div>
        ))}
      </div>
    </div>
  );
}
