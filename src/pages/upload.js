import '../css/upload.css'
import Select from 'react-select'
import React, { useState, useRef, useEffect } from 'react'
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded'
import Alert from '@mui/material/Alert'
import PhotoIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CircularProgress from '@mui/material/CircularProgress'

const NAME_REG = /^[A-Z0-9][A-z0-9-_ ]{3,40}$/i
const PRICE_REG = /^[1-9][0-9]{0,7}(\.[0-9]{0,2})?$/
// const DESC_REG = new RegExp(/^[A-Za-z0-9!-_@$%^&*(),.`~?]{10,480}$/);
// match anything
const DESC_REG = /^[\s\S]{10,480}$/
export const validName = (str = '') => NAME_REG.test(str)
export const validPrice = (str = '') => PRICE_REG.test(str)
export const validDesc = (str = '') => DESC_REG.test(str)
export const validTag = (tag = []) => tag.length < 4

export default function Upload () {
  const myId = sessionStorage.getItem('id')
  const accessToken = sessionStorage.getItem('access_token')
  const [loading, setLoading] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [itemName, setItemName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setdescription] = useState('')
  const [tags, setTags] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [warning, setWarning] = useState('')
  const [fileLimit, setFileLimit] = useState(false)

  const options = [
    { value: 'textiles', label: 'Textiles' },
    { value: 'ceramics', label: 'Ceramics' },
    { value: 'glass', label: 'Glass' },
    { value: 'woodwork', label: 'Woodwork' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'leather', label: 'Leather' },
    { value: 'painting', label: 'Painting' },
    { value: 'others', label: 'Others' }
  ]

  /* Image */
  const [selectedImages, setSelectedImages] = useState([])
  const [filesDict] = useState({})
  const formRef = useRef()

  const toggleButton = () => {
    setIsActive((current) => !current)
  }

  const onSelectFile = (e) => {
    // const file = e.target.files[0];
    // files.concat(file);
    // form.append('file', file)
    const selectedFiles = e.target.files
    const selectedFilesArray = Array.from(selectedFiles)
    // MAXIMUM 3 Photos each
    if (selectedFilesArray.length > 3 - selectedImages.length) { setWarning('MAXIMUM 3 Photos') }
    const slicedArray = selectedFilesArray.slice(0, 3 - selectedImages.length)
    console.log(selectedFilesArray)

    const imagesArray = slicedArray.map((file) => {
      return URL.createObjectURL(file)
    })
    for (let i = 0; i < slicedArray.length; i++) {
      filesDict[imagesArray[i]] = e.target.files[i]
    }
    // save the previous selected images
    setSelectedImages((previousImages) => previousImages.concat(imagesArray))
    // FOR BUG IN CHROME
    e.target.value = ''
  }

  // MAXIMUM 3 Photos in total
  useEffect(() => {
    if (selectedImages.length === 3) {
      setFileLimit(true)
      setWarning('MAXIMUM 3 Photos')
    }
    console.log(fileLimit)
  }, [selectedImages, fileLimit])

  const deleteImage = (image) => {
    setSelectedImages(selectedImages.filter((e) => e !== image))
    URL.revokeObjectURL(image)
    if (selectedImages.length <= 3) {
      setFileLimit(false)
      setWarning('')
    }
  }

  const handleSubmit = (e) => {
    // console.log(selectedImages);
    // prevent page being refresh
    e.preventDefault()
    setLoading(true)
    setSubmit(true)
    const data = new FormData(formRef.current)
    data.append('tags', JSON.stringify(tags))
    const filesArray = selectedImages.map((file) => {
      return filesDict[file]
    })
    for (let i = 0; i < filesArray.length; i++) {
      data.append(i, filesArray[i])
    }
    console.log(filesArray)
    // at least one image
    if (filesArray.length !== 0) {
      fetch('/users/upload', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + accessToken
        },
        method: 'POST',
        mode: 'cors',
        body: data
      })
        .then((res) => {
          console.log(res)
          setLoading(false)
          window.location.href =
            window.location.origin + '/user/market/' + myId
        })
        .then((itemInfo) => {
          console.log('Success:', itemInfo)
        })
    } else {
      setWarning('1-3 photos requried')
    }
  }

  useEffect(() => {
    fetch('/users/upload', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + accessToken
      },
      method: 'GET',
      mode: 'cors'
    }).then((res) => {
      console.log(res)
      if (res.status === 401) {
        sessionStorage.removeItem('access_token')
        window.location.href = window.location.origin + '/user/login'
      } else {
        return res.json()
      }
    })
  }, [accessToken])

  return (
    <>
      {loading
        ? (
        <CircularProgress className="loading" />
          )
        : (
        <>
          {submit
            ? (
            <div className="loading" />
              )
            : (
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
                    disabled={fileLimit}
                  />
                </label>
                <div className="upload-alert">
                  {warning ? <Alert severity="warning">{warning}</Alert> : null}
                </div>
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
                    )
                  })}
                {selectedImages.length < 3
                  ? (
                  <div className="image-wrapper-2">
                    <PhotoIcon />
                  </div>
                    )
                  : null}
                {selectedImages.length < 2
                  ? (
                  <div className="image-wrapper-2">
                    <PhotoIcon />
                  </div>
                    )
                  : null}
                {selectedImages.length === 0
                  ? (
                  <div className="image-wrapper-2">
                    <PhotoIcon />
                  </div>
                    )
                  : null}
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
                    <div className="upload-error">
                      {itemName && !validName(itemName)
                        ? (
                        <Alert severity="warning">
                          3 to 40 characters. Must start with letters.
                          <br />
                          Letters, numbers, underscores, space, hyphens allowed.
                        </Alert>
                          )
                        : null}
                    </div>
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
                    {price && !validPrice(price)
                      ? (
                      <div className="upload-error">
                        <Alert severity="warning">
                          Price ranged between 0 to 99,999,999
                        </Alert>
                      </div>
                        )
                      : null}
                  </div>
                  <div className="fillin-input-container">
                    <h2>Can you precisely describe your work?</h2>
                    <textarea
                      type="textarea"
                      name="description"
                      value={description}
                      onChange={(e) => setdescription(e.target.value)}
                      required
                    />
                    {description && !validDesc(description)
                      ? (
                      <div className="upload-error">
                        <Alert severity="warning">10 to 480 characters.</Alert>
                      </div>
                        )
                      : null}
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
                    {tags && !validTag(tags)
                      ? (
                      <div className="upload-error">
                        <Alert severity="warning">Maximum 3 categories</Alert>
                      </div>
                        )
                      : null}
                  </div>
                  <button
                    className="profile-button-container"
                    type="submit"
                    style={{
                      backgroundColor: isActive ? '#c5c1a4' : ''
                    }}
                    onClick={toggleButton}
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
              )}
        </>
          )}
    </>
  )
}
