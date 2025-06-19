import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-purple-700">Blogify</div>
      <div className="space-x-4">
        <Link to="/register" className="text-gray-600 hover:text-purple-600">Register</Link>
        <Link to="/login" className="text-gray-600 hover:text-purple-600">Login</Link>
        <Link to="/dashboard" className="text-gray-600 hover:text-purple-600">Dashboard</Link>
        <button onClick={handleLogout}
                className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700">
          Logout
        </button>
      </div>
    </nav>
  );
}
