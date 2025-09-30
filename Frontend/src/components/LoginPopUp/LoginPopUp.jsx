import React, { useContext, useState } from 'react'
import "./LoginPopUp.css"
import {cross } from '../../assets/assets';
import axios from 'axios'
const LoginPopUp = ({setShowLogin,url}) => {
    // const {url,setToken} = useContext(StoreContext)
    const [currState, setCurrState] = useState("Sign Up");
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (event) =>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))      
    }

    const onLogin = async (event) => {
      event.preventDefault();//to prevent from reloading page on submiting
      let newUrl = url;
      if(currState==="Login"){
        newUrl += "/api/user/login"
      }else{
        newUrl += "/api/user/register"
      }

      const response = await axios.post(newUrl,data)
      if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token);
        setShowLogin(false)
      }else{
        alert(response.data.message)
      }
    
    }
  return (
    <div className='login-popup' >
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={cross} alt="" />
        </div>
        <div className="login-popup-inputs">
                {currState==="Login"?<></>: <input type="text" placeholder='Your name' name="name" onChange={onChangeHandler} id="" value={data.name} required />}
                <input type="email" onChange={onChangeHandler} name="email" value={data.email} placeholder='Your email' id="" required />
                <input type="password"  onChange={onChangeHandler} name="password" value={data.password} placeholder='Password' required id="" />
        </div>
        <button>{currState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
                <input type="checkbox" required name="" id="" />
                <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
       {currState==="Login"? <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>:<></>}
       {currState==="Sign Up" ?<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>:<></>}
      </form>
    </div>
  )
}

export default LoginPopUp
