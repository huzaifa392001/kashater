import React, { useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import PropTypes from "prop-types"
import uploadIcon from "../../../assets/image/svg/unboxing video.svg"
import styles from "./VideoUploadComponent.module.css"
import { v4 as uuidv4 } from "uuid"

const VideoUploadComponent = ({
  acceptedTypes = ["video/*"],
  types = "",
  maxSize = 100, // Larger default for videos (100MB)
  onFilesChange,
  previewRenderer,
  dropzoneText = "Upload Video",
  className,
  disabled,
  box_controlerl,
  stylesss,
  method
}) => {
  const [files, setFiles] = useState([])
  const [errors, setErrors] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: Object.fromEntries(
      acceptedTypes.map(type => [type, [".mp4", ".mov", ".avi"]]) // Common video extensions
    ),
    multiple: false,
    disabled,
    maxSize: maxSize * 1024 * 1024,
    onDrop: (acceptedFiles, rejectedFiles) => {
      const processedFiles = acceptedFiles.slice(0, 1).map(file => ({
        file,
        preview: URL.createObjectURL(file),
        id: uuidv4(),
      }))

      const newErrors = rejectedFiles.map(({ file, errors }) => ({
        fileName: file.name,
        errors: errors.map(err => err.message),
      }))

      setErrors(newErrors)
      setFiles(processedFiles)
      onFilesChange?.(processedFiles)
    },
  })

  // Clean up object URLs
  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    }
  }, [files])

  const removeFile = fileId => {
    const updatedFiles = files.filter(file => file.id !== fileId)
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles)
  }

  // Custom video preview renderer
  const defaultPreview = file => {
    console.log("defaultPreview", file)

    return (

      <div className={`${styles.filePreview} ${className}`} key={file.id}>
        <div className={`${styles.videoPreview} ${box_controlerl}`}>
          <video controls style={stylesss}>
            <source src={file.preview} type={file.file.type} />
            Your browser does not support video playback.
          </video>
          <button
            className={styles.removeButton}
            onClick={() => removeFile(file.id)}
            aria-label="Remove video"
          >
            ×
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.fileUploadContainer}`}>
      <div>
        {files.length === 0 && (
          <div
            {...getRootProps({
              className: `${method == 'gallery' ? styles.dropzone2 : styles.dropzone} ${disabled ? styles.disabled : ""
                } ${className}`,
            })}
            style={stylesss}
          >
            <input {...getInputProps()} />
            <div>
              <img
                src={uploadIcon}
                className={styles.thumblin_uplode}
                alt="Video upload icon"
                width={40}
                height={40}
              />
              <p className={method == 'gallery' ? styles.dropzoneText2 : styles.dropzoneText}>{dropzoneText}</p>
              <p className={styles.fileRequirements}>{types}</p>
            </div>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div className={styles.errorMessages}>
          {errors.map((error, index) => (
            <div key={index} className={styles.errorItem}>
              <strong>{error.fileName}:</strong>
              {error.errors.join(", ")}
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className={styles.previewsGrid}>
          {files.map(file =>
            previewRenderer
              ? previewRenderer(file, () => removeFile(file.id))
              : defaultPreview(file)
          )}
        </div>
      )}
    </div>
  )
}

VideoUploadComponent.propTypes = {
  acceptedTypes: PropTypes.arrayOf(PropTypes.string),
  maxSize: PropTypes.number,
  onFilesChange: PropTypes.func,
  previewRenderer: PropTypes.func,
  dropzoneText: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
}

export default VideoUploadComponent
