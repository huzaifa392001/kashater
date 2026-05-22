import React, { useState } from "react"
import Popup from "../../Modal/Modal"
import classes from "./LightboxImgPdf.module.css"
// import play from "../../../../assets/image/svg/play.svg"
const FileViewerLightbox = ({ fileUrl, customComp, fileType }) => {
  const [isOpen, setIsOpen] = useState(false)

  // Check if the file is an image
  const isImageFile = url => {
    return /\.(jpeg|jpg|gif|png|bmp)(\?.*)?$/i.test(url)
  }

  // Check if the file is a document (PDF)
  const isDocumentFile = url => {
    return /\.pdf(\?.*)?$/i.test(url)
  }

  const handleOpenLightbox = () => {
    setIsOpen(true)
  }

  const handleCloseLightbox = () => {
    setIsOpen(false)
  }

  return (
    <div>
      {customComp ? (
        <div className={classes.customComp} onClick={handleOpenLightbox}>
          {customComp}
        </div>
      ) : (
        <p onClick={handleOpenLightbox} className={classes.Sample_Preview}>
          {fileType === "image" && <> <img src={fileUrl} alt="play" />
            Sample Preview</>}
          {fileType === "video" && <span>▶ Video Preview</span>}
        </p>
      )}

      {isOpen && fileType === "image" && isImageFile(fileUrl) && (
        <div className={classes.modal} onClick={handleCloseLightbox}>
          <span className={classes.close}>&times;</span>

          <img
            className={classes["modal-content"]}
            src={fileUrl}
            alt={"Preview"}
          />
        </div>
      )}

      {isOpen && fileType === "video" && (
        <Popup open={isOpen} style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "90vh",
          maxWidth: "1500px",
          bgcolor: "transparent", // Light black background
          // boxShadow: 24,
          p: 4,
          borderRadius: "8px",
        }}
          height={{ height: "90%" }}
          onClose={handleCloseLightbox}>
          <video
            src={fileUrl}
            controls
            autoPlay
            style={{ width: "100%", maxHeight: "80vh" }}
          />
        </Popup>
      )}


      {isOpen && isDocumentFile(fileUrl) && (
        <Popup
          open={isOpen}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "90vh",
            maxWidth: "1500px",
            bgcolor: "transparent", // Light black background
            // boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
          height={{ height: "90%" }}
          onClose={handleCloseLightbox}
        >
          <iframe
            style={{ height: "80vh", border: "none" }}
            src={`${fileUrl}#view=fitH`}
            width="100%"
            height="100%"
            title="PDF Document"
          />
        </Popup>
      )}
    </div>
  )
}

export default FileViewerLightbox
