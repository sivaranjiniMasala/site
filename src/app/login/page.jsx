"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '../../context/GlobalProvider';
import './login.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { loginAdmin, isAdminAuthenticated } = useGlobalContext();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAdminAuthenticated) {
      router.push('/admin');
    }
  }, [isAdminAuthenticated, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Simulate loading delay for better UX
    setTimeout(() => {
      const isAuthenticated = loginAdmin(formData.email, formData.password);
      
      if (isAuthenticated) {
        router.push('/admin');
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-container">
              <img src="/images/Sivaranjini_logo.png" alt="Sivaranjini Logo" className="login-logo" />
            </div>
            <h1>Admin Portal</h1>
            <p>Welcome back! Please sign in to your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {error && (
              <div className="error-message">
                <span>⚠️ {error}</span>
              </div>
            )}

            <button 
              type="submit" 
              className={`login-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner">
                  <span className="spinner"></span>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* <div className="login-footer">
            <div className="demo-credentials">
              <h4>Demo Credentials:</h4>
              <div className="credential-item">
                <strong>Admin:</strong> admin@sivaranjini.com / admin123
              </div>
              <div className="credential-item">
                <strong>Super Admin:</strong> superadmin@sivaranjini.com / super456
              </div>
              <div className="credential-item">
                <strong>Manager:</strong> manager@sivaranjini.com / manager789
              </div>
            </div>
            
            <div className="back-to-home">
              <button onClick={() => router.push('/')} className="home-button">
                ← Back to Home
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
    