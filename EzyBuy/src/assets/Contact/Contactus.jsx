import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill out all fields.", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }

    axios.post('http://localhost:3001/auth/contactus', { name, email, message })
      .then(response => {
        if (response.data.status) {
          const delay = 3500;
          toast.success("Message Sent Successfully", {
            position: "top-center",
            theme: "dark",
            autoClose: delay,
          });

          setTimeout(() => {
            navigate('/contactus');
          }, delay);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <ToastContainer />
      <div className="contact-bg">
        <div className="contact-container">
          <h1>Contact Us</h1>
          <p className="contact-text">
            We’d love to hear from you! Reach out to us for any queries, feedback, or support.
            Our team is ready to assist you.
          </p>

          <div className="contact-details">
            <p><span className="fw-semibold">Email:</span> support@EzyBuy.com</p>
            <p><span className="fw-semibold">Phone:</span> +91 9662168660</p>
            <p><span className="fw-semibold">Address:</span> Navsari, Gujarat</p>
          </div>

          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <textarea placeholder="Your Message" rows="5" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
            <button type="submit" className="btn btn-light">Send Message</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
