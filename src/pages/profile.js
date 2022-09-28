import "../css/profile.css";
import female1 from "../image/avatar/female1.png";
// import BorderColorIcon from "@mui/icons-material/BorderColor";
// import PersonIcon from "@mui/icons-material/Person";
// import ToggleOffIcon from "@mui/icons-material/ToggleOff";
// import InfoIcon from "@mui/icons-material/Info";
import React from "react";

export default function Profile() {
  return (
    <div className="layout-profile">
      <div className="profile-photo-container">
        <img src={female1} alt="female1"></img>
      </div>
      <div className="edit-container">
        <div className="edit-left-container">
          <div className="fillin-input-container">
            <h2>User Email</h2>
            {/* <PersonIcon /> */}
            <input type="text" value="Ann.b@gmail.com"></input>
          </div>
          <div className="fillin-input-container">
            {/* <BorderColorIcon /> */}
            <h2>User Name</h2>
            <input type="text" value="Ann B"></input>
          </div>
          <div className="fillin-input-container">
            <h2>Want to change the password?</h2>
            {/* <BorderColorIcon /> */}
            <input type="password" placeholder="Enter new password"></input>
          </div>
          <div className="fillin-input-container">
            <h2>Confirm new password</h2>
            {/* <BorderColorIcon /> */}
            <input type="password" placeholder="Confirm new password"></input>
          </div>
        </div>

        <div className="edit-right-container">
          <h2>Make Email visible to anyone on the internet?</h2>
          <form>
            <div className="selector-container">
              {/* <ToggleOffIcon /> */}
              <select id="contactSelect">
                <option selected="selected">Public</option>
                <option>Private</option>
              </select>
            </div>
          </form>
          <div className="fillin-input-container">
            {/* <BorderColorIcon /> */}
            <h2>User Bio</h2>
            <input type="text" value="Bio"></input>
          </div>
        </div>
        <div className="buttonBox">
          <button>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
