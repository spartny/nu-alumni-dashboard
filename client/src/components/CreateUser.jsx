import React, { useEffect, useState } from 'react'
import "../css/fonts.css"
import Navbar from './Navbar';
import "../css/createuser.css"
import { useAuthContext } from "../useAuthContext";
import { useNavigate } from 'react-router-dom';
import Loading from "./Loading";
import axios from 'axios';


export default function CreateUser() {
  const { user, loading } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) navigate("/");
  }, [user, navigate, loading])

  const [userdata, setUserdata] = useState({})
  const [inform, setInform] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inform === "Passwords do not match") {
      alert("Passwords do not match")
    } else {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/createUser`, {userdata})
    .then(() => alert("User created successfully!"))
    .catch(err => {
      alert("Unsuccessful! Ran into some error  " + err);
      console.log(err)
    })
    }
  }

  return (
    <div>
    {loading ? (
        <Loading />
      ) : (
    <div>
      <div className='navbar'>
      <Navbar selectedItem={'createUser'}/>
      </div>
      <div className='no-select header'>
        <img src='nulogo_transparent.png' id='logo'></img>
        <h1>Alumni Dashboard</h1>
      </div>
      <div className='alignment scroll-y'>
        <div className='alignment w-full lg:w-1/2 cont' id='box'>
          <h1 className='createuser-heading w-full'>Add a user to access dashboard</h1>
          <form id='align' className='w-full' onSubmit={handleSubmit}>
            <div>
              <div className='form-box'>
                  <label className='text-weight'>Username</label>
              </div>
              <div className='form-box'>
                  <input className='createuser-field' type="text"  name="username" placeholder='Enter Username'
                  onChange={(e) => setUserdata(userdata =>({
                    ...userdata,
                    "username": e.target.value
                  }))} />
              </div>

            <div className='form-box'>
                <label className='text-weight'>Password</label>
            </div>
            <div className='form-box'>
                <input type="password" name="password" className='createuser-field' placeholder='Enter Password'
                onChange={(e) => setUserdata(userdata =>({
                  ...userdata,
                  "password": e.target.value
                }))} />
            </div>

            <div className='form-box'>
                <label className='text-weight'>Confirm Password</label>
                <br></br>
                <span id='inform'>{inform}</span>
            </div>
            <div className='form-box'>
                <input type="password" className='createuser-field' name="password" placeholder='Re-enter Password'
                onChange={(e) => {
                  if (e.target.value !== userdata.password) {
                    setInform("Passwords do not match")
                  }
                  else setInform("")
                }}/>
                
            </div>

            <div className='form-box'>
              <label className='text-weight'>Email</label>
            </div>
            <div className='form-box'>
              <input className='createuser-field' type="email" name="email" placeholder='Enter Email'
              onChange={(e) => setUserdata(userdata =>({
                ...userdata,
                "email": e.target.value
              }))} />
            </div>

            <div className='form-box'>
                <label className='text-weight'>Grant Admin Privilege</label>
            
                <select id="select" defaultValue={"default"}
                  onChange={(e) => setUserdata(userdata =>({
                  ...userdata,
                  "admin": e.target.value
                }))}>
                  <option value="true" >True</option>
                  <option value="false" >False</option>
                  <option value="default" disabled hidden>Select</option>
                </select>
            </div>
            <div className='form-box alignment'>
              <button type="submit" className='text-weight' id='button'>Create User</button>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    )}
  </div>
  );
}