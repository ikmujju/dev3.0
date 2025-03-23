import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./ordertracking.css";

function OrderTracking() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/auth/order/history", { withCredentials: true })
            .then((res) => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching orders:", err);
                setError("Failed to load orders. Please try again later.");
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center my-5">Loading orders...</p>;
    if (error) return <p className="text-center text-danger">{error}</p>;

    return (
        <div className="order-tracking-container">
            
            <div className="container mt-5">
                <h2 className="text-center mb-4">Order Tracking</h2>
                {orders.length > 0 ? (
                    <div className="order-list">
                        {orders.map((order) => (
                            <div key={order._id} className="order-card border p-3 mb-3">
                                <h5>Order ID: {order._id}</h5>
                                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                                <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
                                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                                <p><strong>Shipping Address:</strong>  {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}</p>
                                <p><strong>Status:</strong> <span className={`status-${order.status.toLowerCase()}`}>{order.status}</span></p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-danger">No orders found!</p>
                )}

                <Link to="/product"><button>Shop More</button></Link>
            </div>
        </div>
    );
}

export default OrderTracking;
