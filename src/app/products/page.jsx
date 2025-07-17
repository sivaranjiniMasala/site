"use client";
import React from 'react'
import Image from 'next/image'
import './product.css'
import ProductNavigation from '../../components/ProductNavigation'
import { useGlobalContext } from "../../context/GlobalProvider";
const Products = [
  {
    id: 1,
    name: "Pundu idly Powder",
    image: "/images/Pundu_idly_Powder.png",
    price: "Rs.75.70",
    weight: "100gm"
  },
  {
    id: 2,
    name: "Curry Masala",
    image: "/images/Curry_Masala.png",
    price: "Rs.75.70",
    weight: "100gm"
  },
  {
    id: 3,
    name: "Chicken Masala",
    image: "/images/Chicken_Masala.png",
    price: "Rs.75.70",
    weight: "100gm"
  },
  {
    id: 4,
    name: "Sabja Masala",
    image: "//images//Sabja_masala.png",
    price: "Rs.79.70",
    weight: "100gm"
  },
  {
    id: 5,
    name: "Biryani Masala",
    image: "/images/Biryani_Masala.png",
    price: "Rs.75.70",
    weight: "100gm"
  },
  {
    id: 6,
    name: "Coriander Powder",
    image: "/images/Coriander_Powder.png",
    price: "Rs.75.70",
    weight: "100gm"
  },
  {
    id: 7,
    name: "Kulambu Chilly Masala",
    image: "/images/Kulambu_Chilly_Masala.png",
    price: "Rs.75.70",
    weight: "100gm"
  },
  {
    id: 8,
    name: "Fish Fry Masala",
    image: "/images/Fish_Fry_Masala.png",
    price: "Rs.75.70",
    weight: "100gm"
  },
  {
    id: 9,
    name: "Chicken 65 Masala",
    image: "/images/Chicken_65_Masala.png",
    price: "Rs.75.70",
    weight: "100gm"
  },
  {
    id: 10,
    name: "Idly Chilly Powder",
    image: "/images/Idly_Chilly_Powder.png",
    price: "Rs.75.70",
    weight: "100gm"
  },
  {
    id: 11,
    name: "Garam Masala",
    image: "/images/Garam_Masala.png",
    price: "Rs.75.70",
    weight: "100gm"
  },
  {
    id: 12,
    name: "Turmeric Powder",
    image: "/images/Turmeric_Powder.png",
    price: "Rs.75.70",
    weight: "100gm"
  },
  {
    id: 13,
    name: "Sambar Masala",
    image: "/images/Sambar_Masala.png",
    price: "Rs.75.70",
    weight: "100gm"
  },
  {
    id: 14,
    name: "Red Chilly Powder",
    image: "/images/Red_Chilly_Powder.png",
    price: "Rs.75.70",
    weight: "100gm"
  }
];

const page = () => {


  const { cartData, addToCart, getCartItemCount } = useGlobalContext();

    
  console.log("cartData", cartData);
  console.log("Total items in cart:", getCartItemCount());

  const handleAddToCart = (data) => {
    addToCart(data);
    console.log("Added to cart:", data);
  };
  return (
    <div className="products-page">
      <ProductNavigation />
      
      <div className="products-container">
        <div className="products-header">
          <h1>Our Products</h1>
          <a href="/cart" style={{ position: 'relative' }}>
            <div className="cart-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {getCartItemCount() > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#dc3545',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {getCartItemCount()}
                </span>
              )}
            </div>
          </a>
        </div>
        
        <div className="products-grid">
          {Products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  width={150}
                  height={150}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="weight">{product.weight}</p>
                <p className="price">{product.price}</p>
                <button onClick={() => handleAddToCart(product)} className="add-btn">Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Address</h3>
            <p>6/25, Narasimmapuram</p>
            <p>Lakshmi nagar,</p>
            <p>Kuriyamuthur,</p>
            <p>Coimbatore,</p>
            <p>641008</p>
          </div>
          
          <div className="footer-section">
            <h3>About us</h3>
            <ul>
              <li><a href="/products">Products</a></li>
              <li><a href="#about">FAQ</a></li>
              <li><a href="#account">My Account</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Privacy policy</h3>
            <ul>
              <li><a href="#return">Return and Refund Policy</a></li>
              <li><a href="#copyright">Copyrights Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact</h3>
            <p>+91 8610435965</p>
            <p>sivaranjinifoods@gmail.com</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>Copyright 2025 Sivaranjini Masala.</p>
          <p>All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default page