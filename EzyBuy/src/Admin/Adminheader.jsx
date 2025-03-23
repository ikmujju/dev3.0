import React from "react";
import './dash.css'
import headim from './default1.png';
import { Link } from "react-router-dom";
function Adminheader(){
    return(
        <>
                <header className="Admin-Header">
                   <img className="headim" src={headim} alter="img not found"></img>

                        <h3  className="ad-h3">
                            Admin Dashboard
                        </h3>
                </header>
                <div className="sidebar">
                    <ul>
                    <Link to="/Totalsales"><li className="listt"> Total Sales </li></Link>
                <Link to="/Totalorders"><li className="listt"> Total Orders </li></Link>
                  <Link to="/Totalusers">  <li className="listt">Total Users </li></Link>
                 
                    </ul>

                    <button className="logoutad">Logout</button>
                </div>
        </>
    );
}

export default Adminheader