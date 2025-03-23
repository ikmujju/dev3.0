import React from "react";
import './about.css'


const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About <span className="highlight">EzyBuy</span></h1>
        <p>
          Welcome to <span className="highlight">EzyBuy</span>, your ultimate destination for seamless online shopping.
          We are committed to providing an effortless shopping experience with top-quality products at unbeatable prices.
        </p>
        
        <h2>Our Mission</h2>
        <p>
          Our mission is to redefine online shopping with convenience, affordability, and trust.
          We strive to bring you the latest trends and essentials with just a click.
        </p>
        
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature-box">
            <h3>Premium Quality</h3>
            <p>Only the best products curated just for you.</p>
          </div>
          <div className="feature-box">
            <h3>Best Prices</h3>
            <p>Unmatched prices to give you the best deals.</p>
          </div>
          <div className="feature-box">
            <h3> Fast & Secure Checkout</h3>
            <p>Seamless payment process for a hassle-free experience.</p>
          </div>
          <div className="feature-box">
            <h3> 24/7 Support</h3>
            <p>We're always here to help you with any queries.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;