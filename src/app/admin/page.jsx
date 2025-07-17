"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '../../context/GlobalProvider';
import Image from 'next/image';
import './admin.css';
import { getOrdersForAdmin, updateOrderStatus, deleteOrder } from '../../lib/appwrite'; // Adjust the import based on your project structure


const AdminDashboard = () => {
  const { isAdminAuthenticated, logoutAdmin, cartData } = useGlobalContext();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('orders');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState({});


  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAdminAuthenticated) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAdminAuthenticated, router]);

  const handleLogout = () => {
    logoutAdmin();
    router.push('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false); // Close mobile sidebar when tab changes
    setShowOrderForm(false); // Close order form when switching tabs
    setEditingOrder(null); // Clear editing state
  };

  // Handle status change with backend update
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Set loading state for this specific order
      setUpdatingStatus(prev => ({ ...prev, [orderId]: true }));

      // Optimistically update the UI first
      setOrders(orders.map(order => 
        order.orderId === orderId 
          ? { ...order, OrderStatus: newStatus }
          : order
      ));

      // Then update the backend
      await updateOrderStatus(orderId, newStatus);
      console.log(`Order ${orderId} status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      
      // Revert the UI change if backend update fails
      setOrders(orders.map(order => 
        order.orderId === orderId 
          ? { ...order, OrderStatus: order.OrderStatus } // Revert to original status
          : order
      ));
      
      // Show error message to user
      alert('Failed to update order status. Please try again.');
    } finally {
      // Clear loading state
      setUpdatingStatus(prev => ({ ...prev, [orderId]: false }));
    }
  };

  // Handle order deletion with backend update
  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        // Optimistically remove from UI first
        const originalOrders = [...orders];
        setOrders(orders.filter(order => order.orderId !== orderId));

        // Then delete from backend
        await deleteOrder(orderId);
        console.log(`Order ${orderId} deleted successfully`);
      } catch (error) {
        console.error("Error deleting order:", error);
        
        // Revert the UI change if backend deletion fails
        setOrders(originalOrders);
        
        // Show error message to user
        alert('Failed to delete order. Please try again.');
      }
    }
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setShowOrderForm(true);
  };

  // Helper function to parse and display order data
  const parseOrderData = (orderDataString) => {
    try {
      const orderItems = JSON.parse(orderDataString);
      return Array.isArray(orderItems) ? orderItems : [];
    } catch (error) {
      console.error("Error parsing order data:", error);
      return [];
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Mock data for demonstration - following the exact structure you provided
  const [orders, setOrders] = useState([]);


  //get orders from appwrite//
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrdersForAdmin();
        setOrders(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const orderStatusOptions = ['enquiry', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="admin-dashboard">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <Image
              src="/images/Sivaranjini_logo.png"
              alt="Sivaranjini Logo"
              width={50}
              height={50}
              className="sidebar-logo"
            />
          </div>
          <h2>Admin Panel</h2>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => handleTabChange('orders')}
          >
            <i className="fa-solid fa-shopping-bag"></i>
            <span>Orders</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button onClick={() => router.push('/')} className="home-btn">
            <i className="fa-solid fa-home"></i>
            <span>Back to Home</span>
          </button>
          <button onClick={handleLogout} className="logout-btn">
            <i className="fa-solid fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-header">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={toggleSidebar}>
              <i className="fa-solid fa-bars"></i>
            </button>
            <h1>Order Management</h1>
          </div>
          <div className="admin-user">
            <span className="welcome-text">Welcome, Admin</span>
            <div className="user-avatar">
              <i className="fa-solid fa-user-shield"></i>
            </div>
          </div>
        </div>

        <div className="admin-content">
          {/* Orders Tab */}
          <div className="orders-content">
            <div className="content-header">
              <h3>Order Management</h3>
            </div>

            {!showOrderForm ? (
              <>
                {/* Desktop/Tablet Table View */}
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Full Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.orderId}>
                          <td className="order-id">{order.orderId}</td>
                          <td>{order.FullName}</td>
                          <td>{order.Phone}</td>
                          <td className="email-cell">{order.Email}</td>
                          <td>{order.City}, {order.State}</td>
                          <td>
                            <select 
                              value={order.OrderStatus} 
                              onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                              className={`status-dropdown ${order.OrderStatus}`}
                              disabled={updatingStatus[order.orderId]}
                            >
                              {orderStatusOptions.map(status => (
                                <option key={status} value={status}>
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="date-cell">{formatDate(order.createdAt)}</td>
                          <td className="actions-cell">
                            <button 
                              className="action-btn view" 
                              onClick={() => handleEditOrder(order)}
                              title="View Details"
                            >
                              <i className="fa-solid fa-eye"></i>
                            </button>
                            <button 
                              className="action-btn delete" 
                              onClick={() => handleDeleteOrder(order.orderId)}
                              title="Delete"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="mobile-orders-container">
                  {orders.map(order => (
                    <div key={order.orderId} className="mobile-order-card">
                      <div className="mobile-order-header">
                        <div className="mobile-order-id">{order.orderId}</div>
                        <div className="mobile-order-date">{formatDate(order.createdAt)}</div>
                      </div>
                      
                      <div className="mobile-order-info">
                        <div className="mobile-info-item">
                          <div className="mobile-info-label">Customer</div>
                          <div className="mobile-info-value">{order.FullName}</div>
                        </div>
                        <div className="mobile-info-item">
                          <div className="mobile-info-label">Phone</div>
                          <div className="mobile-info-value">{order.Phone}</div>
                        </div>
                        <div className="mobile-info-item">
                          <div className="mobile-info-label">Email</div>
                          <div className="mobile-info-value">{order.Email}</div>
                        </div>
                        <div className="mobile-info-item">
                          <div className="mobile-info-label">Location</div>
                          <div className="mobile-info-value">{order.City}, {order.State}</div>
                        </div>
                      </div>
                      
                      <div className="mobile-order-status">
                        <select 
                          value={order.OrderStatus} 
                          onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                          className={`status-dropdown ${order.OrderStatus}`}
                          disabled={updatingStatus[order.orderId]}
                        >
                          {orderStatusOptions.map(status => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="mobile-order-actions">
                        <button 
                          className="action-btn view" 
                          onClick={() => handleEditOrder(order)}
                          title="View Details"
                        >
                          <i className="fa-solid fa-eye"></i>
                          View
                        </button>
                        <button 
                          className="action-btn delete" 
                          onClick={() => handleDeleteOrder(order.orderId)}
                          title="Delete"
                        >
                          <i className="fa-solid fa-trash"></i>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="order-form-container">
                <div className="order-form-header">
                  <h3>View Order Details</h3>
                  <button 
                    className="close-form-btn" 
                    onClick={() => setShowOrderForm(false)}
                  >
                    <i className="fa-solid fa-times"></i>
                  </button>
                </div>
                
                <div className="order-details">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Order ID</label>
                      <input 
                        type="text" 
                        value={editingOrder?.orderId || ''} 
                        readOnly
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        value={editingOrder?.FullName || ''} 
                        readOnly
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Phone</label>
                      <input 
                        type="tel" 
                        value={editingOrder?.Phone || ''} 
                        readOnly
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email</label>
                      <input 
                        type="email" 
                        value={editingOrder?.Email || ''} 
                        readOnly
                      />
                    </div>
                    
                    <div className="form-group full-width">
                      <label>Address</label>
                      <textarea 
                        value={editingOrder?.Address || ''} 
                        rows="3"
                        readOnly
                      ></textarea>
                    </div>
                    
                    <div className="form-group">
                      <label>City</label>
                      <input 
                        type="text" 
                        value={editingOrder?.City || ''} 
                        readOnly
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>State</label>
                      <input 
                        type="text" 
                        value={editingOrder?.State || ''} 
                        readOnly
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Zip Code</label>
                      <input 
                        type="text" 
                        value={editingOrder?.ZipCode || ''} 
                        readOnly
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Order Status</label>
                      <input 
                        type="text" 
                        value={editingOrder?.OrderStatus || ''} 
                        readOnly
                        className={`status-display ${editingOrder?.OrderStatus}`}
                      />
                    </div>
                    
                    <div className="form-group full-width">
                      <label>Billing Address</label>
                      <textarea 
                        value={editingOrder?.BillingAddress || ''} 
                        rows="3"
                        readOnly
                      ></textarea>
                    </div>
                  </div>
                  
                  {/* Order Items Cards */}
                  <div className="order-items-section">
                    <h4>Order Items</h4>
                    <div className="order-items-grid">
                      {parseOrderData(editingOrder?.OrderData || '[]').map((item, index) => (
                        <div key={index} className="order-item-card">
                          <div className="item-image">
                            <img 
                              src={item.image || '/images/placeholder.png'} 
                              alt={item.name || 'Product'} 
                              onError={(e) => {
                                e.target.src = '/images/placeholder.png';
                              }}
                            />
                          </div>
                          <div className="item-details">
                            <h5 className="item-name">{item.name || 'Unknown Product'}</h5>
                            <div className="item-info">
                              <span className="item-weight">{item.weight || 'N/A'}</span>
                              <span className="item-price">{item.price || 'N/A'}</span>
                            </div>
                            <div className="item-quantity">
                              <span>Quantity: {item.quantity || 1}</span>
                            </div>
                            {item.unitPrice && (
                              <div className="item-total">
                                <strong>Total: Rs.{(item.unitPrice * (item.quantity || 1)).toFixed(2)}</strong>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {parseOrderData(editingOrder?.OrderData || '[]').length === 0 && (
                      <div className="no-items">
                        <p>No items found in this order</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="form-actions">
                    <button type="button" className="close-btn" onClick={() => setShowOrderForm(false)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
