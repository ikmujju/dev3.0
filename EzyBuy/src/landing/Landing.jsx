import "./landing.css";
import img1 from "./default1.png";
import img2 from "./images (1).jpg"; // Add more images as needed
import img3 from "./images.jpg";
import img4 from "./download.jpg"

import { Link } from "react-router-dom";
import { useEffect } from "react";
import $ from "jquery";

function Landing() {
    useEffect(() => {
        let index = 0;
        const images = $(".slideshow img");
        
        function showNextImage() {
            images.eq(index).fadeOut(1000);
            index = (index + 1) % images.length;
            images.eq(index).fadeIn(1000);
        }

        images.hide().eq(0).show();
        setInterval(showNextImage, 7000); // Change image every 3 seconds
    }, []);

    return (
        <>
            <header className="Head">
                <Link to="/login"><button className="Btn">Login</button></Link>
            </header>

            <div className="content-2">
                <h1>EzyBuy</h1>
                <p>Shop the World at Your Fingertips.</p>

                {/* Slideshow inside content-2 */}
                <div className="slideshow">
                    <img className="slide-image" src={img4} alt="Slide 1" />
                    <img className="slide-image" src={img2} alt="Slide 2" />
                    <img className="slide-image" src={img3} alt="Slide 3" />
                </div>

                <Link to="/login"><button className="exp">Explore More</button></Link>
            </div>

            <footer className="foot">
                <div className="Customer care">
                    <h2 className="h2">Contact Us</h2>
                    <p>Call Now: +91 999 888 6123</p>
                    <p>FAQ</p>
                    <p>E-mail</p>
                    <p>info@EzyBuy.com</p>
                </div>
                <div className="Company">
                    <h2 className="h2">Company</h2>
                    <p> About </p>
                    <p> Privacy Policy </p>
                    <p> Terms of Service </p>
                </div>
                <div className="Social">
                    <h2 className="h2">Follow Us</h2>
                    <p>Facebook</p>
                    <p>Instagram</p>
                    <p>Twitter</p>
                </div>
                <div className="Service">
                    <h2 className="h2">Services</h2>
                    <p>Fast Delivery</p>
                    <p>Track Orders</p>
                    <p>World Wide Shipping</p>
                </div>
            </footer>
            <footer className="foot-2">
                <div className="copyright">
                    <hr></hr>
                    <p>© 2024 EzyBuy by Manhart group | All Rights Reserved.</p>
                </div>
            </footer>
        </>
    );
}

export default Landing;
