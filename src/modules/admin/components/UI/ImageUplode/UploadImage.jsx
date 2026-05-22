import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

// IMG
import cameraIcon from "../../../assets/image/svg/close.svg"

// CSS
import classes from "./UploadImage.module.css"

// // store
// import { onboardActions } from "../../../store/state-slices/onboard";

export default function UploadImage(props) {
  const { setFileTypeError, setErrorFileType } = props
  // const dispatch = useDispatch()
  const profileImage = ""
  const image = ""
  const [selectedImage, setSelectedImage] = useState(
    profileImage ? profileImage : image || null
  )

  const handleImageChange = e => {
    const file = e.target.files[0]

    if (file) {
      // Check if the file type is allowed
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
      if (!allowedTypes.includes(file.type)) {
        setErrorFileType(
          "Invalid file type! Please select a JPEG or PNG image."
        )
        setSelectedImage(null)
        return
      }

      // Check if the file size is less than or equal to 2MB
      const maxSize = 2 * 1024 * 1024 // 2MB in bytes
      console.log("maxSize", maxSize)
      console.log("file.size", file.size)
      if (file.size > maxSize) {
        setErrorFileType(
          "File size exceeds 2MB! Please select a smaller image."
        )
        setSelectedImage(null)
        return
      }

      setFileTypeError(file)
      setErrorFileType("")

      const reader = new FileReader()

      reader.onload = e => {
        setSelectedImage(e.target.result)
        props?.setFileUploadComplied &&
          props?.setFileUploadComplied(e.target.result)

        // dispatch(
        //   onboardActions.addPersonalDetails({
        //     personalDetails: { image_preview: e.target.result },
        //   })
        // );
      }

      reader.readAsDataURL(file)
    }

    props?.onChange && props.onChange()
  }

  return (
    <div className={classes["img-upload__box"]}>
      <input
        type="file"
        id="upload-img"
        accept=".jpg, .png, .jpeg"
        hidden
        {...props}
        onChange={handleImageChange}
      />
      <label htmlFor="upload-img">
        {selectedImage !== null ? (
          <img
            src={image ? image : selectedImage}
            alt="Selected Image"
            className={classes["uploaded-image"]}
          />
        ) : profileImage ? (
          <img
            src={selectedImage || cameraIcon}
            alt="Selected Image"
            className={
              selectedImage ? classes["uploaded-image"] : classes["upload-icon"]
            }
          />
        ) : (
          <img
            src={cameraIcon}
            alt="Camera Icon"
            className={classes["upload-icon"]}
          />
        )}
      </label>
    </div>
  )
}
