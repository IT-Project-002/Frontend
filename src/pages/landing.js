import "../css/landing.css";
import "../css/modal.css";
import "../css/itemListA.css";
import Modal from "../components/modal";
import Gallery from "../components/carousel";
import Cards from "../components/itemListA";
import React, { useEffect, useState } from "react";

function Landing() {
  const token = sessionStorage.getItem("access_token");
  const [showModal, setShowModal] = useState(false);
  /* appear after 5 seconds */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, [5000]);
    return () => clearTimeout(timer);
  }, []);

  const Toggle = () => {
    setShowModal(false);
  };

  return (
    <div className="layout-landing">
      <div className="slider-container">
        <Gallery autoPlay={false} />
      </div>
      <div className="browse-gird-container">
        <div className="browse-container">
          <Cards />
        </div>
      </div>
      {!token && showModal && <Modal className="pop-up" close={Toggle} />}
    </div>
  );
}

export default Landing;
