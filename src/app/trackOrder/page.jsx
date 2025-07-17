"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './trackOrder.css';
import { getTrackOrder } from '../../lib/appwrite';
const TrackOrderPage = () => {
  const router = useRouter();
  const [orderId, setOrderId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sample order data
  // const sampleOrders = [
  //   {
  //     orderId: 'ORD001',
  //     phone: '+919876543210',
  //     customerName: 'John Doe',
  //     email: 'john.doe@email.com',
  //     status: 'delivered',
  //     orderDate: '2025-01-12T10:30:00Z',
  //     deliveryDate: '2025-01-16T14:30:00Z',
  //     totalAmount: 151.40,
  //     address: '123 Main Street, Apartment 4B, Chennai, Tamil Nadu - 600001',
  //     items: [
  //       {
  //         id: 1,
  //         name: 'Turmeric Powder',
  //         image: '/images/Turmeric_Powder.png',
  //         price: 'Rs.75.70',
  //         weight: '100gm',
  //         quantity: 1
  //       },
  //       {
  //         id: 2,
  //         name: 'Curry Masala',
  //         image: '/images/Curry_Masala.png',
  //         price: 'Rs.75.70',
  //         weight: '100gm',
  //         quantity: 1
  //       }
  //     ],
  //     trackingSteps: [
  //       { step: 'Order Placed', date: '2025-01-12T10:30:00Z', completed: true },
  //       { step: 'Order Confirmed', date: '2025-01-12T11:00:00Z', completed: true },
  //       { step: 'In Processing', date: '2025-01-13T09:00:00Z', completed: true },
  //       { step: 'Shipped', date: '2025-01-14T16:00:00Z', completed: true },
  //       { step: 'Out for Delivery', date: '2025-01-16T09:00:00Z', completed: true },
  //       { step: 'Delivered', date: '2025-01-16T14:30:00Z', completed: true }
  //     ]
  //   },
  //   {
  //     orderId: 'ORD002',
  //     phone: '+919876543211',
  //     customerName: 'Jane Smith',
  //     email: 'jane.smith@email.com',
  //     status: 'shipped',
  //     orderDate: '2025-01-13T14:20:00Z',
  //     estimatedDelivery: '2025-01-18T18:00:00Z',
  //     totalAmount: 75.70,
  //     address: '456 Oak Avenue, Floor 2, Mumbai, Maharashtra - 400001',
  //     items: [
  //       {
  //         id: 3,
  //         name: 'Red Chilly Powder',
  //         image: '/images/Red_Chilly_Powder.png',
  //         price: 'Rs.75.70',
  //         weight: '200gm',
  //         quantity: 1
  //       }
  //     ],
  //     trackingSteps: [
  //       { step: 'Order Placed', date: '2025-01-13T14:20:00Z', completed: true },
  //       { step: 'Order Confirmed', date: '2025-01-13T15:00:00Z', completed: true },
  //       { step: 'In Processing', date: '2025-01-14T10:00:00Z', completed: true },
  //       { step: 'Shipped', date: '2025-01-15T12:00:00Z', completed: true },
  //       { step: 'Out for Delivery', date: '', completed: false },
  //       { step: 'Delivered', date: '', completed: false }
  //     ]
  //   },
  //   {
  //     orderId: 'ORD003',
  //     phone: '+919876543212',
  //     customerName: 'Mike Johnson',
  //     email: 'mike.johnson@email.com',
  //     status: 'processing',
  //     orderDate: '2025-01-14T09:15:00Z',
  //     estimatedDelivery: '2025-01-20T18:00:00Z',
  //     totalAmount: 227.10,
  //     address: '789 Pine Road, House No. 15, Bangalore, Karnataka - 560001',
  //     items: [
  //       {
  //         id: 4,
  //         name: 'Kulambu Chilly Masala',
  //         image: '/images/Kulambu_Chilly_Masala.png',
  //         price: 'Rs.75.70',
  //         weight: '100gm',
  //         quantity: 1
  //       },
  //       {
  //         id: 1,
  //         name: 'Turmeric Powder',
  //         image: '/images/Turmeric_Powder.png',
  //         price: 'Rs.75.70',
  //         weight: '200gm',
  //         quantity: 2
  //       }
  //     ],
  //     trackingSteps: [
  //       { step: 'Order Placed', date: '2025-01-14T09:15:00Z', completed: true },
  //       { step: 'Order Confirmed', date: '2025-01-14T10:00:00Z', completed: true },
  //       { step: 'In Processing', date: '2025-01-15T08:00:00Z', completed: true },
  //       { step: 'Shipped', date: '', completed: false },
  //       { step: 'Out for Delivery', date: '', completed: false },
  //       { step: 'Delivered', date: '', completed: false }
  //     ]
  //   }
  // ];

  const handleTrackOrder = async () => {
    setError('');
    setOrderData(null);
    
    if (!orderId.trim() || !phoneNumber.trim()) {
      setError('Please enter both Order ID and Phone Number');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await getTrackOrder(orderId.trim(), phoneNumber.trim());
      
      if (response) {
        console.log("Order found:", response);
        
        // Transform the Appwrite response to match the expected format
        const transformedOrder = {
          orderId: response.orderId,
          customerName: response.FullName,
          email: response.Email,
          phone: response.Phone,
          status: response.OrderStatus || 'processing',
          orderDate: response.createdAt,
          totalAmount: calculateTotalAmount(response.OrderData),
          address: `${response.Address}, ${response.City}, ${response.State} - ${response.ZipCode}`,
          items: JSON.parse(response.OrderData || '[]'),
          trackingSteps: generateTrackingSteps(response.OrderStatus || 'processing', response.createdAt)
        };
        
        setOrderData(transformedOrder);
      } else {
        setError('Order not found. Please check your Order ID and Phone Number.');
      }
    } catch (error) {
      console.error('Error tracking order:', error);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to calculate total amount from order data
  const calculateTotalAmount = (orderDataString) => {
    try {
      const items = JSON.parse(orderDataString || '[]');
      return items.reduce((total, item) => {
        const price = parseFloat(item.price?.replace('Rs.', '') || 0);
        return total + (price * (item.quantity || 1));
      }, 0);
    } catch (error) {
      console.error('Error calculating total amount:', error);
      return 0;
    }
  };

  // Helper function to generate tracking steps based on status
  const generateTrackingSteps = (status, orderDate) => {
    const baseSteps = [
      { step: 'Order Placed', date: orderDate, completed: true },
      { step: 'Order Confirmed', date: '', completed: false },
      { step: 'In Processing', date: '', completed: false },
      { step: 'Shipped', date: '', completed: false },
      { step: 'Out for Delivery', date: '', completed: false },
      { step: 'Delivered', date: '', completed: false }
    ];

    const statusIndex = {
      'enquiry': 0,
      'confirmed': 1,
      'processing': 2,
      'shipped': 3,
      'out_for_delivery': 4,
      'delivered': 5
    };

    const currentIndex = statusIndex[status] || 0;
    
    return baseSteps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex
    }));
  };
  // const handleTrackOrder = () => {
  //   setError('');
  //   setOrderData(null);
    
  //   if (!orderId.trim() || !phoneNumber.trim()) {
  //     setError('Please enter both Order ID and Phone Number');
  //     return;
  //   }

  //   setLoading(true);

  //   // Simulate API call delay


  //   setTimeout(() => {
  //     const foundOrder = sampleOrders.find(
  //       order => order.orderId.toLowerCase() === orderId.toLowerCase().trim() && 
  //                order.phone === phoneNumber.trim()
  //     );

  //     if (foundOrder) {
  //       setOrderData(foundOrder);
  //     } else {
  //       setError('Order not found. Please check your Order ID and Phone Number.');
  //     }
      
  //     setLoading(false);
  //   }, 1000);
  // };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'delivered': '#22543d',
      'shipped': '#065f46',
      'processing': '#b45309',
      'confirmed': '#1e40af',
      'enquiry': '#92400e'
    };
    return colors[status] || '#4a5568';
  };

  return (
    <div className="track-order-page">
      {/* Navigation Header */}
      <nav className="track-navbar">
        <div className="nav-container">
          <div className="nav-left">
            <div className="logo-section">
              <Image
                src="/images/Sivaranjini_logo.png"
                alt="Sivaranjini Logo"
                width={40}
                height={40}
                className="nav-logo"
              />
              <span className="brand-name">Sivaranjini</span>
            </div>
          </div>
          
          <div className="nav-center">
            <h2 className="page-title">Track Your Order</h2>
          </div>
          
          <div className="nav-right">
            <button 
              className="home-btn"
              onClick={() => router.push('/')}
              title="Back to Home"
            >
              <i className="fa-solid fa-home"></i>
              <span>Home</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="track-container">
        <div className="track-header">
          <h1>Find Your Order Status</h1>
          <p>Enter your order details to track the current status and delivery progress</p>
        </div>

        <div className="track-form">
          <div className="form-group">
            <label htmlFor="orderId">Order ID *</label>
            <input
              type="text"
              id="orderId"
              placeholder="e.g., ORD001"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className={error && !orderId.trim() ? 'error' : ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number *</label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="e.g., +919876543210"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={error && !phoneNumber.trim() ? 'error' : ''}
            />
          </div>

          <button 
            className="track-btn" 
            onClick={handleTrackOrder}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Tracking...
              </>
            ) : (
              <>
                <i className="fa-solid fa-search"></i>
                Track Order
              </>
            )}
          </button>

          {error && (
            <div className="error-message">
              <i className="fa-solid fa-exclamation-triangle"></i>
              {error}
            </div>
          )}
        </div>

        {/* Sample Order IDs for testing */}
    

        {orderData && (
          <div className="order-details">
            <div className="order-header">
              <div className="order-info">
                <h2>Order #{orderData.orderId}</h2>
                <span 
                  className={`order-status ${orderData.status}`}
                  style={{ backgroundColor: getStatusColor(orderData.status) }}
                >
                  {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
                </span>
              </div>
              <div className="order-meta">
                <p><strong>Customer:</strong> {orderData.customerName}</p>
                <p><strong>Order Date:</strong> {formatDate(orderData.orderDate)}</p>
                <p><strong>Total Amount:</strong> Rs.{orderData.totalAmount.toFixed(2)}</p>
              </div>
            </div>

            {/* Tracking Progress */}
            <div className="tracking-section">
              <h3>📍 Tracking Progress</h3>
              <div className="tracking-timeline">
                {orderData.trackingSteps.map((step, index) => (
                  <div key={index} className={`timeline-item ${step.completed ? 'completed' : 'pending'}`}>
                    <div className="timeline-marker">
                      {step.completed ? (
                        <i className="fa-solid fa-check"></i>
                      ) : (
                        <i className="fa-regular fa-circle"></i>
                      )}
                    </div>
                    <div className="timeline-content">
                      <h4>{step.step}</h4>
                      {step.date && <p>{formatDate(step.date)}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="order-items">
              <h3>📦 Order Items</h3>
              <div className="items-grid">
                {orderData.items.map((item, index) => (
                  <div key={index} className="item-card">
                    <div className="item-image">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = '/images/placeholder.png';
                        }}
                      />
                    </div>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-weight">{item.weight}</p>
                      <div className="item-pricing">
                        <span className="item-price">{item.price}</span>
                        <span className="item-quantity">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Information */}
            <div className="delivery-info">
              <h3>🚚 Delivery Information</h3>
              <div className="delivery-details">
                <div className="delivery-address">
                  <h4>Delivery Address</h4>
                  <p>{orderData.address}</p>
                </div>
                <div className="delivery-timing">
                  <h4>
                    {orderData.status === 'delivered' ? 'Delivered On' : 'Reach Consultant to get updates'}
                  </h4>
                  <p>
                    {orderData.deliveryDate 
                      ? formatDate(orderData.deliveryDate)
                      : formatDate(orderData.estimatedDelivery)
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrderPage;
