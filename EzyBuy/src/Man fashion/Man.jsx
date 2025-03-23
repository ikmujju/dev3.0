import React, { useState }  from "react";
import "./Man.css"
import img from './default1.png'

function Man(){
    const [searchTerm, setSearchTerm] = useState('');
    
      const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
      };
    return(
        <>
        
            <div className="man-container">
                 <header className="header">
                        <div className="header-left">
                          <img className="profile-image" src={img} alt="Profile" />
                        </div>
                
                        {/* Search Bar */}
                        <div className="search-container">
                          <input
                            type="search"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                          />
                          <button className="search-button">🔍</button>
                        </div>
                
                        {/* Navigation Menu */}
                        <nav className="nav-menu">
                          <ul>
                            <li>Home</li>
                            <li className="dropdown-container">
                            <span className="dropdown">Category</span>
                            <div className="dropdown-menu">
                             <a href="#">Shoes</a>
                             <a href="#">Accessories</a>
                               <a href="#">Men's Clothes</a>
                             <a href="#">Electronics</a>
                  </div>
                </li>
                            <li>About</li>
                            <li>Contact</li>
                          </ul>
                        </nav>
                      </header>
                      <section className="trending-products">
        <h1>Trending Products</h1>
        <hr />
        <div className="product-grid">
          <div className="product-card">
            <img src={img1} alt="Men's Fashion" />
            <h2>Men's Fashion</h2>
            <p>Explore the latest trends in men's clothing.</p>
            <Link to='/Man'><button>Explore Now</button></Link> 
          </div>
          <div className="product-card">
            <img src={img2} alt="Women's Fashion" />
            <h2>Women's Fashion</h2>
            <p>Discover stylish outfits for women.</p>
            <button>Explore Now</button>
          </div>
          <div className="product-card">
            <img src={img3} alt="Air Jordan" />
            <h2>Air Jordan</h2>
            <p>Step up your sneaker game with Air Jordans.</p>
            <button>Explore Now</button>
          </div>
          <div className="product-card">
            <img src={img4} alt="Smartwatch" />
            <h2>Smartwatch</h2>
            <p>Stay connected with the latest smartwatches.</p>
            <button>Explore Now</button>
          </div>
          <div className="product-card">
            <img src={img5} alt="Gaming Console" />
            <h2>Gaming Console</h2>
            <p>Experience next-gen gaming with the latest consoles.</p>
            <button>Explore Now</button>
          </div>
          <div className="product-card">
            <img src={img6} alt="Headphones" />
            <h2>Headphones</h2>
            <p>Immerse yourself in high-quality sound.</p>
            <button>Explore Now</button>
          </div>
        </div>
      </section>
            </div>
        </>
    );
}
export default Man;