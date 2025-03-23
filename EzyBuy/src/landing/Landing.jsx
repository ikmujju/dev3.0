import './landing.css';
import img from './default1.png' ;
import { Link } from 'react-router-dom';

function Landing(){
    return (
        <>
            <header className="Head">
            <img  className="profileimage" src={img} height={400}></img>
                <Link to="/login"><button className='Btn'>Login</button></Link>
            </header>
            
                <div  className='content-2'>
                    <h1>EzyBuy</h1>
                    <p>Shop the World at Your Fingertips.</p>

                <Link to="/login"><button className='exp'>Explore More</button></Link>
                </div>

                <footer className='foot'>
                   
                    <div className='Customer care'>
                        <h2 className='h2'>Contact Us</h2>
                        <p>Call Now: +91 999 888 6123</p>
                        <p>FAQ</p>
                        <p>E-mail</p>
                        <p>info@EzyBuy.com</p>
                    </div>

                        <div className='Company'>
                           <h2 className='h2'>Company</h2>
                           <p> About </p>
                           <p> Privacy Policy </p>
                           <p> Terms of Service </p>
                        </div>

                        <div className='Social'>
                            <h2 className='h2'>Follow Us</h2>
                            <p>Facebook</p>
                            <p>Instagram</p>
                            <p>Twitter</p>
                        </div>
                        <div className='Service'>
                            <h2 className='h2'>Services</h2>
                            <p>Fast Delivery</p>
                            <p>Track Orders</p>
                            <p>World Wide Shipping</p>
                        </div>             
                </footer>
                <footer className='foot-2'>
                <div className='copyright'>
                        <hr></hr>
                            <p>© 2024 EzyBuy by Manhart group | All Rights Reserved. </p>
                        </div> 
                </footer>
                
        </>
    );
}

export default Landing