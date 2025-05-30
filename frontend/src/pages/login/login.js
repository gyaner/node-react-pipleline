import React, { useState, useEffect } from 'react';
import './login.css';
import { useNavigate } from "react-router-dom";
import { logout, login } from '../../services/authService';
const Login = () => {
    const [logindata, setLoginData] = useState({});
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...logindata, [name]: value })
    }
   
    const handleSubmit = async () => {
        try {
            const data = await login(logindata);
            console.log(data);
            
            if (data?.status=="200") {
                navigate("/product-list");
            }
        } catch (error) {
            console.log("error", error);
        }
    }


    return (
        <>
            
            <div className="login-all">
                <div className="image-box">
                    <img src={require('../../images/screenshot.png')} className="img-login" alt="login" />
                </div>
                <div className="login-box">
                    <div className='heding-text'>
                        <span> <span className='well'>Welcome</span> <br /> <span className='acc'>Sign in your account</span></span>
                    </div>
                    <div className='input-container'>
                        <label>User Name</label>
                        <input type="text" className='testInput' placeholder='Enter User Name' name="username" onChange={handleChange} value={logindata?.username || ''} />
                    </div>
                    <div className='input-container'>
                        <label>Password</label>
                        <input type="password" className='testInput' placeholder='Enter User Password' name="password" onChange={handleChange} value={logindata?.password || ''} />
                        <img src={require('../../images/visible.png'
                        )} className='eye' />
                        <div className='pwd'>Forgot Password?</div>
                    </div>
                    <div className='input-container'>
                        <button className="register-text" onClick={handleSubmit} >Login </button>

                    </div>
                </div>
            </div>
        </>
    )

}
export default Login;