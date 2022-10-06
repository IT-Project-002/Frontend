import "../css/upload.css";
import Select from "react-select";
import React, { useState, useRef, useEffect } from "react";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import Alert from "@mui/material/Alert";
import PhotoIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";

const NAME_REG = new RegExp(/^[A-Z0-9][[A-z0-9-_ ]{3,20}$/i);
const PRICE_REG = new RegExp(/^[0-9]{1,8}$/i);
export const validName = (str = "") => NAME_REG.test(str);
export const validPrice = (str = "") => PRICE_REG.test(str);

export default function Edit() {
  const access_token = sessionStorage.getItem("access_token");
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [tagValue, setTagValue] = useState([]);
  const [tags, setTags] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const test = [{ value: "textiles", label: "Textiles" }];
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
  console.log(tags);
  console.log(test);
  console.log(options);
  /* Image */
  const [selectedImages, setSelectedImages] = useState([]);
  const [filesDict, setFileDict] = useState({});
  const formRef = useRef();
  const { itemId } = useParams();

  useEffect(() => {
    fetch("/users/item/edit/" + itemId, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + access_token,
      },
      method: "GET",
      mode: "cors",
    })
      .then((res) => {
        // console.log({res});
        if (res.status === 401) {
          sessionStorage.removeItem("access_token");
          window.location.href = window.location.origin + "/user/login";
        } else {
          return res.json();
        }
      })
      .then((dat) => {
        console.log(dat);
        setItemName(dat.prod_name);
        setPrice(dat.prod_price);
        setDescription(dat.prod_desc);
        setItemName(dat.prod_name);
        setTagValue(dat.prod_tags);
        // make tags array of objects
        const list = [];
        console.log(dat.prod_tags.map((value) => value));
        dat.prod_tags?.map((value) => {
          let tags = {
            value: value,
            label: value.charAt(0).toUpperCase() + value.slice(1),
          };
          list.push(tags);
        });
        setTags(list);
        setSelectedImages(dat.prod_images);
        setLoading(false);
      });
  }, [access_token, itemId]);

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
    data.append("tags", JSON.stringify(tagValue));
    data.append("images", JSON.stringify(selectedImages));
    console.log({ hi: formRef.current });
    const filesArray = selectedImages.map((file) => {
      return filesDict[file];
    });
    for (let i = 0; i < filesArray.length; i++) {
      data.append(i, filesArray[i]);
    }
    fetch("/users/item/edit/" + itemId, {
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
        window.location.reload();
        window.location.href = window.location.origin + "/user/market";
      })
      .then((itemInfo) => {
        console.log("Success:", itemInfo);
      });
  };

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
                  3 to 20 characters. Must start with letters.
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
                  Price ranged between 0 to 99,999,999.
                </Alert>
              </div>
            ) : null}
          </div>
          <div className="fillin-input-container">
            <h2>Can you precisely describe your work?</h2>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="fillin-input-container">
            <h2>Tag your work with its category.</h2>
            {tags.length > 0 ? (
              <Select
                isMulti
                placeholder="Category"
                options={options}
                defaultValue={tags}
                onChange={(item) => setTagValue(item)}
                isClearable={true}
                isSearchable={true}
                isDisabled={false}
                isLoading={false}
                isRtl={false}
                closeMenuOnSelect={false}
              />
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
