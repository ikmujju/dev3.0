import { useState,useEffect,useContext} from "react";
import img from './default1.png';
import { FaBars, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { FilterContext } from "../FilterContext";
import './home.css'

 
function Header ()
{
    const { setSubCategory } = useContext(FilterContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [user, setuser] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlekurta = () => {
    setSubCategory("Kurta");
  };

  const handleSHIRT = () => {
    setSubCategory("SHIRT");
  };
  
  const handleWOMENSHIRT = () => {
    setSubCategory("WOMEN-SHIRT");
  };
  
  const handleSAREE = () => {
    setSubCategory("SAREE");
  };
  
  const handleDRESS = () => {
    setSubCategory("DRESS");
  };

  const handleSPORTSHOES = () => {
    setSubCategory("Sport Shoes");
  };

  const handlecWathches = () => {
    setSubCategory("casual Watch");
  };

  const handleaWathches = () => {
    setSubCategory("Analog Watch");
  };
  
  const handlesWathches = () => {
    setSubCategory("Smart Watch");
  };
  
  const logout = () => {
    axios.get('http://localhost:3001/auth/logout')
        .then(res => {
            if (res.data.status) {
                navigate('/login');
            }
        }).catch(err => {
            console.log(err);
        });
};

        useEffect(() => {
            axios.get("http://localhost:3001/auth/verify")
                .then(res => {
                    if (res.data.status) {
                        setuser(res.data.email);
                    } else {
                        navigate('/');
                    }
                }).catch(err => {
                    console.log(err);
                });
        }, [navigate]);

    return(
        <>
        <header className="header">
        <div className="header-left">
          <img className="profile-image" src={img} alt="Profile" />
        </div>

        {/* Search Bar
        <div className="search-container">
          <input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search-button">🔍</button>
        </div> */}

        {/* Navigation Menu */}
        <nav className="nav-menu">
          <ul>
            <li>Home</li>
            <Link to="/About" className="no-underline">About</Link>
            <Link to="/Contactus" className="no-underline">Contact</Link>
            <Link to="/ordertrack" className="no-underline">Order History</Link> 
            <a id="dlink">
            <FaUser size="30px" id="dlink" />
            <div id="hlink">
            <h6>Welcome
              ,
              {user}</h6>
              <hr/>
            
            <Link id="lin" to='/cart' ><h6>My Cart</h6></Link>
            <hr/>
            <Link id="lin" to='/order' ><h6>My Order</h6></Link>
            <hr/>
            <button id="logout" onClick={logout}>Logout</button>
                </div>
                </a>
           
          </ul>
          
        </nav>
        </header>
        <div className="menu-bar">
        <ul className="menu">
          <li className="dropdown">
            <span>Men</span>
            <ul className="dropdown-content">
              <li onClick={handlekurta}><Link to="/product">Men's Kurta</Link></li>
              <li onClick={handleSHIRT}><Link to="/product">Men's Shirts</Link></li>
              <li ><Link to="#">Men's Jeans</Link></li>
              <li ><Link to="#">Men's Footwear</Link></li>
              <li ><Link to="#">Men's Watches</Link></li>
            </ul>
          </li>

          <li className="dropdown">
            <span>Women</span>
            <ul className="dropdown-content">
              <li onClick={handleDRESS}><Link to="/product">Women's Dresses</Link></li>
              <li onClick={handleWOMENSHIRT}><Link to="/product">Women's Shirts</Link></li>
              <li  onClick={handleSAREE}><Link to="/product">Women's SAREE</Link></li>
              <li><Link to="#">Women's Footwear</Link></li>
              <li><Link to="#">Women's Accessories</Link></li>
            </ul>
          </li>

          <li className="dropdown">
            <span>Electronics</span>
            <ul className="dropdown-content">
              <li><Link to="#">Mobile Phones</Link></li>
              <li><Link to="#">Laptops</Link></li>
              <li><Link to="#">Headphones</Link></li>
              <li><Link to="#">Cameras</Link></li>
             
            </ul>
          </li>

          <li className="dropdown">
            <span>Footwear</span>
            <ul className="dropdown-content">
              <li><Link to="#">Casual Shoes</Link></li>
              <li onClick={handleSPORTSHOES}><Link to="/product">Sports Shoes</Link></li>
              <li><Link to="#">Sandals</Link></li>
              <li><Link to="#">Boots</Link></li>
              <li><Link to="#">Slippers</Link></li>
            </ul>
          </li>

          <li className="dropdown">
            <span>Watches</span>
            <ul className="dropdown-content">
              <li onClick={handlecWathches}><Link to="/product">CASUAL Watches</Link></li>
              <li onClick={handleaWathches}><Link to="/product">analog Watches</Link></li>
              <li onClick={handlesWathches}><Link to="/product">Smartwatches</Link></li>
              
            </ul>
          </li>
        </ul>
      </div>
        </>
    )
}

export default Header