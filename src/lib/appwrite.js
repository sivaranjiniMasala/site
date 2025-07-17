const project_Id = "6870b4cd000695c11293";
const database_Id = "68714f9e002f6b31ecaa";
const Product_collection_Id = "68715008003126962067";
const endpoint = "https://cloud.appwrite.io/v1";

import { Account, ID, Client, Avatars, Databases, Query } from 'appwrite';

const client = new Client();

client
  .setEndpoint(endpoint)
  .setProject(project_Id);

const databases = new Databases(client);
const account = new Account(client);
const avatars = new Avatars(client);

const createOrder = async ({ orderId, cartItems, billingDetails }) => {
  const orderData = {
    orderId: orderId,
    OrderData: JSON.stringify(cartItems), // Convert to string for database storage
    FullName: billingDetails.fullName,
    Phone: billingDetails.phone,
    Email: billingDetails.email,
    Address: billingDetails.address,
    City: billingDetails.city,
    State: billingDetails.state,
    ZipCode: billingDetails.zipCode,
    BillingAddress: billingDetails.additionalInfo,
    createdAt: new Date().toISOString()
  };
  
  try {
    await databases.createDocument(database_Id, Product_collection_Id, orderId, orderData);
    return orderId;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Function to get all orders
const getOrders = async () => {
  try {
    const response = await databases.listDocuments(database_Id, Product_collection_Id);
    return response.documents;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Function to get a specific order
const getOrder = async (orderId) => {
  try {
    const response = await databases.getDocument(database_Id, Product_collection_Id, orderId);
    return response;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};
// get orders to admin dashboard
const getOrdersForAdmin = async () => {
  try {
    const response = await databases.listDocuments(database_Id, Product_collection_Id);
    return response.documents;
  } catch (error) {
    console.error("Error fetching orders for admin:", error);
    throw error;
  }
};

//update order status

const updateOrderStatus = async (orderId, newStatus) => {
  try {
    // Only update the OrderStatus field, don't fetch the entire document first
    const updatedOrder = await databases.updateDocument(
      database_Id, 
      Product_collection_Id, 
      orderId, 
      { OrderStatus: newStatus }
    );
    return updatedOrder;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

// Delete order function
const deleteOrder = async (orderId) => {
  try {
    await databases.deleteDocument(database_Id, Product_collection_Id, orderId);
    return { success: true, orderId };
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

//get order by id for order tracking
const getTrackOrder = async (orderId, phone) => {
  try {
    const res = await databases.listDocuments(database_Id, Product_collection_Id, [
      Query.equal('orderId', orderId),
      Query.equal('Phone', phone)
    ]);
    return res.documents.length > 0 ? res.documents[0] : null;
  } catch (error) {
    console.error("Error tracking order:", error);
    throw error;
  }
};

export { 
  createOrder, 
  getOrdersForAdmin,
  updateOrderStatus,
  deleteOrder,
  getOrders, 
  getOrder, 
  getTrackOrder,
  databases, 
  account, 
  avatars,
  ID
};