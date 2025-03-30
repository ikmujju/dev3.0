import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Order() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        fullName: "Dev",
        phone: "6355148356",
        address: "Cool house",
        city: "Navsari",
        postalCode: "395642",
        country: "India",
    });
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const navigate = useNavigate();

    // Load saved address when component mounts
    useEffect(() => {
        const savedAddress = localStorage.getItem("shippingAddress");
        if (savedAddress) {
            try {
                setShippingAddress(JSON.parse(savedAddress));
            } catch (err) {
                console.error("Error parsing saved address:", err);
            }
        }
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3001/auth/cart/view", { withCredentials: true })
            .then((res) => {
                if (res.data && res.data.products && res.data.products.length > 0) {
                    setCart(res.data);
                } else {
                    setCart(null);
                }
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load cart. Please try again later.");
                setLoading(false);
            });
    }, []);

    // Save the updated address when user types
    const handleAddressChange = (e) => {
        const updatedAddress = { ...shippingAddress, [e.target.name]: e.target.value };
        setShippingAddress(updatedAddress);
        localStorage.setItem("shippingAddress", JSON.stringify(updatedAddress));
    };

    // Autofill last saved address
    const handleAutofill = () => {
        const savedAddress = localStorage.getItem("shippingAddress");
        if (savedAddress) {
            setShippingAddress(JSON.parse(savedAddress));
        } else {
            alert("No saved address found!");
        }
    };

    const handlePlaceOrder = async () => {
        if (!Object.values(shippingAddress).every(field => field.trim() !== "")) {
            alert("Please fill in all shipping details.");
            return;
        }
    
        if (paymentMethod === "UPI") {
            navigate(`/upi?amount=${cart.totalPrice}`);
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:3001/auth/order/place", {
                paymentMethod,
                shippingAddress,    
            }, { withCredentials: true });
    
            if (response.status === 201) {
                alert("Order placed successfully!");
                localStorage.removeItem("shippingAddress"); // Clear saved address
                navigate("/ordertrack");
            } else {
                alert("Failed to place order.");
            }
        } catch (error) {
            alert("Something went wrong. Try again.");
        }
    };
    if (loading) return <p className="text-center my-5">Loading cart...</p>;
    if (error) return <p className="text-center text-danger">{error}</p>;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Place Your Order</h2>
            {cart && cart.products.length > 0 ? (
                <div className="row">
                    <div className="col-md-6">
                        <h4>Shipping Details</h4>
                        {Object.keys(shippingAddress).map((key) => (
                            <div className="mb-3" key={key}>
                                <label className="form-label">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name={key} 
                                    value={shippingAddress[key] || ""} 
                                    onChange={handleAddressChange} 
                                />
                            </div>
                        ))}
                        
                        {/* Autofill Button */}
                        {/* <button className="btn btn-primary w-100 mb-2" onClick={handleAutofill}>
                            Autofill Address
                        </button> */}

                        <h4>Payment Method</h4>
                        <select className="form-select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value="COD">Cash on Delivery</option>
                            
                            <option value="UPI">UPI</option>
                           
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
    );
}

export default Order;
