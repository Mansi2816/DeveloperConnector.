import React from 'react'
import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom'
//to bring the action that we created to this file, we will use connect
import {connect} from 'react-redux'
// import axios from 'axios'
import PropTypes from 'prop-types'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'

const Register = ({setAlert, register, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const { name, email, password, password2 } = formData
 const [registerAttempt, setRegisterAttempt] = useState(false)

 const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})
 
 const handleSubmit = async (e) => {
  e.preventDefault();
  if (password !== password2) {
    setAlert('Passwords do not match', 'danger');
  } else {
    // If registration attempt has already been made, prevent duplicate alerts
    if (!registerAttempt) {
      setRegisterAttempt(true);
      register({ name, email, password })
        .then(() => {
          // Registration success
          // setAlert('Registration successful', 'success');
             // Reset registrationAttempted state
             setRegisterAttempt(false);
        })
        .catch((error) => {
          // Registration failed
          if (error.response && error.response.status === 400) {
            // Backend returned a 400 error, indicating user already exists
            setAlert('User already exists', 'danger');
            // Reset registrationAttempted state
            setRegisterAttempt(false);
          } else {
            // Other registration errors
            console.error('Registration error:', error);
            setAlert('Registration failed', 'danger');
            setRegisterAttempt(false);
          }
        });
    }
  }
};

    
//how to make use of axios and post data and get token
    //    const newUser = {
    //     name,
    //     email,
    //     password
    //    }

    // try {
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }
    //     const body = JSON.stringify(newUser)
    //     const res = await axios.post('/api/users',body,config)
    //     console.log(res.data);
    // } catch (err) {
    //     console.error(err.response.data)
    // }
    
  if(isAuthenticated){
    return <Redirect to="/login"/>
  }

  return (
    <>
      <div>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Create Your Account
        </p>
        <form className='form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={(e) => handleChange(e) }
              
            />
          </div>
          <div className='form-group'>
            <input type='email' placeholder='Email Address' name='email'  value={email}
              onChange={(e) => handleChange(e) }/>
            <small className='form-text'>
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => handleChange(e) }
              name='password'
              minLength={6}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirm Password'
              value={password2}
              onChange={(e) => handleChange(e) }
              name='password2'
              minLength={6}
            />
          </div>
          <input
            type='submit'
            className='btn btn-primary'
            defaultValue='Register'
          />
        </form>
        <p className='my-1'>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </>
    )}

//import prop types 
Register.propTypes ={
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

//connect takes 2 things: any state that you want to map
export default connect(mapStateToProps, { setAlert, register}) (Register)
