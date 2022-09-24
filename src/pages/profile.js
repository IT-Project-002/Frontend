import * as React from 'react';
import "../css/profile.css";
import female1 from "../image/avatar/female1.png";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PersonIcon from '@mui/icons-material/Person';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import React from "react";


export default function Profile() {
  return (
    <div className='layout-profile'>
      <div className='profile-photo-container'>
          <img src={female1} alt="female1"></img>
      </div>
      <div className='edit-container'>
        <div className='edit-left-container'>

          <div className='input-container'>
            <PersonIcon/>
            <input type="text" value ="Ann.b@gmail.com"></input>
          </div>
          <div className='input-container'>
            <BorderColorIcon/>
            <input type="text" value ="Ann B"></input>
          </div>
          <div className='input-container'>
            <BorderColorIcon/>
            <input type="text" value ="Old Password"></input>
          </div>
          <div className='input-container'>
            <BorderColorIcon/>
            <input type="text" value ="New Password"></input>
          </div>
        </div>
        
        <div className='edit-right-container'>
          <form>
            <div className='selector-container'>
            <ToggleOffIcon/>
              <select id="contactSelect">
              <option selected="selected">Public</option>
              <option>Private</option>
              </select>
            </div>
          </form>
          <div className='input-container'>
            <BorderColorIcon/>
            <input type="text" value ="Bio"></input>
          </div>
        </div>
        <div className="buttonBox">
          <button>Save Changes</button>
        </div> 
      </div>
    </div>
    );
}