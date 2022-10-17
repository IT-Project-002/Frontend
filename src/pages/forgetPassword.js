import React, { useState, useRef } from 'react'
import '../css/login.css'
import '../css/form.css'
import { AiTwotoneMail } from 'react-icons/ai'
import LockIcon from '@mui/icons-material/Lock'
import Alert from '@mui/material/Alert'

const EMAIL_REG = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
export const validateEmailInput = (str = '') => EMAIL_REG.test(str)

function Forget () {
  const userRef = useRef()
  const [email, setEmail] = useState('')
  const [emailVerify, setEmailVerify] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [isActive1, setIsActive1] = useState(false)
  const [isSubmmit, setIsSubmmit] = useState(false)
  const [code, setCode] = useState({})

  const toggleButton = () => {
    setIsActive((current) => !current)
  }

  const toggleButton1 = () => {
    setIsActive1((current) => !current)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmmit(true)
    const userInfo = { email }
    console.log(userInfo)

    fetch('/users/captcha', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(userInfo)
    })
      .then((response) => {
        if (response.status === 600) {
          // 这边是email不存在
          setError('Email not exist')
          setIsSubmmit(false)
        }
        console.log(response)
        return response.json()
      })
      .then((data) => {
        console.log(data.captcha)
        setCode(data.captcha)
        setEmailVerify(data.email)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const handleVerificationCode = (e) => {
    e.preventDefault()
    const userInfo = { email, code, password, emailVerify }
    console.log(userInfo)

    fetch('/users/emailLogin', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(userInfo)
    })
      .then((response) => {
        if (response.status === 601) {
          // 这边是验证码不通过
          setError('Incorrect code')
          setIsSubmmit(false)
        }
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
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
  return (
    <div className="layout-login" id="login-page">
      <div className="login-container">
        <h1>Email Verification</h1>
        <h3> </h3>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label className="login-icon">
                <AiTwotoneMail />
              </label>
              <input
                type="email"
                ref={userRef}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                style={{
                  backgroundColor: isActive ? '#c5c1a4' : ''
                }}
                onClick={toggleButton}
                disabled={isSubmmit}
              >
                Send
              </button>
            </div>
          </form>
          <form onSubmit={handleVerificationCode}>
            <div className="input-container">
              <label className="login-icon">
                <LockIcon/>
              </label>
              <input
                type='text'
                placeholder="Verification Code"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                style={{
                  backgroundColor: isActive1 ? '#c5c1a4' : ''
                }}
                onClick={toggleButton1}
              >
                Log In
              </button>
            </div>
          </form>
          {error
            ? (
            <Alert
              className="login-alert"
              severity="warning"
              variant="outlined"
            >
              {error}
            </Alert>
              )
            : null}
        </div>
      </div>

      <div className="today-container">
        <h1>“Creativity takes courage.”</h1>
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

export default Forget
