import React, { useEffect, useState } from "react";
import "./orders.css";
import Adminheader from "../src/Admin/Adminheader";
import axios from "axios";

function TotalOrders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    axios.defaults.withCredentials = true;

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get("http://localhost:3001/auth/disporder");
            setOrders(data);
            setFilteredOrders(data); // Initialize filtered orders with all orders
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:3001/auth/updateorder/${orderId}`, { status: newStatus });
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    const handleDelete = async (orderId) => {
        try {
            const response = await axios.delete(`http://localhost:3001/auth/deleteorder/${orderId}`);
            
            if (response.status === 200) {
                setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
                setFilteredOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
    
                alert("Order moved to sales and deleted successfully.");
            } else {
                console.error("Failed to delete order:", response.data);
            }
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    // Search Function
    useEffect(() => {
        if (searchTerm === "") {
            setFilteredOrders(orders);
        } else {
            const filtered = orders.filter(order =>
                order.products.some(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            setFilteredOrders(filtered);
        }
    }, [searchTerm, orders]);

    if (loading) return <p>Loading orders...</p>;

    return (
        <>
            <Adminheader />
            <div className="orders-container">
                <h2>Total Orders</h2>
                
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search by product name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />

                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Products</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.userEmail}</td>
                                    <td>
                                        {order.products.map((product, index) => (
                                            <div key={index}>
                                                <strong>{product.name}</strong> (Qty: {product.quantity})
                                            </div>
                                        ))}
                                    </td>
                                    <td>₹{order.totalPrice}</td>
                                    <td>
                                        <select
                                            value={order.status || "Pending"}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Shipping">Shipping</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                    <td>{order.shippingAddress.address}</td>
                                    <td>{order.shippingAddress.phone}</td>
                                    <td>
                                        <button onClick={() => handleDelete(order._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No matching orders found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TotalOrders;
