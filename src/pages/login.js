import React, { useState, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import '../css/login.css'
import '../css/form.css'
import { AiFillEyeInvisible, AiFillEye, AiTwotoneMail } from 'react-icons/ai'
import Alert from '@mui/material/Alert'

const EMAIL_REG = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
export const validateEmailInput = (str = '') => EMAIL_REG.test(str)

function Login () {
  const userRef = useRef()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isShown, setIsSHown] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [isSubmmit, setIsSubmmit] = useState(false)
  const token = sessionStorage.getItem('access_token')

  const toggleButton = () => {
    setIsActive((current) => !current)
  }

  // show password or not
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmmit(true)
    const userInfo = { email, password }
    console.log(userInfo)

    fetch('/users/login', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(userInfo)
    })
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((data) => {
        if (data.access_token) {
          sessionStorage.setItem('access_token', data.access_token)
          console.log('access_token exist')
          sessionStorage.setItem('id', data.uuid)
          window.location.href =
            window.location.origin + '/user/market/' + data.uuid
          return data.access_token
        } else {
          setLoginError('Check out your Account/Password again')
          setIsSubmmit(false)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  if (token && token !== '' && token !== undefined) {
    return <Navigate replace to="/user/market" />
  } else {
    return (
      <div className="layout-login" id="login-page">
        <div className="login-container">
          <h1>Welcome</h1>
          <h3 style={{ marginTop: '-5px' }}>Login to unlock more features!</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <AiTwotoneMail />
              <input
                type="email"
                ref={userRef}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {email && !validateEmailInput(email)
              ? (
              <Alert
                className="login-alert"
                severity="warning"
                variant="outlined"
              >
                Email not valid
              </Alert>
                )
              : null}
            <div className="input-container">
              <label className="login-icon">
                {!isShown
                  ? (
                  <AiFillEye onClick={togglePassword} />
                    )
                  : (
                  <AiFillEyeInvisible onClick={togglePassword} />
                    )}
              </label>
              <input
                type={isShown ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {loginError
              ? (
              <Alert
                className="login-alert"
                severity="warning"
                variant="outlined"
              >
                {loginError}
              </Alert>
                )
              : null}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '85%'
              }}
            >
              <a className="password-link" href="/user/forgetPwd">
                Forgot Password?
              </a>
            </div>
            <div>
              <button
                type="submit"
                style={{
                  backgroundColor: isActive ? '#c5c1a4' : ''
                }}
                onClick={toggleButton}
                disabled={isSubmmit}
              >
                Log In
              </button>
            </div>
            <div>
              <a className="signup-link" href="/user/register">
                Sign Up
              </a>
            </div>
          </form>
        </div>

        <div className="today-container">
          <h1>???Creativity takes courage.???</h1>
          <h4>- Henri Matisse</h4>
          <img
            src="https://it-project-002.s3.ap-southeast-2.amazonaws.com/admin/image/pages/loginDrawer.png"
            alt="d1"
          ></img>
        </div>
        <img
          className="login-background"
          src="https://it-project-002.s3.ap-southeast-2.amazonaws.com/admin/image/background/login.png"
          alt=""
        ></img>
      </div>
    )
  }
}

export default Login
