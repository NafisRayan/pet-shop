import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Blog = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    // TODO: Fetch approved blog posts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement blog post submission logic
      toast.success('Blog post submitted for approval!');
      setFormData({ title: '', content: '' });
    } catch (error) {
      toast.error('Failed to submit blog post');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Pet Blog</h1>

      {/* Create Post Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create a Blog Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter post title"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your blog post..."
              className="w-full p-2 border rounded-md"
              rows="6"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300"
          >
            Submit for Approval
          </button>
        </form>
      </div>

      {/* Blog Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => (
          <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-500 mb-4">
                By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="mb-4">{post.content}</p>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No blog posts yet.</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
