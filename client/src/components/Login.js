import React, { useState } from "react";
import { useHistory } from 'react-router-dom'

import axiosWithAuth from '../utils/axiosWithAuth'

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const { push } = useHistory()

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChanges = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value})
    console.log('Credentials:', credentials)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('new', credentials)
    axiosWithAuth()
      .post('http://localhost:5000/api/login', credentials)
      .then(res => {
        console.log(res)
        console.log('Submitted Credentials', credentials)
        localStorage.setItem('token', res.data.payload);
        push('/bubblepage');
      })
      .catch(err => console.log({ err }));
  };


  return (
    <div className='homeBox'>

      <h1 className='homeTitle'>Welcome to the Bubble App!</h1>

      <div className='homeFormBox'>

        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleChanges} name='username' placeholder='name' className='homeFormUsername' /><br/>
            <input type="password" onChange={handleChanges} name='password' placeholder='password' className='homeFormPassword' /><br/>
            <input type="submit" className='homeFormSubmit' />
        </form>

      </div>

    </div>
  );
};

export default Login;