import React, {useState} from "react";
import { Link, useMatch, useResolvedPath, useLocation } from "react-router-dom";
import "../css/style.css";
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {AiOutlineHome} from "react-icons/ai";


export default function Navbar() {
  const token = sessionStorage.getItem("access_token")
//  console.log("NavBar:" + token)
  let location = useLocation();
  const [isShown, setIsSHown]= useState(false)
  // console.log(isShown)
  // SHow Menu
  const toggleMenu = () => {
    console.log(location.pathname)
    console.log(isShown)
    // if(location.pathname !== "/"){
    //   setIsSHown((isShown) => isShown);
    // }
    setIsSHown((isShown) => !isShown);
  };

   function logMeOut() {
      fetch('http://localhost:9000/user/logout',{
          method: 'POST',
          mode: 'cors',
       })
        .then((response) => {
           sessionStorage.removeItem("access_token")
           window.location.href ='http://localhost:3000/user/login' ;
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })}

  return (
    <nav className="navbar">
          <Link className="home-icon" to="/">
            <AiOutlineHome text={"Hi"} onClick={toggleMenu}/>
          </Link>    
           <ul className="menu">
              {
              (token && token!=='' &&token!==undefined)?
                  <CustomLink to="/user/myFav">
                     <FavoriteBorderIcon/>
                  </CustomLink>:''
              }
              {
              (token && token!=='' &&token!==undefined)?
                  <CustomLink to="/user/market">
                     <StorefrontOutlinedIcon />
                  </CustomLink>:''
              }

              {
              (token && token!=='' &&token!==undefined)?'':
                  <CustomLink to="/user/login">
                     <AccountCircleOutlinedIcon/>
                  </CustomLink>
              }

              {
              (token && token!=='' &&token!==undefined)?
                  <CustomLink to="/user/profile">
                     <AccountCircleOutlinedIcon />
                  </CustomLink>:''
              }

              <CustomLink to="/user/about">
                  <InfoOutlinedIcon />
              </CustomLink>

              {
              (token && token!=='' &&token!==undefined)?
                  <CustomLink to="/user/login">
                     <LogoutOutlinedIcon onClick={logMeOut}/>
                  </CustomLink>:''
              }
           </ul>
           {/* <ul className="side-menu">
              {
              (token && token!=='' &&token!==undefined)?
                  <CustomLink to="/user/myFav">
                    <p>MyFav</p>
                  </CustomLink>:''
              }
              {
              (token && token!=='' &&token!==undefined)?
                  <CustomLink to="/user/market">
                    <p>Market</p>
                  </CustomLink>:''
              }
              {
              (token && token!=='' &&token!==undefined)?
                  <CustomLink to="/user/upload">
                    <p>Upload</p>
                  </CustomLink>:''
              }

              {
              (token && token!=='' &&token!==undefined)?'':
                  <CustomLink to="/user/login">
                    <p>Login</p>
                  </CustomLink>
              }

              {
              (token && token!=='' &&token!==undefined)?
                  <CustomLink to="/user/profile">
                    <p>Profile</p>
                  </CustomLink>:''
              }

              <CustomLink to="/user/about">
                  <p>About</p>
              </CustomLink>

              {
              (token && token!=='' &&token!==undefined)?
                  <CustomLink to="/user/login">
                     <p onClick={logMeOut}>Logout</p>
                  </CustomLink>:''
              }
           </ul> */}
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
