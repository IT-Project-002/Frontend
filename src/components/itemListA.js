import "../css/modal.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import React from "react";

export default function Modal({ close }) {
  return (
    <div className="layout-model">
      <div className="modal-container">
        <HighlightOffIcon onClick={() => close()} />
        <div className="text-container">
          <h1>Haven't Sign up?</h1>
          <p>Let's get you started!</p>
          <a href="/user/register" className="button">
            Sign Up
          </a>
          <p>Already have an account?</p>
          <a href="/user/login" className="button">
            Log In
          </a>
        </div>
        <img
          className="modal-flower-basket"
          src="https://it-project-002.s3.ap-southeast-2.amazonaws.com/admin/image/pages/modalPlants.png"
          alt="flowerBasket"
        ></img>
      </div>
    </div>
  );
}