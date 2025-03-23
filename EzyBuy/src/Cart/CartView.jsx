import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../home/Header";
import { Link } from "react-router-dom";
import "./cart.css";

const CartView = () => {
    const [cart, setCart] = useState({ products: [], totalPrice: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/auth/cart/view", { withCredentials: true })
            .then((res) => {
                if (res.data) {
                    setCart(res.data);
                } else {
                    setCart({ products: [], totalPrice: 0 });
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching cart:", err);
                setError("Failed to load cart");
                setLoading(false);
            });
    }, []);

    const handleRemove = (productId) => {
        axios.post("http://localhost:3001/auth/cart/remove", { productId }, { withCredentials: true })
            .then(() => {
                setCart(prevCart => {
                    const updatedProducts = prevCart.products.filter(p => p.productId !== productId);
                    const updatedTotal = updatedProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
                    return { ...prevCart, products: updatedProducts, totalPrice: updatedTotal };
                });
            })
            .catch(err => console.error("Error removing product:", err));
    };

    if (loading) return <p>Loading cart...</p>;
    if (error) return <p>{error}</p>;
    if (!cart.products.length) return <p className="pero">Your cart is empty.</p>;

    return (
        <div className="mycart">
            <h2>Your Cart</h2>
            <ul>
                {cart.products.map((item) => (
                    <li key={item.productId} className="lii">
                        <img src={item.imageUrl} alt={item.name} />
                        <p>{item.name}</p>
                        <p>Price: ₹{item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <button className="btn-cart" onClick={() => handleRemove(item.productId)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h3>Total Price: ₹{cart.totalPrice.toFixed(2)}</h3>
            <Link to="/order"><button className="btn-cart">Place Order</button></Link>
        </div>
    );
};

export default CartView;