import React, { useState,useContext} from 'react';
import './home.css';
import { FilterContext } from "../FilterContext";
import img1 from './mensfashion.png';
import img2 from './women3.png';
import img3 from './airjordan.png';
import img4 from './smartwatch.png'
import img5 from './gamingconsole.png';
import img6 from './headphone.png';
import { Link } from "react-router-dom";
import Header from './Header';

function Home() {
  

  const { setSubCategory } = useContext(FilterContext);

  const handleSHIRT = () => {
    setSubCategory("SHIRT");
  };

  const handleKurta = () => {
    setSubCategory("Kurta");
  };

  const handleGirlshirt = () => {
    setSubCategory("WOMEN-SHIRT");
  };
  
  return (
    <div className="home-container">
 
      <Header/>

      
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to EzyBuy</h1>
          <p>Your one-stop shop for the latest trends and styles.</p>
          <button className="cta-button"  >Shop Now</button>
        </div>
      </section>

     
      <section className="trending-products">
        <h1>Trending Products</h1>
        <hr />
        <div className="product-grid">
          <div className="product-card">
            <img src={img1} alt="Men's Fashion" />
            <h2>Men's Fashion</h2>
            <p>Explore the latest trends in men's clothing.</p>
            <Link to='/product'><button  onClick={handleSHIRT}>Explore Now</button></Link> 
          </div>
          <div className="product-card">
            <img src={img2} alt="Women's Fashion" />
            <h2>Women's Fashion</h2>
            <p>Discover stylish outfits for women.</p>
            <Link to='/product'><button onClick={handleKurta}>Explore Now</button></Link> 
          </div>
          <div className="product-card">
            <img src={img3} alt="Air Jordan" />
            <h2>Air Jordan</h2>
            <p>Step up your sneaker game with Air Jordans.</p>
         <Link to="/product"> <button onClick={handleGirlshirt}>Explore Now</button></Link>
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

     
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h2>Customer Care</h2>
            <p>Call Now: +91 999 888 6123</p>
            <p>FAQ</p>
            <p>E-mail: info@EzyBuy.com</p>
          </div>
          <div className="footer-section">
            <h2>Company</h2>
            <p>About</p>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
          <div className="footer-section">
            <h2>Follow Us</h2>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
          </div>
          <div className="footer-section">
            <h2>Services</h2>
            <p>Fast Delivery</p>
            <p>Track Orders</p>
            <p>Worldwide Shipping</p>
          </div>
        </div>
        <div className="footer-bottom">
          <hr />
          <p>© 2024 EzyBuy by Manhart Group | All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
