import "../css/upload.css";
import Select from "react-select";
import React, {useState, useRef} from "react";
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';


export default function Upload() {
    const access_token = sessionStorage.getItem("access_token")
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
    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const files = [];
    const [filesDict, setFileDict] = useState({})

    const formRef = useRef();

    const onSelectFile = (e) => {
        // const file = e.target.files[0];
        // files.concat(file);
        // form.append('file', file)
          const selectedFiles = e.target.files;
          const selectedFilesArray = Array.from(selectedFiles);
          console.log(selectedFiles)
    
          const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
          });
          for (var i = 0; i < selectedFiles.length; i++) {
            filesDict[imagesArray[i]] = e.target.files[i]
          }
          console.log(filesDict)
          // save the previous selected images
          setSelectedImages((previousImages) => previousImages.concat(imagesArray));
          // FOR BUG IN CHROME
          e.target.value = "";
        // setSelectedFile(e.target.files[0]);
    };

    const deleteImage = (image) => {
        setSelectedImages(selectedImages.filter((e) => e !== image));
        URL.revokeObjectURL(image);
    } 

    const handleSubmit = (e) => {
        // prevent page being refresh
        e.preventDefault();
        const data = new FormData(formRef.current);
        data.append("tags", JSON.stringify(tags))
        const filesArray= selectedImages.map((file) => {
            return filesDict[file]
          })
        for (let i = 0; i < filesArray.length; i++) {
            data.append(i, filesArray[i]);
        }
        console.log(filesArray)
        fetch('http://localhost:9000/users/upload',{
            headers : {
                // 'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: "Bearer " + access_token,
            },
            method: 'POST',
            mode: 'cors',
            body: data
        })
        .then(itemInfo => {
            console.log('Success:', itemInfo);
        })
    }

    return (
        <div className="layout-upload">

            <div className="upload-container">
                <label>
                    <CameraAltRoundedIcon className="upload-icon"/>
                    <input className= "upload-input" type="file" name="itemImages" multiple accept="image/*" onChange={onSelectFile}/>
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
                <form method='post' onSubmit = {handleSubmit} enctype="multipart/form-data" ref={formRef}>
                    <div className="fillin-input-container">
                        <h2>Name your cute work?</h2>
                        <input 
                        name="itemName"
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                        />
                    </div>
                    <div className="fillin-input-container">
                        <h2>Price your work?</h2>
                        <input type="number"
                            name="price"
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
                            name="tag"
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