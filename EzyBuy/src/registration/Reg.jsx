import React, { useState } from "react";
import './Reg.css'
import axios from 'axios'
import{ SnackbarProvider, enqueueSnackbar} from 'notistack'; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Reg(){
    const [name,setName]= useState();
  const [email,setEmail]= useState();
  const [password,setPassword]= useState();
  const [cpassword,setCPassword]= useState();
  const navigate= useNavigate()

  const handleSubmit= (e) =>{
    e.preventDefault()

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   
    

    if (!name || !email || !password) {
      toast.error("Please fill out all fields.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    
    if (!emailPattern.test(email)) {
      toast.error("Invalid email format!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

   
    if (password.length < 6 ) {
      toast.error("Length Should be more than 6", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    axios.post('http://localhost:3001/auth/signup',{name,email,password})
    .then(Response=>{
      console.log(Response)

      if(Response.data.status)
      {
        const i=3500;
        toast.success("You've successfully signed up",{
          position: "top-center",
          theme: "dark",
          autoClose: i,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate('/login');
        }, i);
      }

      if(Response.data.message=="user already existed")
      {
        const i=4500;
        toast.error('Oops! It looks like this email is already in use', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
    })
    .catch(err=>console.log(err))
  }
return(
<>
<ToastContainer />
<div className="main-box">
    <form onSubmit={handleSubmit}>
        <div className="box--1">
             <h2 className="h2">Registrartion</h2>
             <label>Name</label>
             <input type="text" onChange={(e) => setName(e.target.value)}/><br />

                <label>Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)}/><br />

                <label>Password</label>
                      <input type="Password" onChange={(e) => setPassword(e.target.value)}/><br /> 
               
                     <button className="btnn">Register</button>
                     <div className="line" >
            <hr />
            <p>Already Have An Account? <Link to="/Login">Login</Link>
            </p>
        </div>
        
        </div>
        </form>
</div>
    
</>
);
}
export default Reg