import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaEnvelope, FaHeart, FaLaughSquint, FaSurprise } from 'react-icons/fa';
import { BiCommentDetail, BiShareAlt, BiTrash } from 'react-icons/bi';

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [showComment, setShowComment] = useState(null);
  const [showShare, setShowShare] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [reactions, setReactions] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('blogs') || '[]');
    setBlogs(stored);
  }, []);

  const handleDelete = (index) => {
    const updated = blogs.filter((_, i) => i !== index);
    setBlogs(updated);
    localStorage.setItem('blogs', JSON.stringify(updated));
  };

  const handleCommentSubmit = (index) => {
    const input = commentInputs[index];
    if (!input) return;

    const updated = [...blogs];
    if (!updated[index].comments) updated[index].comments = [];
    updated[index].comments.push({ text: input, timestamp: new Date() });

    setBlogs(updated);
    setCommentInputs({ ...commentInputs, [index]: '' });
    localStorage.setItem('blogs', JSON.stringify(updated));
  };

  const handleReaction = (index, emoji) => {
    const updated = { ...reactions };
    updated[index] = emoji;
    setReactions(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 p-6">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">📚 My Blogs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <img
              src={blog.image || 'https://source.unsplash.com/400x300/?blog'}
              alt="Blog"
              className="w-full h-52 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold text-purple-700">{blog.title}</h3>
            <div
              className="mt-2 text-gray-700 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Reactions */}
            <div className="flex gap-4 mt-4 text-xl">
              <button onClick={() => handleReaction(index, '❤️')}>
                <FaHeart className={`hover:text-red-500 ${reactions[index] === '❤️' && 'text-red-500'}`} />
              </button>
              <button onClick={() => handleReaction(index, '😂')}>
                <FaLaughSquint className={`hover:text-yellow-500 ${reactions[index] === '😂' && 'text-yellow-500'}`} />
              </button>
              <button onClick={() => handleReaction(index, '😮')}>
                <FaSurprise className={`hover:text-blue-400 ${reactions[index] === '😮' && 'text-blue-400'}`} />
              </button>
            </div>

            {/* Buttons: Comment, Share, Delete */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowComment(showComment === index ? null : index)}
                className="text-sm bg-purple-100 text-purple-700 px-4 py-1 rounded-md flex items-center gap-2"
              >
                <BiCommentDetail /> Comment
              </button>

              <button
                onClick={() => setShowShare(showShare === index ? null : index)}
                className="text-sm bg-green-100 text-green-700 px-4 py-1 rounded-md flex items-center gap-2"
              >
                <BiShareAlt /> Share
              </button>

              <button
                onClick={() => handleDelete(index)}
                className="text-sm bg-red-100 text-red-600 px-4 py-1 rounded-md flex items-center gap-2"
              >
                <BiTrash /> Delete
              </button>
            </div>

            {/* Comment Dropdown */}
            {showComment === index && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 bg-white p-4 rounded-md shadow-md border"
              >
                <p className="text-sm font-semibold mb-2">💬 Add a comment</p>
                <input
                  type="text"
                  value={commentInputs[index] || ''}
                  onChange={(e) =>
                    setCommentInputs({ ...commentInputs, [index]: e.target.value })
                  }
                  placeholder="Write your comment..."
                  className="w-full border px-3 py-2 rounded-md mb-2"
                />
                {/* Suggestions */}
                <div className="flex gap-2 flex-wrap text-sm text-gray-500 mb-3">
                  {["Awesome!", "Loved this ❤️", "Great content!", "🔥🔥", "So relatable!"].map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setCommentInputs({ ...commentInputs, [index]: c })}
                      className="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handleCommentSubmit(index)}
                  className="bg-purple-600 text-white px-4 py-1 rounded-md hover:bg-purple-700"
                >
                  Post Comment
                </button>

                {/* Comment Thread */}
                <div className="mt-4">
                  {blog.comments?.map((c, i) => (
                    <div key={i} className="border-t pt-2 text-sm text-gray-700">
                      🗨️ {c.text} <span className="text-xs text-gray-400 ml-2">({new Date(c.timestamp).toLocaleString()})</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Share Dropdown */}
            {showShare === index && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 bg-white p-4 rounded-md shadow-md border"
              >
                <p className="mb-2 font-semibold text-gray-700">📢 Share via:</p>
                <div className="flex gap-5 items-center">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(blog.title + '\n' + blog.content)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-600 hover:text-green-700"
                  >
                    <FaWhatsapp /> WhatsApp
                  </a>

                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-pink-500 hover:text-pink-600"
                  >
                    <FaInstagram /> Instagram
                  </a>

                  <a
                    href={`mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(blog.content)}`}
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
                  >
                    <FaEnvelope /> Email
                  </a>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
