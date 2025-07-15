import React from 'react';
import { FaRegThumbsUp, FaRegCommentDots, FaShareAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function BlogCard({ blog, isOwner, onDelete }) {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/blog/${blog._id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-6 max-w-2xl mx-auto">
      {blog.image && (
        <img
          src={blog.image}
          alt="Blog"
          className="w-full h-60 object-cover rounded-md mb-4"
        />
      )}

      <h2 className="text-xl font-bold text-purple-700 mb-2">{blog.title}</h2>
      <p
        className="text-gray-700 mb-4"
        dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 200) + '...' }}
      />

      <p className="text-sm text-gray-500 mb-2">
        Posted by <strong>{blog.author?.name || 'Unknown'}</strong> on{' '}
        {new Date(blog.createdAt).toLocaleString()}
      </p>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-gray-600 text-sm">
          <button className="flex items-center gap-1 hover:text-green-600 transition">
            <FaRegThumbsUp /> Like
          </button>
          <button className="flex items-center gap-1 hover:text-purple-600 transition">
            <FaRegCommentDots /> Comment
          </button>
          <button className="flex items-center gap-1 hover:text-blue-600 transition">
            <FaShareAlt /> Share
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleView}
            className="text-sm text-blue-600 hover:underline"
          >
            View
          </button>

          {isOwner && (
            <button
              onClick={() => onDelete(blog._id)}
              className="text-sm text-red-600 hover:underline"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
