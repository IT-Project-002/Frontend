import "../css/upload.css";
import Select from "react-select";
import React, {useState} from "react";
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';

export default function Upload() {
    const options = [
        { value: "textiles", label: "Textiles" }, 
        { value: "ceramics", label: "Ceramics" },
        { value: "glass", label: "Glass" },
        { value: "woodwork", label: "Woodwork" },
        { value: "jewelry", label: "Jewelry" },
        { value: "leather", label: "Leather" },
        { value: "painting", label: "Painting" },
        { value: "others", label: "Others" },
    ]

    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState("");
    const [describtion, setDescribtion] = useState("");
    const [tags, setTags] = useState([]);

    /* Image */
    const [selectedImages, setSelectedImages] = useState([]);

    const onSelectFile = (event) => {
      const selectedFiles = event.target.files;
      const selectedFilesArray = Array.from(selectedFiles);
  
      const imagesArray = selectedFilesArray.map((file) => {
        return URL.createObjectURL(file);
      });
      // save the previous selected images
      setSelectedImages((previousImages) => previousImages.concat(imagesArray));
      // FOR BUG IN CHROME
      event.target.value = "";
    };

    const deleteImage = (image) => {
        setSelectedImages(selectedImages.filter((e) => e !== image));
        URL.revokeObjectURL(image);
    } 

    const handleSubmit = (e) => {
        // prevent page being refresh
        e.preventDefault();
        const itemInfo = {itemName, price, describtion, tags, selectedImages}
        console.log(itemInfo)
    }

    return (
        <div className="layout-upload">

            <div className="upload-container">
                <label>
                    <CameraAltRoundedIcon className="upload-icon"/>
                    <input className= "upload-input" type="file"  name="itemImages" multiple accept="image/*"  onChange={onSelectFile}/>
                </label>
                <p>Maximum 3 photos</p>
            </div>   

            <div className="preview-container">
                {selectedImages &&
                    selectedImages.map((image, index) => {
                        return(
                            <div key={image} >
                            <button className="delete-button" onClick={() => deleteImage(image)}> X </button>
                            <img  src={image} alt="file"/>
                            </div>
                        )
                    })
                }
            </div>

            <div className="fillin-container">
                <form method='post' onSubmit = {handleSubmit}>
                    <div className="fillin-input-container">
                        <h2>Name your cute work?</h2>
                        <input 
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                        />
                    </div>
                    <div className="fillin-input-container">
                        <h2>Price your work?</h2>
                        <input type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="fillin-input-container">
                    <h2>Can you precisely describe your work?</h2>
                        <input type="text"
                            value={describtion}
                            onChange={(e) => setDescribtion(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <div>
                            <h2>Tag your work with its category.</h2>
                        </div>
                        <div className="selector-container">
                        <Select 
                            isMulti
                            placeholder="Tell us what you interested in…"
                            options={options}
                            onChange={(item) => setTags(item)}
                            isClearable={true}
                            isSearchable={true}
                            isDisabled={false}
                            isLoading={false}
                            isRtl={false}
                            closeMenuOnSelect={false}
                        />
                        </div>
                    </div>
                    <div className="profile-button-container">
                        <button type='submit'>Save Changes</button> 
                    </div>
                </form>
            </div>
        </div>
    );
}
