"use client";
import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  

  const adminCredentials = [
    { email: "admin@sivaranjini.com", password: "admin123" },
    { email: "superadmin@sivaranjini.com", password: "super456" },
    { email: "manager@sivaranjini.com", password: "manager789" }
  ];
  

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('sivaranjini_cart');
      if (savedCart) {
        setCartData(JSON.parse(savedCart));
      }
      
      // Check for admin authentication
      const adminAuth = localStorage.getItem('sivaranjini_admin_auth');
      if (adminAuth === 'true') {
        setIsAdminAuthenticated(true);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      setCartData([]);
      setIsAdminAuthenticated(false);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart data to localStorage whenever cartData changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('sivaranjini_cart', JSON.stringify(cartData));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cartData, isLoaded]);

  // Enhanced setCartData function with localStorage persistence
  const updateCartData = (newCartData) => {
    setCartData(newCartData);
  };

  // Helper function to add item to cart
  const addToCart = (product) => {
    setCartData(prev => [...prev, product]);
  };

  // Helper function to remove all instances of a product
  const removeFromCart = (productId) => {
    setCartData(prev => prev.filter(item => item.id !== productId));
  };

  // Helper function to clear entire cart
  const clearCart = () => {
    setCartData([]);
  };

  // Helper function to get cart item count
  const getCartItemCount = () => {
    return cartData.length;
  };

  // Helper function to get unique products count
  const getUniqueProductsCount = () => {
    const uniqueIds = [...new Set(cartData.map(item => item.id))];
    return uniqueIds.length;
  };

  // Admin authentication functions
  const loginAdmin = (email, password) => {
    const isValid = adminCredentials.some(
      admin => admin.email === email && admin.password === password
    );
    
    if (isValid) {
      setIsAdminAuthenticated(true);
      localStorage.setItem('sivaranjini_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('sivaranjini_admin_auth');
  };

  return (
    <GlobalContext.Provider value={{ 
      cartData, 
      setCartData: updateCartData,
      isCartLoaded: isLoaded,
      addToCart,
      removeFromCart,
      clearCart,
      getCartItemCount,
      getUniqueProductsCount,
      isAdminAuthenticated,
      loginAdmin,
      logoutAdmin,
      adminCredentials
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
