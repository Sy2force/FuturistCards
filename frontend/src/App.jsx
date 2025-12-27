import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Core page imports
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/Profile';
import CreateCard from './pages/dashboard/CreateCard';
import MyCards from './pages/dashboard/MyCards';
import AdminPanel from './pages/admin/AdminPanel';
import ErrorPage from './pages/ErrorPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import CardsPage from './pages/CardsPage';
import CardDetailsPage from './pages/CardDetailsPage';
import EditCardPage from './pages/EditCardPage';
import AboutPage from './pages/AboutPage';
import FavoritesPage from './pages/FavoritesPage';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/cards/:id" element={<CardDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* PROTECTED ROUTES */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['user', 'business', 'admin']}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/favorites" 
            element={
              <ProtectedRoute allowedRoles={['user', 'business', 'admin']}>
                <FavoritesPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute allowedRoles={['user', 'business', 'admin']}>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/create-card" 
            element={
              <ProtectedRoute allowedRoles={['business', 'admin']}>
                <CreateCard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/my-cards" 
            element={
              <ProtectedRoute allowedRoles={['business', 'admin']}>
                <MyCards />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/edit-card/:id" 
            element={
              <ProtectedRoute allowedRoles={['business', 'admin']}>
                <EditCardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* ADMIN ROUTES */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          
          {/* UNAUTHORIZED */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
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
