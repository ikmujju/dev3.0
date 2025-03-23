import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../home/Header";
import './order.css'

function Order() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/auth/cart/view", { withCredentials: true })
            .then((res) => {
                console.log("Cart Data:", res.data);
                if (res.data && res.data.products && res.data.products.length > 0) {
                    setCart(res.data);
                } else {
                    setCart(null);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching cart:", err);
                setError("Failed to load cart. Please try again later.");
                setLoading(false);
            });
    }, []);

    const handleAddressChange = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
        if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.address ||
            !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
            alert("Please fill in all shipping details.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/auth/order/place", {
                paymentMethod,
                shippingAddress,    
            }, { withCredentials: true });

            if (response.status === 201) {
                alert("Order placed successfully!");
                navigate("/ordertrack");
            } else {
                alert("Failed to place order.");
            }
        } catch (error) {
            console.error("Error placing order:", error.response ? error.response.data : error.message);
            alert("Something went wrong. Try again.");
        }
    };

    if (loading) return <p className="text-center my-5">Loading cart...</p>;
    if (error) return <p className="text-center text-danger">{error}</p>;

    return (
        <div>
        
         <div className="container mt-5">
           
            <h2 className="text-center mb-4">Place Your Order</h2>
            {cart && cart.products.length > 0 ? (
                <div className="row">
                    <div className="col-md-6">
                        <h4>Shipping Details</h4>
                        {Object.keys(shippingAddress).map((key) => (
    <div className="mb-3" key={key}>
        <label className="form-label">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
        <input type="text" className="form-control" name={key} value={shippingAddress[key]} onChange={handleAddressChange} />
    </div>
))}
                        <h4>Payment Method</h4>
                        <select className="form-select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value="COD">Cash on Delivery</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="UPI">UPI</option>
                            <option value="PayPal">PayPal</option>
                        </select>
                        <button className="btn btn-success mt-3 w-100" onClick={handlePlaceOrder}>Place Order</button>
                    </div>
                    <div className="col-md-6">
                        <h4>Order Summary</h4>
                        {cart.products.map((product) => (
                            <div key={product.productId} className="d-flex align-items-center border p-2 mb-2">
                                <img src={product.imageUrl} alt={product.name} width="80" height="80" className="me-3" />
                                <div>
                                    <h6>{product.name}</h6>
                                    <p>₹{product.price} x {product.quantity}</p>
                                </div>
                            </div>
                        ))}
                        <h5 className="mt-3">Total Price: ₹{cart.totalPrice}</h5>
                    </div>
                </div>
            ) : (
                <p className="text-center text-danger">Your cart is empty!</p>
            )}
        </div>
        </div> 
    );
}

export default Order;