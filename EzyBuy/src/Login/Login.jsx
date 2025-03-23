import {useState} from "react";
import './Login.css'
import { SnackbarProvider, enqueueSnackbar} from 'notistack'; 
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link } from "react-router-dom";

function Login(){
    const [email,setEmail]= useState();
  const [password,setPassword]= useState();
  const navigate= useNavigate()

  axios.defaults.withCredentials=true;
  
  const handleSubmit= (e) =>{
    e.preventDefault()

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   
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


    if (!email || !password ) {
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

    axios.post('http://localhost:3001/auth/login',{email,password})
    .then(Response=>{
      console.log(Response)
      if(Response.data.status)
      {
        const i=3500;
        toast.success("You've successfully Login",{
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
          navigate('/home');
        }, i);
      }

      if (Response.data.message=="user is not registered") {
        toast.error("user is not registered", {
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

      if (Response.data.message=="password is incorrect") {
        toast.error("password is incorrect", {
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
             <h2 className="h2">Login</h2>
                <label>Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)}/><br />
                <label>Password</label>
                      <input type="Password" onChange={(e) => setPassword(e.target.value)}/><br /> 
                      <a href="#">Forgot Password?</a><br />
                     <button className="btnn">Login</button>
                     <div className="line" >
            <hr />
            <p>Don't Have An Account.?
                <Link to='/register'> Create An Account</Link>
            </p>
        </div>
        
        </div>
    </form>   
</div>
    
</>
    );
}

export default Login