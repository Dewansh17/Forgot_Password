import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import icon from '../assets/icon.png';
import axios from 'axios';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Enter email and password");
    } else {
      try {
        const url = isSignup ? 'http://localhost:2000/api/auth/signup' : 'http://localhost:2000/api/auth/login';
        const response = await axios.post(url, { email, password });
        console.log(response.data); // handle response as needed
        navigate('/dashboard');
      } catch (error) {
        console.error("Error:", error);
        alert(isSignup ? "Signup failed. Please try again." : "Login failed. Please try again.");
      }
    }
  };

  const handleSwitch = () => {
    setIsSignup(!isSignup);
    setEmail("");
    setPassword("");
  };


  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      alert("Enter your email");
    } else {
      try {
        const response = await fetch('http://localhost:2000/api/auth/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: forgotEmail })
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data); // handle response as needed
          alert("Password reset email sent");
          setForgotEmail(""); // Clear the input field after submission
        } else {
          console.error("Error:", data.message);
          alert("An error occurred. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container-1">
      {!forgotPassword ? (
        <>
          <h3>{isSignup ? "Sign Up" : "Login"}</h3>
          <img src={icon} alt="icon" className='login-logo' />
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              <h4>Email</h4>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label htmlFor="password">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>Password</h4>
                {!isSignup && (
                  <p
                    style={{ color: "#007ac6", fontSize: "13px", cursor: "pointer" }}
                    onClick={() => setForgotPassword(true)}
                  >
                    Forgot Password?
                  </p>
                )}
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type='submit' className='auth-btn'>
              {isSignup ? "Sign Up" : "Log In"}
            </button>
          </form>
          <p>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              type='button'
              className='handle-switch-btn'
              onClick={handleSwitch}
            >
              {isSignup ? "Log In" : "Sign Up"}
            </button>
          </p>
        </>
      ) : (
        <>
          <h3>Forgot Password</h3>
          <img src={icon} alt="icon" className='login-logo' />
          <form onSubmit={handleForgotPassword}>
            <label htmlFor="forgot-email">
              <h4>Email</h4>
              <input
                type="email"
                id="forgot-email"
                name="forgot-email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
            </label>
            <button type='submit' className='auth-btn'>
              Send Reset Link
            </button>
          </form>
          <p>
            Remembered your password?
            <button
              type='button'
              className='handle-switch-btn'
              onClick={() => setForgotPassword(false)}
            >
              Log In
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default Auth;
