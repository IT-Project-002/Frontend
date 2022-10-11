import { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import "../css/login.css";
import "../css/form.css";
import d1 from "../image/pages/loginDrawer.png";
import { AiFillEyeInvisible, AiFillEye, AiTwotoneMail } from "react-icons/ai";
import React from "react";
import background from "../image/background/login.png";
import Alert from "@mui/material/Alert";
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const EMAIL_REG = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
export const validateEmailInput = (str = "") => EMAIL_REG.test(str);

function Forget() {
  const userRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShown, setIsSHown] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [code, setCode] = useState({});

  const toggleButton = () => {
    setIsActive((current) => !current);
  };

  const toggleButton1 = () => {
    setIsActive1((current) => !current);
  };
  // show password or not
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = { email };
    console.log(userInfo);

    fetch("/users/captcha", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(userInfo),
    })
      .then((response) => {
        if (response.status===600){
            //这边是email不存在
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data.captcha)
        setCode(data.captcha)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleVerificationCode =(e)=>{
    e.preventDefault();
    const userInfo = { email, code, password };
    console.log(userInfo);

    fetch("/users/emailLogin", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(userInfo),
    })
      .then((response) => {
       if (response.status===601){
            //这边是验证码不通过
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.access_token) {
          sessionStorage.setItem("access_token", data.access_token);
          console.log("access_token exist");
          sessionStorage.setItem("id", data.uuid);
          window.location.href =
          window.location.origin + "/user/market/" + data.uuid;
          return data.access_token;
         }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
    return (
      <div className="layout-login" id="login-page">
        <div className="login-container">
          <h1>Email Verification</h1>
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
            {email && !validateEmailInput(email) ? (
              <Alert
                className="login-alert"
                severity="warning"
                variant="outlined"
              >
                Email not valid
              </Alert>
            ) : null}
            <div>
              <button
                type="submit"
                style={{
                  backgroundColor: isActive ? "#c5c1a4" : "",
                }}
                onClick={toggleButton}
              >
                Send Code
              </button>
            </div>
          </form>
          <form onSubmit={handleVerificationCode}>
            <div className="input-container">
              <label className="login-icon">
                {!isShown ? (
                  <AiFillEye onClick={togglePassword} />
                ) : (
                  <AiFillEyeInvisible onClick={togglePassword} />
                )}
              </label>
              <input
                type={isShown ? "text" : "password"}
                placeholder="Verification Code"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                style={{
                  backgroundColor: isActive1 ? "#c5c1a4" : "",
                }}
                onClick={toggleButton1}
              >
                LogIn
              </button>
            </div>
          </form>

        </div>

        <div className="today-container">
          <h1>“Creativity takes courage.”</h1>
          <h4>- Henri Matisse</h4>
          <img src={d1} alt="d1"></img>
        </div>
        <img className="login-background" src={background} alt=""></img>
      </div>
    );
}


export default Forget;
