import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import "../css/fonts.css"
import "../css/forgotpass.css"

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

const sendEmail = (e) => {
  e.preventDefault();

  // Check if email and username are provided
  if (!email || !username) {
    setMessage('Please provide both email and username');
    return;
  }

  // EmailJS configuration
  emailjs.send("service_9507q1h","template_vho5cg3",{
    from_name: "NU Alumni Dashboard",
    user_email: email,
    to_name: username
    }, 'XzzCZalSYdeE4ZU_z')
  .then((response) => {
    console.log('Email sent successfully:', response);
    setMessage('Email sent successfully!');
    alert("Email sent successfully!")
  }, (error) => {
    console.error('Email sending failed:', error);
    setMessage('Failed to send email. Please try again later.');
    alert("Failed to send email. Please try again later.")
  });

  // Clear form fields after sending email
  setEmail('');
  setUsername('');
};

return (
  <div className='row-controller no-select'>
    
    <div className='form-container'>
    <h1 className='forgotpass-heading w-full'>NU Alumni Dashboard</h1>
      <h2 id='text-info'>To contact the Administrator of this Website in case of any issues logging in, Please enter your details</h2>
      <form onSubmit={sendEmail} className='fields-form'>
          <label>Email</label>
          <input className="input-field" type="email" value={email} placeholder='Enter Email Address'
          style={{color:"black"}} onChange={(e) => setEmail(e.target.value)} /><br></br>
          <label>Username</label>
          <input className="input-field" type="text" value={username} placeholder='Enter Username'
          style={{color:"black"}} onChange={(e) => setUsername(e.target.value)} /><br></br>
          <button className='send-button'type="submit">Send Email</button>
          {message && <p>{message}</p>}
        </form>
    </div>
  </div>
);
};

export default ForgotPass;
