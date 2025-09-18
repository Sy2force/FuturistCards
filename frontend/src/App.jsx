import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Cards = React.lazy(() => import('./pages/Cards'));
const CreateCard = React.lazy(() => import('./pages/CreateCard'));
const EditCard = React.lazy(() => import('./pages/EditCard'));
const MyCards = React.lazy(() => import('./pages/MyCards'));
const Favorites = React.lazy(() => import('./pages/Favorites'));
const BusinessDetails = React.lazy(() => import('./pages/BusinessDetails'));
const Profile = React.lazy(() => import('./pages/Profile'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const AdminCRM = React.lazy(() => import('./pages/AdminCRM'));
const About = React.lazy(() => import('./pages/About'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Loading spinner
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
      <p className="text-white/80">Loading...</p>
    </div>
  </div>
);

// Route protection
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <React.Suspense fallback={<LoadingSpinner />}>
        <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/cards/:id" element={<BusinessDetails />} />
              <Route path="/about" element={<About />} />

              {/* Protected Routes */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile-settings" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/favorites" 
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/my-cards" 
                element={
                  <ProtectedRoute>
                    <MyCards />
                  </ProtectedRoute>
                } 
              />

              {/* Business Routes */}
              <Route 
                path="/create-card" 
                element={
                  <ProtectedRoute>
                    <CreateCard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/edit-card/:id" 
                element={
                  <ProtectedRoute>
                    <EditCard />
                  </ProtectedRoute>
                } 
              />

              {/* Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminCRM />
                  </ProtectedRoute>
                } 
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
      
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(15, 23, 42, 0.9)',
            color: '#fff',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            backdropFilter: 'blur(10px)',
          },
        }}
      />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
