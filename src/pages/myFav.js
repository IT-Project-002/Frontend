import '../css/myFav.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CircularProgress from '@mui/material/CircularProgress'
import React, { useState, useEffect } from 'react'

export default function MyFav () {
  const userID = sessionStorage.getItem('id')
  const accessToken = sessionStorage.getItem('access_token')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/users/favourite', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + accessToken
      },
      method: 'GET',
      mode: 'cors'
    })
      .then((res) => {
        // console.log({res});
        if (res.status === 401) {
          sessionStorage.removeItem('access_token')
          window.location.href = window.location.origin + '/user/login'
        } else {
          return res.json()
        }
      })
      .then((dat) => {
        console.log(dat)
        setItems(dat.out)
        setLoading(false)
      })
  }, [accessToken, userID])

  return (
    <>
      {loading
        ? (
        <CircularProgress className="loading" />
          )
        : (
          <div className="layout-like">
            <div className="myfav-title">
              <h1>My Favourite</h1>
            </div>
            <div className="myfav-items-container">
              <div className="wrapper">
                {items.map((item) => (
                  <div key={item.uuid}>
                    <Card
                      prod_id={item.uuid}
                      img={item.image}
                      title={item.name}
                      description={item.tags}
                      price={item.price}
                      active={true}
                    />
                  </div>
                ))}
              </div>
            </div>
            <img
              className="itemhead"
              src="https://it-project-002.s3.ap-southeast-2.amazonaws.com/admin/image/background/myfav1.png"
              alt="item1"
            ></img>
            <img
              className="itemfoot"
              src="https://it-project-002.s3.ap-southeast-2.amazonaws.com/admin/image/background/myfav2.png"
              alt="item2"
            ></img>
          </div>
          )}
    </>
  )
}

function Card (props) {
  const [isActive, setIsActive] = useState(props.active)
  const accessToken = sessionStorage.getItem('access_token')

  const toggleButton = () => {
    fetch('/users/like', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + accessToken
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ item: props.prod_id })
    }).then((res) => {
      setIsActive((current) => !current)
    })
  }

  return (
    <div className="card">
      <a href={`/user/item/${props.prod_id}`}>
        <img src={props.img} alt="item" className="card-img" />
      </a>
      <div className="card-body">
        <div className="card-title-like">
          <h2 className="card-title">{props.title}</h2>
          <FavoriteBorderIcon
            onClick={toggleButton}
            style={{
              backgroundColor: isActive ? '#f48b8b' : '#bcb4a7'
            }}
          />
        </div>
        <h3 className="card-price">{props.price}</h3>
      </div>
    </div>
  )
}
