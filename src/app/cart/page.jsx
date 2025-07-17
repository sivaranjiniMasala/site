"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import './cart.css';
import ProductNavigation from '../../components/ProductNavigation'
import { useGlobalContext } from "../../context/GlobalProvider";
import { createOrder } from "../../lib/appwrite";

const cart = () => {
  const { cartData, setCartData, isCartLoaded, clearCart: clearCartHelper } = useGlobalContext();
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [orderSuccessData, setOrderSuccessData] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    additionalInfo: ''
  });

  // Show loading state while cart data is being loaded from localStorage
  if (!isCartLoaded) {
    return (
      <div className="cart-page">
        <ProductNavigation />
        <div className="cart-container">
          <div style={{ 
            padding: '60px 20px', 
            textAlign: 'center',
            background: 'white',
            borderRadius: '8px',
            margin: '20px 0'
          }}>
            <h2>Loading cart...</h2>
          </div>
        </div>
      </div>
    );
  }

  // Transform cartData to cart items with quantities (handle duplicates)
  const getCartItemsWithQuantity = () => {
    const itemMap = {};
    cartData.forEach(item => {
      const key = item.id;
      if (itemMap[key]) {
        itemMap[key].quantity += 1;
      } else {
        itemMap[key] = {
          ...item,
          unitPrice: parseFloat(item.price.replace('Rs.', '')),
          quantity: 1,
          weight: item.weight
        };
      }
    });
    return Object.values(itemMap);
  };

  const cartItems = getCartItemsWithQuantity();

  function generateOrderId(key) {
  const now = new Date();
  const timePart = now.getFullYear().toString()
    + (now.getMonth() + 1).toString().padStart(2, '0')
    + now.getDate().toString().padStart(2, '0')
    + now.getHours().toString().padStart(2, '0')
    + now.getMinutes().toString().padStart(2, '0')
    + now.getSeconds().toString().padStart(2, '0');

  return `${key.toUpperCase()}-${timePart}`;
}

 const handleSubmitOrder = async () => {
    // Validate cart
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items to your cart before placing an order.");
      return;
    }

    // Validate required billing details
    const requiredFields = ['fullName', 'phone', 'email', 'address', 'city', 'state', 'zipCode'];
    const missingFields = requiredFields.filter(field => !billingDetails[field].trim());
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(billingDetails.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(billingDetails.phone.replace(/\D/g, ''))) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      // Show loading state
      const submitButton = document.querySelector('.checkout-btn');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'PLACING ORDER...';
      submitButton.disabled = true;

      const orderId = generateOrderId('ORDER');
      const orderData = {
        orderId: orderId,
        cartItems: cartItems,
        billingDetails: billingDetails,
        total: total,
        subtotal: subtotal,
        deliveryCharges: deliveryCharges
      };

      console.log("Submitting order:", orderData);
      console.log("Current domain:", window.location.origin);

      const response = await createOrder({
        orderId: orderData.orderId, 
        cartItems: orderData.cartItems, 
        billingDetails: orderData.billingDetails
      });

      console.log("Order created successfully:", response);
      
      // Show success popup instead of alert
      setOrderSuccessData({
        orderId: orderId,
        total: total
      });
      setShowOrderSuccess(true);

    } catch (error) {
      console.error("Error creating order:", error);
      console.error("Error type:", error.constructor.name);
      console.error("Error message:", error.message);
      
      // Show detailed error message
      let errorMessage = "There was an error placing your order.";
      
      if (error.message && error.message.includes('NetworkError')) {
        errorMessage = `🚫 Connection Error!\n\nThis appears to be a CORS (Cross-Origin) issue with Appwrite.\n\nTo fix this:\n1. Go to Appwrite Console (cloud.appwrite.io)\n2. Select your project\n3. Go to Settings → Platforms\n4. Add Web App platform with domain: ${window.location.origin}\n\nCurrent domain: ${window.location.origin}`;
      } else if (error.message) {
        errorMessage += `\n\nError details: ${error.message}`;
      }
      
      alert(errorMessage);
    } finally {
      // Reset button state
      const submitButton = document.querySelector('.checkout-btn');
      if (submitButton) {
        submitButton.textContent = 'PLACE ORDER PAYMENT';
        submitButton.disabled = false;
      }
    }
  }


  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  };

  const deliveryCharges = 0;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryCharges;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      // Remove all instances of this product from cartData
      setCartData(cartData.filter(item => item.id !== id));
    } else {
      // Find current quantity in cartData
      const currentCount = cartData.filter(item => item.id === id).length;
      const difference = newQuantity - currentCount;
      
      if (difference > 0) {
        // Add more items
        const productToAdd = cartData.find(item => item.id === id);
        const newItems = Array(difference).fill(productToAdd);
        setCartData([...cartData, ...newItems]);
      } else if (difference < 0) {
        // Remove items
        const updatedCart = [...cartData];
        const itemsToRemove = Math.abs(difference);
        let removedCount = 0;
        
        for (let i = updatedCart.length - 1; i >= 0 && removedCount < itemsToRemove; i--) {
          if (updatedCart[i].id === id) {
            updatedCart.splice(i, 1);
            removedCount++;
          }
        }
        setCartData(updatedCart);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setBillingDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearCart = () => {
    clearCartHelper();
  };

  const addTestItems = () => {
    const testItem = {
      id: 1,
      name: "Chicken Masala",
      image: "/images/Chicken_Masala.png",
      price: "Rs.75.70",
      weight: "100gm"
    };
    // Add 3 items to test duplicate handling
    setCartData([...cartData, testItem, testItem, testItem]);
  };

  const fillTestBillingData = () => {
    setBillingDetails({
      fullName: 'John Doe',
      phone: '9876543210',
      email: 'john.doe@example.com',
      address: '123 Test Street, Test Colony',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600001',
      additionalInfo: 'Test billing address'
    });
  };

  const testAppwriteConnection = async () => {
    try {
      console.log("Testing Appwrite connection...");
      console.log("Current domain:", window.location.origin);
      
      // Try to create a test order
      const testOrder = {
        orderId: `TEST-${Date.now()}`,
        cartItems: [{ name: "Test Item", price: "10.00" }],
        billingDetails: { fullName: "Test User" }
      };
      
      const response = await createOrder(testOrder);
      console.log("✅ Appwrite connection successful!", response);
      alert("✅ Appwrite connection successful! CORS is configured correctly.");
    } catch (error) {
      console.error("❌ Appwrite connection failed:", error);
      
      if (error.message && error.message.includes('NetworkError')) {
        alert(`❌ CORS Error!\n\nPlease add this domain to Appwrite:\n${window.location.origin}\n\nGo to: Appwrite Console → Settings → Platforms → Add Web App`);
      } else {
        alert(`❌ Connection test failed:\n${error.message}`);
      }
    }
  };

  const handleCloseOrderSuccess = () => {
    // Clear cart and reset form when popup is closed
    clearCartHelper();
    setBillingDetails({
      fullName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      additionalInfo: ''
    });
    setShowOrderSuccess(false);
    setOrderSuccessData(null);
  };

  return (
    <div className="cart-page">
      <ProductNavigation />
      
      {/* Order Success Popup */}
      {showOrderSuccess && orderSuccessData && (
        <div className="order-success-overlay">
          <div className="order-success-popup">
            <div className="success-icon">🎉</div>
            <h2>Order placed successfully!</h2>
            <div className="order-details">
              <p><strong>Your order ID is: {orderSuccessData.orderId}</strong></p>
              <p>Total Amount: ₹{orderSuccessData.total}</p>
            </div>
            <div className="screenshot-instruction">
              <p><strong>📸 Please take a screenshot to track your order</strong></p>
            </div>
            <button 
              className="close-popup-btn" 
              onClick={handleCloseOrderSuccess}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      <div className="cart-container">
        <div className="cart-header">
          <h1>Cart</h1>
          <p className="items-count">
            {cartItems.length} unique item{cartItems.length !== 1 ? 's' : ''} 
            ({cartData.length} total item{cartData.length !== 1 ? 's' : ''})
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="cart-content">
            {/* Cart Table */}
            <div className="cart-table">
              <div className="table-header">
                <span>PRODUCT</span>
                <span>UNIT PRICE</span>
                <span>QUANTITY</span>
                <span>SUB TOTAL</span>
              </div>
              
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="product-info">
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      width={60}
                      height={60}
                      style={{ objectFit: 'contain' }}
                    />
                    <div className="product-details">
                      <h4>{item.name}</h4>
                      <span>{item.weight}</span>
                    </div>
                  </div>
                  <div className="unit-price">₹ {item.unitPrice}</div>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                  <div className="subtotal">₹ {item.unitPrice * item.quantity}</div>
                </div>
              ))}
            </div>

            {/* Billing Details */}
            <div className="billing-section">
              <h3>BILL DETAILS</h3>
              <p style={{ 
                color: '#666', 
                fontSize: '0.9rem', 
                marginBottom: '20px',
                fontStyle: 'italic' 
              }}>
                * Required fields
              </p>
              
              <div className="billing-form">
                <div className="form-row">
                  <div className="form-group">
                    <div className="radio-group">
                      <input type="radio" id="online" name="payment" defaultChecked />
                      <label htmlFor="online">Online Payment</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="radio-group">
                      <input type="radio" id="cod" name="payment" />
                      <label htmlFor="cod">Cash on Delivery</label>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <input 
                    type="text" 
                    placeholder="Full Name *"
                    value={billingDetails.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone *"
                    value={billingDetails.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>

                <div className="form-row">
                  <input 
                    type="email" 
                    placeholder="Email *"
                    value={billingDetails.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="full-width"
                    required
                  />
                </div>

                <div className="form-row">
                  <textarea 
                    placeholder="Address *"
                    value={billingDetails.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="full-width"
                    rows="3"
                    required
                  />
                </div>

                <div className="form-row">
                  <input 
                    type="text" 
                    placeholder="City *"
                    value={billingDetails.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                  />
                  <input 
                    type="text" 
                    placeholder="State *"
                    value={billingDetails.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    required
                  />
                </div>

                <div className="form-row">
                  <input 
                    type="text" 
                    placeholder="Zip Code *"
                    value={billingDetails.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    required
                  />
                </div>

                <h4>BILLING ADDRESS</h4>
                <textarea 
                  placeholder="Additional Information"
                  value={billingDetails.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  className="full-width"
                  rows="3"
                />
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <div className="summary-row">
                  <span>Cart Total</span>
                  <span>₹ {subtotal}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Charges</span>
                  <span>₹ {deliveryCharges}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹ {total}</span>
                </div>
                
                <button className="checkout-btn" onClick={handleSubmitOrder}>
                  PLACE ORDER PAYMENT
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="empty-cart">
            <div className="empty-cart-illustration">
              <div style={{
                width: '300px',
                height: '200px',
                background: '#f0f0f0',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                color: '#ccc'
              }}>
                🛒
              </div>
            </div>
            <h2>YOUR CART IS EMPTY</h2>
            <button onClick={() => window.location.href = '/products'} className="shop-now-btn">
              Continue Shopping
            </button>
          </div>
        )}
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
            <h3>Social Media</h3>
            <p>sivaranjinifoods@gmail.com</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>Copyright 2025 Sivaranjini Masala.</p>
          <p>All Rights Reserved.</p>
        </div>
      </footer>

      {/* Test Buttons */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* <button 
          onClick={testAppwriteConnection}
          style={{
            background: '#ff6b6b',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Test Connection
        </button> */}
        <button 
          onClick={clearCart}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Clear Cart
        </button>
       
      </div>
    </div>
  )
}

export default cart
