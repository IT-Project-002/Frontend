import "../css/upload.css";
import Select from "react-select";
import React, { useState, useRef, useEffect } from "react";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import Alert from "@mui/material/Alert";
import PhotoIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const NAME_REG = new RegExp(/^[A-Z0-9][A-z0-9-_ ]{3,40}$/i);
const PRICE_REG = new RegExp(/^[1-9][0-9]{0,7}(\.[0-9]{0,2})?$/);
const DESC_REG = new RegExp(/^[A-Za-z0-9!@$%^&*(),.?/: ]{10,480}$/);
export const validName = (str = "") => NAME_REG.test(str);
export const validPrice = (str = "") => PRICE_REG.test(str);
export const validDesc = (str = "") => DESC_REG.test(str);
export const validTag = (tag = {}) => tag.length > 0;

export default function Upload() {
  const access_token = sessionStorage.getItem("access_token");
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setdescription] = useState("");
  const [tags, setTags] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const options = [
    { value: "textiles", label: "Textiles" },
    { value: "ceramics", label: "Ceramics" },
    { value: "glass", label: "Glass" },
    { value: "woodwork", label: "Woodwork" },
    { value: "jewelry", label: "Jewelry" },
    { value: "leather", label: "Leather" },
    { value: "painting", label: "Painting" },
    { value: "others", label: "Others" },
  ];

  /* Image */
  const [selectedImages, setSelectedImages] = useState([]);
  const [filesDict, setFileDict] = useState({});
  const formRef = useRef();
  const toggleButton = () => {
    setIsActive((current) => !current);
  };

  const onSelectFile = (e) => {
    // const file = e.target.files[0];
    // files.concat(file);
    // form.append('file', file)
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    // console.log(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    for (var i = 0; i < selectedFiles.length; i++) {
      filesDict[imagesArray[i]] = e.target.files[i];
    }
    console.log(filesDict);
    // save the previous selected images
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    // FOR BUG IN CHROME
    e.target.value = "";
    // setSelectedFile(e.target.files[0]);
  };

  const deleteImage = (image) => {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  };

  const handleSubmit = (e) => {
    console.log(selectedImages);
    // prevent page being refresh
    e.preventDefault();
    const data = new FormData(formRef.current);
    data.append("tags", JSON.stringify(tags));
    console.log(data);
    const filesArray = selectedImages.map((file) => {
      return filesDict[file];
    });
    for (let i = 0; i < filesArray.length; i++) {
      data.append(i, filesArray[i]);
    }
    console.log(filesArray);
    fetch("/users/upload", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + access_token,
      },
      method: "POST",
      mode: "cors",
      body: data,
    })
      .then((res) => {
        console.log(res);
        // window.location.reload();
        window.location.href = window.location.origin + "/user/market";
      })
      .then((itemInfo) => {
        console.log("Success:", itemInfo);
      });
  };

  useEffect(() => {
    fetch("/users/upload", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + access_token,
      },
      method: "GET",
      mode: "cors",
    }).then((res) => {
      console.log(res);
      if (res.status === 401) {
        sessionStorage.removeItem("access_token");
        window.location.href = window.location.origin + "/user/login";
      } else {
        return res.json();
      }
    });
  }, [access_token]);

  return (
    <div className="layout-upload">
      <div className="upload-container">
        <label>
          <CameraAltRoundedIcon className="upload-icon" />
          <input
            className="upload-input"
            type="file"
            name="itemImages"
            multiple
            accept="image/*"
            onChange={onSelectFile}
          />
        </label>
        <Alert severity="warning" className="upload-alert">
          Maximum 3 photos
        </Alert>
      </div>

      <div className="preview-container">
        {selectedImages &&
          selectedImages.map((image) => {
            return (
              <div key={image} className="image-wrapper">
                <HighlightOffIcon
                  className="preview-close"
                  onClick={() => deleteImage(image)}
                />
                <img src={image} alt="file" />
              </div>
            );
          })}
        {selectedImages.length < 3 ? (
          <div className="image-wrapper-2">
            <PhotoIcon />
          </div>
        ) : null}
        {selectedImages.length < 2 ? (
          <div className="image-wrapper-2">
            <PhotoIcon />
          </div>
        ) : null}
        {selectedImages.length === 0 ? (
          <div className="image-wrapper-2">
            <PhotoIcon />
          </div>
        ) : null}
      </div>

      <div className="fillin-container">
        <form
          method="post"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          ref={formRef}
        >
          <div className="fillin-input-container">
            <h2>Name your cute work?</h2>
            <input
              name="itemName"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
            {itemName && !validName(itemName) ? (
              <div className="upload-error">
                <Alert severity="warning">
                  3 to 40 characters. Must start with letters.
                  <br />
                  Letters, numbers, underscores, space, hyphens allowed.
                </Alert>
              </div>
            ) : null}
          </div>
          <div className="fillin-input-container">
            <h2>Price your work?</h2>
            <input
              type="texts"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            {price && !validPrice(price) ? (
              <div className="upload-error">
                <Alert severity="warning">
                  Price ranged between 0 to 99,999,999
                </Alert>
              </div>
            ) : null}
          </div>
          <div className="fillin-input-container">
            <h2>Can you precisely describe your work?</h2>
            <input
              type="textarea"
              name="description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              required
            />
            {description && !validDesc(description) ? (
              <div className="upload-error">
                <Alert severity="warning">
                  10 to 480 characters.
                </Alert>
              </div>
            ) : null}
          </div>
          <div className="fillin-input-container">
            <h2>Tag your work with its category.</h2>
            <Select
              isMulti
              placeholder="Category"
              options={options}
              onChange={(item) => setTags(item)}
              isClearable={true}
              isSearchable={true}
              isDisabled={false}
              isLoading={false}
              isRtl={false}
              closeMenuOnSelect={false}
            />
            <input
              tabIndex={-1}
              autoComplete="off"
              style={{ opacity: 0, height: 0 }}
              value={tags}
              required
            />
            {tags && !validTag(tags) ? (
              <div className="upload-error">
                <Alert severity="warning">
                  Must select at least one category.
                </Alert>
              </div>
            ) : null}
          </div>
          <button
            className="profile-button-container"
            type="submit"
            style={{
              backgroundColor: isActive ? "#c5c1a4" : "",
            }}
            onClick={toggleButton}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
