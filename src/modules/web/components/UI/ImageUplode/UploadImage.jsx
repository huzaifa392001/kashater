// import React, { useRef, useState, useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"

// // IMG
// import cameraIcon from "../../../assets/image/svg/user profile(big).svg"

// // CSS
// import classes from "./UploadImage.module.css"
// import { authActions } from "../../../services/storeSlice/authSlice"
// import Loding from "../Loding/Loding"

// export default function UploadImage(props) {
//   const { setFileTypeError, setErrorFileType, fileUploadComplied, Lodingtime } =
//     props
//   const dispatch = useDispatch()
//   const profileImage = useSelector(state => state.auth?.profile_picture)
//   const image = useSelector(
//     state => state?.onboard?.personal_details?.image_preview
//   )
//   const [selectedImage, setSelectedImage] = useState(
//     profileImage ? profileImage : image || null
//   )
//   const fileInputRef = useRef(null)
//   const handleImageChange = e => {
//     const file = e.target.files[0]
//     if (!file) return

//     if (file) {
//       // Check if the file type is allowed
//       const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
//       if (!allowedTypes.includes(file.type)) {
//         setErrorFileType(
//           "Invalid file type! Please select a JPEG or PNG image."
//         )
//         setSelectedImage(null)
//         return
//       }

//       // Check if the file size is less than or equal to 2MB
//       const maxSize = 2 * 1024 * 1024 // 2MB in bytes
//       console.log("maxSize", maxSize)
//       console.log("file.size", file.size)
//       if (file.size > maxSize) {
//         setErrorFileType(
//           "File size exceeds 2MB! Please select a smaller image."
//         )
//         setSelectedImage(null)
//         return
//       }

//       setFileTypeError(file)
//       setErrorFileType("")

//       const reader = new FileReader()

//       reader.onload = e => {
//         setSelectedImage(e.target.result)
//         props?.setFileUploadComplied &&
//           props?.setFileUploadComplied(e.target.result)

//         dispatch(authActions.setProfilePicture(e.target.result))
//       }

//       reader.readAsDataURL(file)
//       // Create object URL for preview
//       const objectUrl = URL.createObjectURL(file)
//       setSelectedImage(objectUrl)
//       props?.setFileUploadComplied(objectUrl)
//     }

//     props?.onChange && props.onChange()
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//   }
//   useEffect(() => {
//     return () => {
//       if (selectedImage && selectedImage.startsWith("blob:")) {
//         URL.revokeObjectURL(selectedImage)
//       }
//     }
//   }, [selectedImage])
//   return (
//     <div className={classes["img-upload__box"]}>
//       <input
//         ref={fileInputRef}
//         type="file"
//         id="upload-img"
//         accept=".jpg, .png, .jpeg"
//         hidden
//         {...props}
//         onChange={handleImageChange}
//       />

//       <label htmlFor="upload-img" className={classes["label"]}>
//         {Lodingtime && <Loding />}
//         {fileUploadComplied !== null ? (
//           <img
//             src={image ? image : fileUploadComplied}
//             alt="Selected Image"
//             className={classes["uploaded-image"]}
//           />
//         ) : profileImage ? (
//           <img
//             src={fileUploadComplied || cameraIcon}
//             alt="Selected Image"
//             className={
//               fileUploadComplied
//                 ? classes["uploaded-image"]
//                 : classes["upload-icon"]
//             }
//           />
//         ) : (
//           <>
//             <img
//               src={cameraIcon}
//               alt="Camera Icon"
//               className={classes["upload-icon"]}
//             />
//           </>
//         )}
//       </label>
//       <label className={classes.ChangeButton} htmlFor="upload-img">
//         Upload Photo
//       </label>
//     </div>
//   )
// }

// import React, { useRef, useState, useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"

// // IMG
// import cameraIcon from "../../../assets/image/svg/user profile(big).svg"

// // CSS
// import classes from "./UploadImage.module.css"
// import { authActions } from "../../../services/storeSlice/authSlice"
// import Loding from "../Loding/Loding"

// export default function UploadImage(props) {
//   const { setFileTypeError, setErrorFileType, fileUploadComplied, Lodingtime } =
//     props
//   const dispatch = useDispatch()

//   // Get image sources from Redux
//   const profileImage = useSelector(state => state.auth?.profile_picture)
//   const image = useSelector(
//     state => state?.onboard?.personal_details?.image_preview
//   )

//   // State for the displayed image
//   const [selectedImage, setSelectedImage] = useState(null)

//   const fileInputRef = useRef(null)

//   // Sync with Redux image sources
//   useEffect(() => {
//     // Use profile image first, fallback to onboarding image
//     if (profileImage) {
//       setSelectedImage(profileImage)
//     } else if (image) {
//       setSelectedImage(image)
//     }
//   }, [profileImage, image])

//   const handleImageChange = e => {
//     const file = e.target.files[0]
//     if (!file) return

//     // Validate file type
//     const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
//     if (!allowedTypes.includes(file.type)) {
//       setErrorFileType("Invalid file type! Please select a JPEG or PNG image.")
//       setSelectedImage(null)
//       return
//     }

//     // Validate file size (2MB max)
//     const maxSize = 2 * 1024 * 1024
//     if (file.size > maxSize) {
//       setErrorFileType("File size exceeds 2MB! Please select a smaller image.")
//       setSelectedImage(null)
//       return
//     }

//     setFileTypeError(file)
//     setErrorFileType("")

//     const reader = new FileReader()
//     reader.onload = e => {
//       const base64 = e.target.result
//       setSelectedImage(base64)
//       props?.setFileUploadComplied?.(base64)
//       dispatch(authActions.setProfilePicture(base64))
//     }
//     reader.readAsDataURL(file)

//     props?.onChange?.()
//     if (fileInputRef.current) fileInputRef.current.value = ""
//   }

//   return (
//     <div className={classes["img-upload__box"]}>
//       <input
//         ref={fileInputRef}
//         type="file"
//         id="upload-img"
//         accept=".jpg, .png, .jpeg"
//         hidden
//         {...props}
//         onChange={handleImageChange}
//       />

//       <label htmlFor="upload-img" className={classes.label}>
//         {Lodingtime && <Loding />}

//         {/* Show uploaded/selected image if available */}
//         {selectedImage ? (
//           <img
//             src={selectedImage}
//             alt="Profile"
//             className={classes["uploaded-image"]}
//           />
//         ) : (
//           /* Show camera icon only when no image exists */
//           <>
//             {!selectedImage && (
//               <img
//                 src={cameraIcon}
//                 alt="Camera Icon"
//                 className={classes["upload-icon"]}
//               />
//             )}
//           </>
//         )}
//       </label>

//       <label className={classes.ChangeButton} htmlFor="upload-img">
//         Upload Photo
//       </label>
//     </div>
//   )
// }
import React, { useRef, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

// IMG
import cameraIcon from "../../../assets/image/svg/user profile(big).svg"

// CSS
import classes from "./UploadImage.module.css"
import { authActions } from "../../../services/storeSlice/authSlice"
import Loding from "../Loding/Loding"

export default function UploadImage(props) {
  const { setFileTypeError, setErrorFileType, fileUploadComplied, Lodingtime } =
    props
  const dispatch = useDispatch()

  // Get image sources from Redux
  const profileImage = useSelector(state => state.auth?.profile_picture)
  const image = useSelector(
    state => state?.onboard?.personal_details?.image_preview
  )

  // State for the displayed image
  const [selectedImage, setSelectedImage] = useState(null)
  // State to control when to show default icon
  const [showDefault, setShowDefault] = useState(false)

  const fileInputRef = useRef(null)
  const timerRef = useRef(null)

  // Set up 2-second delay for showing default icon
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setShowDefault(true)
    }, 3000)

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [])

  // Sync with Redux image sources
  useEffect(() => {
    if (profileImage) {
      setSelectedImage(profileImage)
      clearTimeout(timerRef.current)
      setShowDefault(false)
    } else if (image) {
      setSelectedImage(image)
      clearTimeout(timerRef.current)
      setShowDefault(false)
    }
  }, [profileImage, image])

  const handleImageChange = e => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
    if (!allowedTypes.includes(file.type)) {
      setErrorFileType("Invalid file type! Please select a JPEG or PNG image.")
      setSelectedImage(null)
      return
    }

    // Validate file size (2MB max)
    const maxSize = 2 * 1024 * 1024
    if (file.size > maxSize) {
      setErrorFileType("File size exceeds 2MB! Please select a smaller image.")
      setSelectedImage(null)
      return
    }

    setFileTypeError(file)
    setErrorFileType("")

    const reader = new FileReader()
    reader.onload = e => {
      const base64 = e.target.result
      setSelectedImage(base64)
      props?.setFileUploadComplied?.(base64)
      dispatch(authActions.setProfilePicture(base64))
      clearTimeout(timerRef.current)
      setShowDefault(false)
    }
    reader.readAsDataURL(file)

    props?.onChange?.()
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className={classes["img-upload__box"]}>
      <input
        ref={fileInputRef}
        type="file"
        id="upload-img"
        accept=".jpg, .png, .jpeg"
        hidden
        {...props}
        onChange={handleImageChange}
      />

      <label htmlFor="upload-img" className={classes.label}>
        {Lodingtime && <Loding />}

        {/* Show uploaded/selected image if available */}
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Profile"
            className={classes["uploaded-image"]}
          />
        ) : showDefault ? (
          /* Show camera icon only after 2-second delay */
          <img
            src={cameraIcon}
            alt="Camera Icon"
            className={classes["upload-icon"]}
          />
        ) : null}
      </label>

      <label className={classes.ChangeButton} htmlFor="upload-img">
        Upload Photo
      </label>
    </div>
  )
}
