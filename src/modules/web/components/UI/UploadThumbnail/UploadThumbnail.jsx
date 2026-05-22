// import React, { useState, useEffect } from "react"
// import uplode from "../../../assets/image/svg/upload.svg"
// import close from "../../../assets/image/svg/close.svg"
// import classes from "./UploadThumbnail.module.css"

// const UploadThumbnail = ({
//   label = "Upload Image",
//   reuploadLabel = "Reupload",
//   errorMessage = "Please select Thumbnail!",
//   allowedTypes = ["image/jpeg", "image/png", "image/webp"],
//   maxSizeMB = 2,
//   onFileChange,
//   error,
//   setError,
//   className,
//   initialImage = null,
// }) => {
//   const [uploadedImage, setUploadedImage] = useState(initialImage)
//   const [localError, setLocalError] = useState("")

//   // const [previewUrl, setPreviewUrl] = useState(
//   //   initialImage?.preview || initialImage
//   // )
//   // const [currentFile, setCurrentFile] = useState(initialImage?.file || null)

//   // Add this useEffect
//   // useEffect(() => {
//   //   if (initialImage) {
//   //     setPreviewUrl(initialImage.preview || initialImage)
//   //     setCurrentFile(initialImage.file || null)
//   //   }
//   // }, [initialImage])

//   useEffect(() => {
//     setUploadedImage(initialImage)
//   }, [initialImage])

//   const handleImageUpload = event => {
//     const file = event.target.files[0]
//     if (!file) return

//     // Validate file type
//     if (!allowedTypes.includes(file.type)) {
//       const errorMsg = `Invalid file type. Allowed types: ${allowedTypes.join(
//         ", "
//       )}`
//       setLocalError(errorMsg)
//       setError?.("imageFile", { message: errorMsg })
//       return
//     }

//     // Validate file size
//     const maxSizeBytes = maxSizeMB * 1024 * 1024
//     if (file.size > maxSizeBytes) {
//       const errorMsg = `File size exceeds ${maxSizeMB}MB`
//       setLocalError(errorMsg)
//       setError?.("imageFile", { message: errorMsg })
//       return
//     }

//     // Clear errors
//     setLocalError("")
//     setError?.("imageFile", null)

//     // Create preview
//     const imagePreview = URL.createObjectURL(file)
//     setUploadedImage(imagePreview)
//     onFileChange?.(file, imagePreview)
//     // const objectUrl = URL.createObjectURL(file)
//     // setPreviewUrl(objectUrl)
//     // setCurrentFile(file)
//     // onFileChange?.({ file, preview: objectUrl }, objectUrl)
//   }

//   const handleDelete = () => {
//     // if (previewUrl) URL.revokeObjectURL(previewUrl)
//     // setPreviewUrl(null)
//     // setCurrentFile(null)
//     // onFileChange?.(null, null)

//     setUploadedImage(null)
//     setLocalError("")
//     setError?.("imageFile", null)
//   }

//   return (
//     <div className={`${classes.input_position} ${className}`}>
//       <div className={classes.layout_input} style={{ margin: "0" }}>
//         <div className={classes.form}>
//           {/* <p
//             className={classes.contant_box_titel}
//             style={{ paddingTop: "0", paddingBottom: ".3rem" }}
//           >
//             {label}
//           </p> */}

//           <label htmlFor="fileimage" className="sr-only">
//             {uploadedImage ? (
//               <div
//                 className={`${classes.uploadedImage} ${classes.videoThumbnailContainer}`}
//               >
//                 <img
//                   src={uploadedImage}
//                   alt="Uploaded thumbnail"
//                   className={classes.imgeulodeeeee}
//                 />

//                 <div
//                   className={`${classes.deleteContainer} ${classes.deletepotion}`}
//                 >
//                   <img
//                     src={close}
//                     alt="Delete icon"
//                     onClick={handleDelete}
//                     width={10}
//                     height={10}
//                   />
//                 </div>

//                 {/* <div
//                   className={`${classes.reuploadContainer} ${classes.reulode}`}
//                 >
//                   <img
//                     src="/upload-white-icon.svg"
//                     alt="Reupload icon"
//                     width={20}
//                     height={20}
//                   />
//                   <p className={classes.reuploadLabeText}>{reuploadLabel}</p>
//                 </div> */}
//               </div>
//             ) : (
//               <div className={classes.upload}>
//                 <div className={classes.uploadImageLabel}>
//                   <img
//                     src={uplode}
//                     className={classes.thumblin_uplode}
//                     alt="Upload icon"
//                     width={40}
//                     height={40}
//                   />
//                 </div>
//                 <p className={classes.contant_box_titel}>{label}</p>
//               </div>
//             )}
//           </label>
//         </div>

//         <input
//           type="file"
//           id="fileimage"
//           accept={allowedTypes.join(", ")}
//           onChange={handleImageUpload}
//           className={classes.uploadInput}
//           onClick={e => (e.target.value = null)}
//         />
//       </div>

//       {(localError || error) && (
//         <span className={`${classes.absolute} text_danger marg_top_5rem`}>
//           {localError || errorMessage}
//         </span>
//       )}
//     </div>
//   )
// }

// export default UploadThumbnail

import React, { useState, useEffect, useRef } from "react"
import uplode from "../../../assets/image/svg/upload photo.svg"
import close from "../../../assets/image/svg/close.svg"
import classes from "./UploadThumbnail.module.css"

const UploadThumbnail = ({
  label = "Upload Image",
  errorMessage = "Please select Thumbnail!",
  initialImage = null,
  allowedTypes = ["image/jpeg", "image/png", "image/webp"],
  maxSizeMB = 2,
  onFileChange,
  onRemove,
  error,
  setError,
  style,
  id = "fileimage",
  closeBtnCheck,
}) => {
  const [previewUrl, setPreviewUrl] = useState(
    initialImage?.preview || initialImage
  )
  const [currentFile, setCurrentFile] = useState(initialImage?.file || null)
  const fileInputRef = useRef(null)
  useEffect(() => {
    if (initialImage) {
      setPreviewUrl(initialImage.preview || initialImage)
      setCurrentFile(initialImage.file || null)
    }
  }, [initialImage])

  // useEffect(() => {
  //   if (initialImage === null) {
  //     setPreviewUrl(null)
  //     setCurrentFile(null)
  //   }
  // }, [initialImage])

  const handleImageUpload = event => {
    const file = event.target.files[0]
    if (!file) return

    // Validate file type
    const isValidType =
      allowedTypes.includes(file.type) ||
      allowedTypes.includes(`image/${file.name.split(".").pop()}`)
    if (!isValidType) {
      const errorMsg = `Invalid file type. Allowed types: ${allowedTypes.join(
        ", "
      )}`
      handleError(errorMsg)
      return
    }

    // Validate file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxSizeBytes) {
      const errorMsg = `File size exceeds ${maxSizeMB}MB`
      handleError(errorMsg)
      return
    }

    if (file.size <= 0) {
      const errorMsg = `File size cannot be zero`
      handleError(errorMsg)
      return
    }

    // Clear errors
    clearErrors()

    // Create preview and update state
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)
    setCurrentFile(file)
    onFileChange?.({ file, preview: objectUrl }, objectUrl)
  }

  const handleDelete = e => {
    e.stopPropagation()
    e.preventDefault()

    if (previewUrl) URL.revokeObjectURL(previewUrl)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    setPreviewUrl(null)
    setCurrentFile(null)
    onFileChange?.(null, null)
    clearErrors()
    onRemove()
  }

  // Prevent label from triggering input when delete button is clicked
  const handleLabelClick = e => {
    if (e.target.closest(`.${classes.deleteButton}`)) {
      e.preventDefault()
      e.stopPropagation()
    }
  }
  const handleError = message => {
    setError?.("imageFile", { message })
    setPreviewUrl(null)
    setCurrentFile(null)
  }

  const clearErrors = () => {
    setError?.("imageFile", null)
  }

  return (
    <div className={`${classes.input_position}`}>
      <div className={classes.layout_input} style={{ margin: "0" }}>
        <div className={classes.form}>
          <label
            htmlFor={`${id}`}
            className={classes.uploadLabel}
            onClick={handleLabelClick}
          >
            {previewUrl ? (
              <div className={classes.previewContainer} style={style}>
                <img
                  src={previewUrl}
                  alt="Uploaded preview"
                  className={classes.previewImage}
                />

                {closeBtnCheck !== null && (
                  <div className={classes.overlayControls}>
                    <button
                      type="button"
                      className={classes.deleteButton}
                      onClick={handleDelete}
                    >
                      <img src={close} alt="Delete" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={classes.uploadPrompt} style={style}>
                <img
                  src={uplode}
                  className={classes.uploadIcon}
                  alt="Upload icon"
                />
                <p className={classes.uploadText}>{label}</p>
              </div>
            )}
          </label>
        </div>
        {closeBtnCheck !== null && !previewUrl && (
          <input
            ref={fileInputRef}
            type="file"
            id={`${id}`}
            accept={allowedTypes.join(", ")}
            onChange={handleImageUpload}
            className={classes.hiddenInput}
          />
        )}
      </div>

      {error?.message && (
        <span className={classes.errorMessage}>
          {error.message || errorMessage}
        </span>
      )}
    </div>
  )
}

export default UploadThumbnail
