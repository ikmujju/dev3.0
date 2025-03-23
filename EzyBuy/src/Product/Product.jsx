import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../home/Header";
import { FilterContext } from "../FilterContext";

function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUser] = useState('');
    const [quantities, setQuantities] = useState({});
    
    const [filters, setFilters] = useState({
        searchTerm: "",
        priceMin: "",
        priceMax: "",
        sortPrice: "",
        category: "",
        inStock: false
    });

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const { subCategory } = useContext(FilterContext);
    // const { subCategory = "Kurta" } = useContext(FilterContext);

    // ✅ Fetch user authentication status
    useEffect(() => {
        axios.get("http://localhost:3001/auth/verify")
            .then(res => {
                if (res.data.status) setUser(res.data.email);
            })
            .catch(err => console.log(err));
    }, [navigate]);

    // ✅ Fetch products
    useEffect(() => {
        fetch("http://localhost:3001/auth/displaypro")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
                setQuantities(data.reduce((acc, product) => ({ ...acc, [product._id]: 1 }), {}));
            })
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    // ✅ Handle quantity change
    const handleQuantityChange = (productId, value) => {
        if (value < 1) return;
        setQuantities(prev => ({ ...prev, [productId]: value }));
    };

    // ✅ Add to Cart Functionality
    const addToCart = async (productId, stock) => {
        if (!userEmail) return alert("Please log in first!");

        if (quantities[productId] > stock) {
            return alert(`Only ${stock} units available!`);
        }

        try {
            const response = await axios.post("http://localhost:3001/auth/cart/add-to-cart", {
                productId,
                quantity: quantities[productId]
            }, { withCredentials: true });

            alert(response.data.message || "Added to cart!");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to add product to cart");
        }
    };

    if (loading) return <p className="text-center my-5">Loading products...</p>;

    // ✅ Filter & Sort Products
    const filteredProducts = products
        .filter(product => product.subCategory === subCategory)
        .filter(product => product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()))
        .filter(product => (filters.priceMin ? product.price >= filters.priceMin : true))
        .filter(product => (filters.priceMax ? product.price <= filters.priceMax : true))
        .filter(product => (filters.category ? product.category === filters.category : true))
        .filter(product => (filters.inStock ? product.stock > 0 : true))
        .sort((a, b) => {
            if (filters.sortPrice === "lowToHigh") return a.price - b.price;
            if (filters.sortPrice === "highToLow") return b.price - a.price;
            return 0;
        });

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h2 className="text-center mb-4">Products List</h2>

                {/* ✅ Filters */}
                <div className="row mb-4">
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search products..."
                            value={filters.searchTerm}
                            onChange={e => setFilters({ ...filters, searchTerm: e.target.value })}
                        />
                    </div>

                    <div className="col-md-3 d-flex">
                        <input
                            type="number"
                            className="form-control me-2"
                            placeholder="Min Price"
                            value={filters.priceMin}
                            onChange={e => setFilters({ ...filters, priceMin: e.target.value })}
                        />
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Max Price"
                            value={filters.priceMax}
                            onChange={e => setFilters({ ...filters, priceMax: e.target.value })}
                        />
                    </div>

                    <div className="col-md-2">
                        <select
                            className="form-control"
                            onChange={e => setFilters({ ...filters, sortPrice: e.target.value })}
                        >
                            <option value="">Sort by Price</option>
                            <option value="lowToHigh">Low to High</option>
                            <option value="highToLow">High to Low</option>
                        </select>
                    </div>

                   

                    
                </div>

                {/* ✅ Product List */}
                <div className="row">
                    {filteredProducts.map(product => (
                        <div className="col-md-4 mb-4" key={product._id}>
                            <div className="card h-100 shadow-sm">
                                <img className="card-img" src={product.imageUrl} alt={product.name} style={{ height: "250px", objectFit: "contain" }} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text text-muted">Price: ₹{product.price}</p>
                                    <p className="card-text">{product.description}</p>

                                    <div className="d-flex align-items-center mb-3">
                                        <label className="me-2">Qty:</label>
                                        <input
                                            type="number"
                                            className="form-control w-50"
                                            value={quantities[product._id]}
                                            onChange={e => handleQuantityChange(product._id, parseInt(e.target.value))}
                                            min="1"
                                            max={product.stock}
                                        />
                                    </div>

                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={() => addToCart(product._id, product.stock)}
                                        disabled={product.stock === 0}
                                    >
                                        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Product;
