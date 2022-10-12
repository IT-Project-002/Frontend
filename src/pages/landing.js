import "../css/landing.css";
import "../css/modal.css";
import "../css/myFav.css";
import Modal from "../components/modal";
import Gallery from "../components/carousel";
import Cards from "../components/itemListA";
import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";

function Landing() {
  const token = sessionStorage.getItem("access_token");
  const [data, setData] = useState([]);
  const [result, setResult] = useState({});
  const [displaySearch, setDisplaySearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    fetch("/users/search", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ search: search }),
    })
      .then((res) => {
        // console.log({res});
        return res.json();
      })
      .then((dat) => {
        setResult(dat);
        setDisplaySearch(true);
        console.log(dat);
      });
  };

  const handleClick = () => {
    setSearch("");
    setDisplaySearch("");
  };

  /* appear after 30 seconds */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, [30000]);
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
          <div className="input-wrapper">
            <input
              type="text"
              name="text"
              placeholder="  Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            {search ? <ClearIcon onClick={handleClick} /> : null}
          </div>
          {/* <div className="search-wrapper">
          <TextField
            type="text"
            name="text"
            placeholder="  Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton
                  sx={{ visibility: search ? "visible" : "hidden" }}
                  onClick={handleClick}
                >
                  <ClearIcon />
                </IconButton>
              ),
            }}
            sx={{
              m: 2,
              "& .Mui-focused .MuiIconButton-root": {
                color: "primary.main",
              },
            }}
          ></TextField> */}
          <button type="submit" className="search-button">
            Search
          </button>
          {/* <button type="button" className="search-button" onClick={handleClick}>
            Clear
          </button> */}
        </div>
      </form>
      <div className="slider-container">
        <Gallery autoPlay={false} />
      </div>
      <div className="browse-gird-container">
        <Cards data={displaySearch ? result : data} />
      </div>
      {!token && showModal && <Modal className="pop-up" close={Toggle} />}
    </div>
  );
}

export default Landing;
