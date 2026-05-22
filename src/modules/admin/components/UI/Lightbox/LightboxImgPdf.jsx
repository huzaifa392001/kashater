import React, { useEffect } from "react"
import Popup from "../Modal/Modal"
import classes from "./LightboxImgPdf.module.css"

const FileViewerLightbox1 = ({
  fileUrl,
  isOpen,
  isLoading,
  onClose,
  children,
}) => {
  const isImageFile = url => /\.(jpeg|jpg|gif|png|bmp|webp)$/i.test(url)
  const isDocumentFile = url => /\.pdf$/i.test(url)

  return (
    <>
      {isLoading && (
        <div className={classes.loaderOverlay}>
          <div className={classes.loader}></div>
        </div>
      )}

      {isOpen && (
        <div className={classes.modal}>
          <span className={classes.close} onClick={onClose}>
            &times;
          </span>
          <div className={classes.img_box}>{children}</div>
        </div>
      )}

      {isOpen && isDocumentFile(fileUrl) && (
        <Popup
          open={isOpen}
          onClose={onClose}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "90vh",
            maxWidth: "1500px",
            bgcolor: "transparent",
            p: 4,
            borderRadius: "8px",
          }}
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
    </>
  )
}

export default FileViewerLightbox1
