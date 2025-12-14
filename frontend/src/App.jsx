import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import SkipLink from './components/common/SkipLink';

// Public Pages
import LazyRoute from './components/LazyRoute'

// Lazy loaded pages for better performance
const Landing = () => LazyRoute({ importFunc: () => import('./pages/public/Landing') })
const About = () => LazyRoute({ importFunc: () => import('./pages/public/About') })
const Login = () => LazyRoute({ importFunc: () => import('./pages/public/Login') })
const Register = () => LazyRoute({ importFunc: () => import('./pages/public/Register') })
const Cards = () => LazyRoute({ importFunc: () => import('./pages/public/Cards') })
const CardDetailsPage = () => LazyRoute({ importFunc: () => import('./pages/CardDetailsPage') })

// Dashboard Pages
const Dashboard = () => LazyRoute({ importFunc: () => import('./pages/dashboard/Dashboard') })
const CreateCard = () => LazyRoute({ importFunc: () => import('./pages/dashboard/CreateCard') })
const MyCards = () => LazyRoute({ importFunc: () => import('./pages/dashboard/MyCards') })
const Profile = () => LazyRoute({ importFunc: () => import('./pages/dashboard/Profile') })

// Admin Pages
const AdminPanel = () => LazyRoute({ importFunc: () => import('./pages/admin/AdminPanel') })

// Other Pages
const EditCardPage = () => LazyRoute({ importFunc: () => import('./pages/EditCardPage') })
const FavoritesPage = () => LazyRoute({ importFunc: () => import('./pages/FavoritesPage') })
const ErrorPage = () => LazyRoute({ importFunc: () => import('./pages/ErrorPage') });

// Components
import ProtectedRoute from './components/ProtectedRoute';

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    // Analytics tracking would go here in production
    // Track page navigation for metrics
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <SkipLink />
      <Navbar />
      <main id="main-content" className="flex-1">
        <Routes>
          {/* PUBLIC MINI-SITE ROUTES */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/cards/:id" element={<CardDetailsPage />} />
          
          {/* DASHBOARD PRO ROUTES */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-card" 
            element={
              <ProtectedRoute requiredRole="business">
                <CreateCard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-cards" 
            element={
              <ProtectedRoute requiredRole="business">
                <MyCards />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* ADMIN ROUTES */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          
          {/* OTHER ROUTES */}
          <Route 
            path="/edit-card/:id" 
            element={
              <ProtectedRoute requiredRole="business">
                <EditCardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/favorites" 
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <>
      <Helmet>
        <title>FuturistCards - Cartes de visite digitales</title>
        <meta name="description" content="Créez et partagez vos cartes de visite digitales professionnelles" />
      </Helmet>
      <AppRoutes />
    </>
  );
}

export default App;
