import {useState, useEffect, useRef} from 'react'
import {Navigate, useNavigate} from 'react-router-dom';
import "../css/login.css";
import "../css/form.css";
import d1 from "../image/pages/loginDrawer.png";
import {AiFillEyeInvisible, AiFillEye, AiTwotoneMail} from "react-icons/ai";

function Login(){
  // const nav = useNavigate();
  const userRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShown, setIsSHown] = useState(false);
  const token = sessionStorage.getItem("access_token")
  // setting a focus on Email input when the component loads
  useEffect(() => {
//    userRef.current.focus();
  }, [])

  // show password or not
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = {email, password};
    console.log(userInfo)

    fetch('/users/login', {
        headers : {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(userInfo),
    })
    .then(response => {
        console.log(response)
        return response.json()
    })
    .then(data => {
        if(data.access_token){
            sessionStorage.setItem("access_token",data.access_token)
            console.log("access_token exist")
            window.location.href = window.location.origin+"/user/market"
            return data.access_token
        }else{
            window.location.reload();
        }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  if(token && token!=='' &&token!==undefined){
     return  <Navigate replace to="/user/market" />;
  } else{
      return(
        <div className="layout-login" id='login-page'>
          <div className="login-container">
            <h1>Welcome</h1>
            <form>
              <div className='input-container'>
                <i><AiTwotoneMail/></i>
                <input
                type="email"
                className="input-field"
                ref={userRef}
                placeholder="Email"
                value={email}
                onChange = {(e) => setEmail(e.target.value)}
                required
                />
              </div>
              <div className='input-container'>
                <label className='login-icon'>
                  {!isShown ? <AiFillEye onClick={togglePassword}/> :<AiFillEyeInvisible onClick={togglePassword}/>}
                </label>
                <input
                  type={isShown ? "text" : "password"}
                  className="input-field"
                  placeholder="Password"
                  value={password}
                  onChange = {(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <button onClick={handleSubmit}> Log in </button>
              </div>
              <div>
                <button><a href="/user/register">Haven't Sign up?</a></button>
              </div>
            </form>
          </div>
          <div className="today-container">
            <h2>“Creativity takes courage.”</h2>
            <p>- Henri Matisse</p>
            <img src={d1} alt="d1"></img>
          </div>
        </div>
      )
    }
  }

export default Login;