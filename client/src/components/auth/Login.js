import React from 'react'
import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'


const Login = ({login, isAuthenticated}) => {
const [formData, setFormData] = useState ({
    email: "",
    password: ""
})

const {email, password} = formData

const handleChange = (e) => {
setFormData({...formData,[e.target.name] : e.target.value})
}

const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
}
//Redirect if logged in 
if(isAuthenticated) {
  return <Redirect to="/dashboard" />
}
  return (
    <>
<div>  
  <h1 className="large text-primary">Sign In</h1>
  <p className="lead"><i className="fas fa-user" /> Sign into Your Account</p>
  <form className="form"onSubmit={handleSubmit}>
    <div className="form-group">
      <input type="email" placeholder="Email Address" name="email" required  value={email}
              onChange={(e) => handleChange(e) } />
    </div>
    <div className="form-group">
      <input type="password" placeholder="Password" name="password"  value={password}
              onChange={(e) => handleChange(e) } />
    </div>
    <input type="submit" className="btn btn-primary" defaultValue="Login" />
  </form>
  <p className="my-1">
    Don't have an account? <Link to="/register">Sign Up</Link>
  </p>
</div>

    </>
  )
}

//define connect and propTypes

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}
//when we want to bring in state that is in the reducer state(auth.js), we will use mapStateToProps
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {login}) (Login)