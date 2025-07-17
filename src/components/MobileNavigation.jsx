"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '../context/GlobalProvider';
import './MobileNavigation.css';

const MobileNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdminAuthenticated, logoutAdmin } = useGlobalContext();
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSignInClick = () => {
    router.push('/login');
    closeMobileMenu();
  };

  const handleAdminLogout = () => {
    logoutAdmin();
    closeMobileMenu();
  };

  return (
    <nav className="mobile-nav">
      <div className="logo">
        <Image
          src="/images/Sivaranjini_logo.png"
          alt="Logo"
          width={150}
          height={150}
        />
      </div>

      {/* Desktop Navigation */}
      <div className="desktop-nav">
        <div className="navigations">
          <ul>
            <li>
              <a href="#hero">Home</a>
            </li>
            <li>
              <a href="/trackOrder">TrackOrder</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="#contact">Contacts</a>
            </li>
          </ul>
        </div>
        <div className="CTA">
          <div className="icon_hold" onClick={() => {window.location.href="/products";}}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="icon_hold" onClick={() => {window.location.href='/cart';}}>
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          {isAdminAuthenticated ? (
            <div className="admin-section">
              <button onClick={() => router.push('/admin')} className="admin-btn">
                Admin
              </button>
              <div className="icon_hold" onClick={handleAdminLogout}>
                <i className="fa-solid fa-sign-out-alt"></i>
              </div>
            </div>
          ) : (
            <button onClick={handleSignInClick}>Sign In</button>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
          <div className="mobile-menu-content">
            <div className="mobile-menu-header">
              <div className="mobile-logo">
               
              </div>
              {/* <button className="close-btn" onClick={closeMobileMenu}>
                <i className="fa-solid fa-times"></i>
              </button> */}
            </div>
            
            <ul className="mobile-nav-links">
              <li>
                <a href="#hero" onClick={closeMobileMenu}>
                  <i className="fa-solid fa-home"></i>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={closeMobileMenu}>
                  <i className="fa-solid fa-info-circle"></i>
                  About
                </a>
              </li>
              <li>
                <a  href="/products" onClick={closeMobileMenu}>
                  <i className="fa-solid fa-box"></i>
                  Products
                </a>
              </li>
              <li>
                <a href="#contact" onClick={closeMobileMenu}>
                  <i className="fa-solid fa-phone"></i>
                  Contacts
                </a>
              </li>
            </ul>

            <div className="mobile-cta">
              <div className="mobile-actions">
                <button className="action-btn search-btn" onClick={() => {window.location.href="/products"; closeMobileMenu();}}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                  Search
                </button>
                <button className="action-btn cart-btn" onClick={() => {window.location.href='/cart'; closeMobileMenu();}}>
                  <i className="fa-solid fa-cart-shopping"></i>
                  Cart
                </button>
              </div>
              
              {isAdminAuthenticated ? (
                <div className="admin-mobile-section">
                  <button 
                    className="auth-btn admin-btn" 
                    onClick={() => {router.push('/admin'); closeMobileMenu();}}
                  >
                    <i className="fa-solid fa-shield-alt"></i>
                    Admin Dashboard
                  </button>
                  <button 
                    className="auth-btn logout-btn" 
                    onClick={handleAdminLogout}
                  >
                    <i className="fa-solid fa-sign-out-alt"></i>
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  className="auth-btn signin-btn" 
                  onClick={handleSignInClick}
                >
                  <i className="fa-solid fa-sign-in-alt"></i>
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
    </nav>
  );
};

export default MobileNavigation;
