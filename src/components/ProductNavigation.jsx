"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const ProductNavigation = () => {
  return (
    <nav style={{
      width: '100%',
      height: '80px',
      padding: '10px 20px',
      backgroundColor: '#99BD98',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div className="logo" style={{ cursor: 'pointer' }}>
        <Link href="/">
          <Image
            src="/images/Sivaranjini_logo.png"
            alt="Logo"
            width={150}
            height={150}
          />
        </Link>
      </div>

      <Link href="/" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        textDecoration: 'none',
        color: '#99BD98',
        fontWeight: '600',
        fontSize: 'medium',
        transition: 'all 0.4s ease'
      }}
      onMouseEnter={(e) => {
        e.target.style.color = 'white';
        e.target.style.backgroundColor = '#96b79d';
        e.target.style.border = '#fdfdfd 1px solid';
      }}
      onMouseLeave={(e) => {
        e.target.style.color = '#99BD98';
        e.target.style.backgroundColor = '#ffffff';
        e.target.style.border = 'none';
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to Home
      </Link>
    </nav>
  );
};

export default ProductNavigation;
