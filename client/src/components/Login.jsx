// import { Colors } from 'chart.js';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../useAuthContext";
import "../css/login.css"
import "../css/fonts.css"
import axios from "axios";
import Loading from './Loading';


export default function Login() {
    const Navigate = useNavigate();
    const { user, dispatch, loading } = useAuthContext();

    useEffect(() => {
        if (!loading && user) {
            Navigate("/alumni")
        } else Navigate('/')
        axios.get(`${process.env.REACT_APP_SERVER_URL}/checkAuth`)
        .then(result => {
            if (result.data.result) {
                localStorage.setItem('user', JSON.stringify(result.data))
                dispatch({type: 'LOGIN', payload: result.data})
                Navigate('/alumni')
            }
            
        })
    },[user, Navigate, dispatch, loading])
    

    function logindata(userspan, passspan){
        var flagcheck = 0
        let user = document.getElementById("userid")
        let pass = document.getElementById("passid")
        if (pass.value.length === 0){
            flagcheck = 1
            if (passspan!=null){
                passspan.innerHTML = "Please Enter password"
                pass.focus()
                }
            }
        if (user.value.length === 0){
            flagcheck = 1
            if (userspan!=null){
                userspan.innerHTML = "Please Enter a username"
                user.focus()
                }
        }
        if (flagcheck === 0){
            if(userspan != null){
                userspan.innerHTML = "" ;
                }
            if(passspan != null){
                passspan.innerHTML = "" ;
                }
          
            axios.post(`${process.env.REACT_APP_SERVER_URL}/authenticate`, {'user': user.value, 'password': pass.value})
            .then((res) => {
                let data = res.data
                if (data.result){
                    localStorage.setItem('user', JSON.stringify(data))
                    dispatch({type: 'LOGIN', payload: data})
                    Navigate('/alumni')
                }
                else{
                    alert('Wrong Username or Password')
                }
            })
            .catch(err => console.log(err));
        }
    }

    function forgotpass(){
        Navigate('/forgotpass')
    }

    function handleKeyPress(event){
        var key = event.key
        if (key === 'Enter'){
            logindata(document.getElementById("userspan"), document.getElementById("passspan"))
        }
    }
    
  return (
    <div>
    {loading ? (
        <Loading />
      ) : (
    <div className="login-container flex flex-wrap" >
        <div className='w-full lg:w-1/2 row-item'>
            <form className="login-form bg-color">
                <div className='heading'>
                    <h1>NU Alumni Dashboard</h1>
                    <h2 className='h2'>Login</h2>
                </div>
                <div className="input-group" >
                    <label htmlFor="username" className='inter'>Username </label>
                    <input className='login-field' name="username" type="text" id ="userid" onKeyUp={(e) => handleKeyPress(e)} placeholder='Enter Username'/>
                </div>
                <span className="span" id = "userspan"></span>
                <div className="input-group">
                    <label className='inter'>Password </label>
                    <input className='login-field login-password-field' onKeyUp={(e) => handleKeyPress(e)} type="password" id = "passid" placeholder='Enter Password'/>
                </div>
                <span className="span" id = "passspan"></span>
                <div className='forgot-password-link inter'>
                <button type="button" onClick={() => forgotpass()}>Contact Administrator</button>
                </div>
                <div className="button-group">
                    <a href = {`${process.env.REACT_APP_SERVER_URL}/auth/google`} className="google-sign-in-button" >Sign in with Google</a>
                    <button id ="loginButton" type="button" onClick={() => logindata(document.getElementById("userspan"), document.getElementById("passspan"))} className='button'>Login</button>
            
                </div>  
            </form>
        </div>
        <div className="w-full lg:w-1/2 no-select row-item" id='hider'>
            <div id="vertical-line" ></div>
            <p className="inter tagline">Comprehensive Platform for Interactive Vizualization
            of Alumni Data to keep track of metrics and get insights for better decision-making</p>
        </div> 
    </div>
      )}
    </div>
  );
}