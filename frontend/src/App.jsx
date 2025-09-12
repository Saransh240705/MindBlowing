import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CreatePost from './pages/CreatePost.jsx';
import PostDetail from './pages/PostDetail.jsx';
import ManagePosts from './pages/ManagePosts.jsx';
import EditPost from './pages/EditPost.jsx';
import Dashboard from './pages/Dashboard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

// Auth route that redirects to home if already logged in
const AuthRoute = ({ children }) => {
  // Get token from localStorage to do an initial check
  const token = localStorage.getItem('token');
  
  // If token exists, redirect to home page
  if (token) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route 
              path="/login" 
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <AuthRoute>
                  <Register />
                </AuthRoute>
              } 
            />
            <Route 
              path="*" 
              element={
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                  <Navbar />
                  <main className="pt-16">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/post/:id" element={<PostDetail />} />
                      <Route path="/create" element={
                        <PrivateRoute>
                          <CreatePost />
                        </PrivateRoute>
                      } />
                      <Route path="/manage" element={
                        <PrivateRoute>
                          <ManagePosts />
                        </PrivateRoute>
                      } />
                      <Route path="/edit/:id" element={
                        <PrivateRoute>
                          <EditPost />
                        </PrivateRoute>
                      } />
                      <Route path="/dashboard" element={
                        <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute>
                      } />
                    </Routes>
                  </main>
                </div>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
