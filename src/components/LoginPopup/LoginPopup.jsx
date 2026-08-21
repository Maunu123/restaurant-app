    import React, { useState } from 'react'
    import './LoginPopup.css'
    import { assets } from '../../assets/assets'

    const LoginPopup = ({setShowLogin}) => {
        const[currState,setcurrState]=useState("login")
    return (
        <div className='login-Popup'>
            <form className='login-Popup-container'>
                <div className='login-Popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />

                </div>
                <div className='login-Popup-inputs'>
                    {currState==="login"?<></>:<input type="text" placeholder='your name' required />}
                    
                    <input type="email" placeholder='your email' required />
                    <input type="password" placeholder='password' required />
                </div>
                <button>{currState==="sign up"?"create account":"login"}</button>
                <div className='login-Popup-condition'>
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use and privacy policy.</p>
                </div>
                {currState==="login"
                ?<p>Create a new account?<span onClick={()=>setcurrState("sign up")}>Click here</span></p>
                :<p>Already have an account?<span onClick={()=>setcurrState("login")}>Login here</span></p>
                }
            </form>
        </div>
    )
    }

    export default LoginPopup
