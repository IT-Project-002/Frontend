import React, { useState } from 'react'
import { Link, useMatch, useResolvedPath, useLocation } from 'react-router-dom'
import '../css/style.css'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'

export default function Navbar () {
  const id = sessionStorage.getItem('id')
  const token = sessionStorage.getItem('access_token')
  //  console.log("NavBar:" + token)
  const location = useLocation()
  const [isShown, setIsSHown] = useState(false)
  // console.log(isShown)
  // SHow Menu
  const toggleMenu = () => {
    console.log(location.pathname)
    console.log(isShown)
    // if(location.pathname !== "/"){
    //   setIsSHown((isShown) => isShown);
    // }
    setIsSHown((isShown) => !isShown)
  }

  function logMeOut () {
    fetch('/users/logout', {
      method: 'POST',
      mode: 'cors'
    })
      .then((response) => {
        sessionStorage.removeItem('access_token')
        window.location.href = window.location.origin + '/user/login'
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <img
          className="home-icon"
          alt="homebutton"
          src="https://it-project-002.s3.ap-southeast-2.amazonaws.com/admin/image/home.png"
          onClick={toggleMenu}
        ></img>
      </Link>
      <ul className="menu">
        {token && token !== '' && token !== undefined
          ? (
          <CustomLink to="/user/myFav">
            <FavoriteBorderIcon />
          </CustomLink>
            )
          : (
              ''
            )}
        {token && token !== '' && token !== undefined
          ? (
          // <CustomLink to="/user/market">
          <CustomLink to={`/user/market/${id}`}>
            <StorefrontOutlinedIcon />
          </CustomLink>
            )
          : (
              ''
            )}

        {token && token !== '' && token !== undefined
          ? (
              ''
            )
          : (
          <CustomLink to="/user/login">
            <AccountCircleOutlinedIcon />
          </CustomLink>
            )}

        {token && token !== '' && token !== undefined
          ? (
          <CustomLink to="/user/profile">
            <AccountCircleOutlinedIcon />
          </CustomLink>
            )
          : (
              ''
            )}

        <CustomLink to="/user/about">
          <InfoOutlinedIcon />
        </CustomLink>

        {token && token !== '' && token !== undefined
          ? (
          <CustomLink to="/user/login">
            <LogoutOutlinedIcon onClick={logMeOut} />
          </CustomLink>
            )
          : (
              ''
            )}
      </ul>
    </nav>
  )
}

function CustomLink ({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
