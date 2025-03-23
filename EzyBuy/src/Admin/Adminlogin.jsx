import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Admin.css';

function Adminlogin() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !password) {
      toast.error("Please fill out all fields.", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/auth/admin', { name, password });

      if (response.data.status) {
        toast.success("You've successfully logged in!", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });

        setTimeout(() => {
          navigate('/Totalorders');
        }, 3000);
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong! Try again later.", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='signup-mainn'>
        <div id="Signup">
          <h3 className='Admin-head'>Admin Login</h3>
          <form onSubmit={handleSubmit} className="form">
            <input
              type='text'
              className="input"
              name="name"
              placeholder='Name'
              onChange={(e) => setName(e.target.value)}
            /><br />
            <input
              type='password'
              className="input"
              name="password"
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            /><br />
            <br />
            <div id="signupbtndiv">
              <button type='submit' id="btnsignup">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Adminlogin;
