import React, { useContext, useState } from 'react';
import "./LoginPopUp.css";
import { cross } from '../../assets/assets';
import { StoreContext } from '../../context/storeContext';
const LoginPopUp = ({ setShowLogin }) => {
  
  const { api, setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Basic client-side validation
    if (!data.email || !data.password) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }
    
    if (currState === "Sign Up" && !data.name) {
      setError('Please enter your name');
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";
      console.log('Sending request to:', endpoint);
      
      const response = await api.post(endpoint, data);
      console.log('Response received:', response.data);
      
      if (response.data && response.data.token) {
        // Store the token
        setToken(response.data.token);
        
        // Reset form
        setData({
          name: "",
          email: "",
          password: ""
        });
        
        // Close the popup
        setShowLogin(false);
        
        // Refresh the page to update the auth state
        window.location.reload();
      } else {
        setError(response.data?.message || 'Authentication failed. Please try again.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         'An error occurred. Please try again.';
      setError(errorMessage);
      console.error('Login error:', error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div  className='login-popup' >
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={cross} alt="" />
        </div>
        <div className="login-popup-inputs">
          {error && <div className="error-message">{error}</div>}
          {currState === "Login" ? <></> : <input type="text" placeholder='Your name' name="name" onChange={onChangeHandler} id="" value={data.name} required />}
          <input type="email" onChange={onChangeHandler} name="email" value={data.email} placeholder='Your email' id="" required />
          <input type="password" onChange={onChangeHandler} name="password" value={data.password} placeholder='Password' required id="" />
        </div>
        <button disabled={isLoading}>
          {isLoading ? 'Processing...' : (currState === "Sign Up" ? "Create account" : "Login")}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login" ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p> : <></>}
        {currState === "Sign Up" ? <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p> : <></>}
      </form>
    </div>
  )
}

export default LoginPopUp
