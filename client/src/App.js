// App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import CreateBlog from './pages/CreateBlog';
import MyBlogs from './pages/MyBlogs';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Navigate to="/login" />} />

        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <div className="text-center mt-10 text-xl text-red-500">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
