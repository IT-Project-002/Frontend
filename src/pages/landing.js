import "../css/landing.css";
import "../css/modal.css";
import "../css/myFav.css";
import Modal from "../components/modal";
import Gallery from "../components/carousel";
import Cards from "../components/itemListA";
import React, { useEffect, useState } from "react";

function Landing() {
  const token = sessionStorage.getItem("access_token");
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    setSearch("");
  };

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

  useEffect(() => {
    fetch("/users/landing", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      method: "GET",
      mode: "cors",
    })
      .then((res) => {
        // console.log({res});
        return res.json();
      })
      .then((dat) => {
        setData(dat);
        console.log(dat);
      });
  }, []);

  return (
    <div className="layout-landing">
      {/* Search */}
      <form onSubmit={onSubmit}>
        <div className="search-wrapper">
          <input
            type="text"
            name="text"
            placeholder="  Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
      <div className="slider-container">
        <Gallery autoPlay={false} />
      </div>
      <div className="browse-gird-container">
        <Cards data={data} />
      </div>
      {!token && showModal && <Modal className="pop-up" close={Toggle} />}
    </div>
  );
}

export default Landing;
