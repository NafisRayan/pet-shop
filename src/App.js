import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PetListing from './pages/PetListing';
import Adoption from './pages/Adoption';
import Dashboard from './pages/Dashboard';
import LostFound from './pages/LostFound';
import Blog from './pages/Blog';
import AdminPanel from './pages/admin/AdminPanel';
import PetRescue from './pages/PetRescue';
import VetSearch from './pages/VetSearch';
import Events from './pages/Events';
import Profile from './pages/Profile';
import PrivateRoute from './components/routes/PrivateRoute';
import AdminRoute from './components/routes/AdminRoute';
import axios from 'axios';
import { AuthProvider } from './context/AuthContext';

function App() {
  const navigate = useNavigate();

  const loginUser = async (credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      return true; // Indicate success
    } catch (error) {
      console.error('Login failed', error);
      return false; // Indicate failure
    }
  };

  const handleLogin = async (formData) => {
    console.log("Attempting to log in with:", formData);
    const isSuccess = await loginUser(formData);
    console.log("Login successful:", isSuccess);
    if (isSuccess) {
      navigate('/', { replace: true }); // Redirect to homepage
    } else {
      console.error("Login failed, user not redirected.");
    }
  };

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <ToastContainer />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pets" element={<PetListing />} />
            
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/adoption"
              element={
                <PrivateRoute>
                  <Adoption />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/lost-found"
              element={
                <PrivateRoute>
                  <LostFound />
                </PrivateRoute>
              }
            />
            <Route
              path="/blog"
              element={
                <PrivateRoute>
                  <Blog />
                </PrivateRoute>
              }
            />
            <Route
              path="/pet-rescue"
              element={
                <PrivateRoute>
                  <PetRescue />
                </PrivateRoute>
              }
            />
            <Route
              path="/vet-search"
              element={
                <PrivateRoute>
                  <VetSearch />
                </PrivateRoute>
              }
            />
            <Route
              path="/events"
              element={
                <PrivateRoute>
                  <Events />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
