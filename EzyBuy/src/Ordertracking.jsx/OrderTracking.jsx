import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBox, FaShippingFast, FaCheckCircle } from "react-icons/fa";
import "./ordertracking.css"; // Ensure this file has the required CSS

function OrderTracking() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/auth/order/history", { withCredentials: true })
            .then((res) => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load orders. Please try again later.");
                setLoading(false);
            });
    }, []);

    const getStatusStep = (status) => {
        const steps = ["Pending", "Shipping", "Delivered"];
        return steps.indexOf(status);
    };

    const getStatusIcon = (step) => {
        switch (step) {
            case 0: return <FaBox className="icon pending" />;
            case 1: return <FaShippingFast className="icon shipping" />;
            case 2: return <FaCheckCircle className="icon delivered" />;
            default: return null;
        }
    };

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
                                <p><strong>Total Price:</strong> ₹{parseFloat(order.totalPrice).toFixed(2)}</p>
                                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                                <p><strong>Shipping Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.country}</p>
                                <p><strong>Status:</strong> {order.status}</p>
                                
                                {/* DELIVERY TRACKING LINE */}
                                <div className="progress-container">
                                    {["Pending", "Shipping", "Delivered"].map((step, index) => (
                                        <div key={index} className={`step ${index <= getStatusStep(order.status) ? "active" : ""}`}>
                                            {getStatusIcon(index)}
                                            <p>{step}</p>
                                        </div>
                                    ))}
                                </div>

                                <Link to="/product"><button className="btn btn-primary">Shop More</button></Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-danger">No orders found!</p>
                )}
            </div>
        </div>
    );
}

export default OrderTracking;
