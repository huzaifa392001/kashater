import React, { useState, useEffect, useRef } from "react"
import { useDropzone } from "react-dropzone"
import PropTypes from "prop-types"
import uplode from "../../../assets/image/svg/upload.svg"
import styles from "./FileUploadComponent.module.css"
import { v4 as uuidv4 } from "uuid"

const FileUploadComponent = ({
  acceptedTypes = [
    "image/*",
    "application/pdf",
    "application/epub+zip",
    "application/zip",
  ],
  types = "PDF, EPUB, or Image Sets",
  multiple = false, // Changed default to false
  maxSize = 5,
  onFilesChange,
  previewRenderer,
  dropzoneText = "Upload File", // Updated text
  className,
  disabled,
  box_controlerl,
  existingFile = null,
}) => {
  const [files, setFiles] = useState([])


  const [errors, setErrors] = useState([])
  // const uuid = useRef(uuidv4());
  const uuid = uuidv4()

  const { getRootProps, getInputProps } = useDropzone({
    accept: Object.fromEntries(
      acceptedTypes.map(type => [
        type,
        type.startsWith("image/") ? [".png", ".jpg", ".jpeg"] : [],
      ])
    ),
    multiple: false, // Force single file
    disabled,
    maxSize: maxSize * 1024 * 1024,
    onDrop: (acceptedFiles, rejectedFiles) => {
      const processedFiles = acceptedFiles.slice(0, 1).map(file => ({
        // Take only first file
        file,
        preview: URL.createObjectURL(file),
        // id: crypto.randomUUID(),
        id: uuid,
      }))

      const newErrors = rejectedFiles.map(({ file, errors }) => ({
        fileName: file.name,
        errors: errors.map(err => err.message),
      }))

      setErrors(newErrors)
      setFiles(processedFiles) // Always replace files
      onFilesChange?.(processedFiles)
    },
  })

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  const removeFile = fileId => {
    if (fileId === "existing" && existingFile) {
      setFiles([])
      return

    }

    const updatedFiles = files.filter(file => file.id !== fileId)

    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles)


  }
  useEffect(() => {


    if (existingFile && !files.length) {
      setFiles([
        {
          id: "existing",
          preview: existingFile.url,
          file: {
            name: existingFile.name || "Existing file",
            type: existingFile.type || "image/jpeg",
          },
        },
      ])
    }
  }, [existingFile])



  const defaultPreview = file => (
    <div className={`${styles.filePreview} ${className}`} key={file.id}>
      {file.file.type.startsWith("image/") ? (
        <div className={`${styles.imagePreview} ${box_controlerl}`}>
          <img src={file.preview} alt={file.file.name} />
          <button onClick={() => removeFile(file.id)} aria-label="Remove file">
            ×
          </button>
        </div>
      ) : (
        <div className={styles.documentPreview}>
          <span>{file.file.name}</span>
          <button onClick={() => removeFile(file.id)} aria-label="Remove file">
            ×
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div className={`${styles.fileUploadContainer}`}>
      <div>
        {/* {files.length !== 0 && (
        <div
          {...getRootProps({
            className: `${styles.dropzone} ${
              disabled ? styles.disabled : ""
            } ${className}`,
          })}
          style={box_controlerl}
        >
          <input {...getInputProps()} />
          <div>
            <img
              src={uplode}
              className={styles.thumblin_uplode}
              alt="Upload icon"
              width={40}
              height={40}
            />
            <p className={styles.dropzoneText}>{dropzoneText}</p>
            <p className={styles.fileRequirements}>{types}</p>
          </div>
        </div>
        )} */}
        {files.length === 0 && (
          <div
            {...getRootProps({
              className: `${styles.dropzone} ${disabled ? styles.disabled : ""
                } ${className}`,
            })}
          >
            <input {...getInputProps()} />
            <div>
              <img
                src={uplode}
                className={styles.thumblin_uplode}
                alt="Upload icon"
                width={40}
                height={40}
              />
              <p className={styles.dropzoneText}>{dropzoneText}</p>
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

      {/* <div className={styles.previewsGrid}>
        {files.map(file =>
          previewRenderer
            ? previewRenderer(file, () => removeFile(file.id))
            : defaultPreview(file)
        )}
      </div> */}
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

FileUploadComponent.propTypes = {
  acceptedTypes: PropTypes.arrayOf(PropTypes.string),
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
  onFilesChange: PropTypes.func,
  previewRenderer: PropTypes.func,
  dropzoneText: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  existingFile: PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
}

export default FileUploadComponent

{
  /* <FileUploadComponent
  acceptedTypes={['image/*', 'application/pdf']}
  multiple={false}
  maxSize={10}
  dropzoneText="Upload profile picture (PDF or Image)"
  previewRenderer={(file, remove) => (
    <div className="custom-preview">
      <img src={file.preview} alt="custom" />
      <button onClick={() => remove(file.id)}>Remove</button>
    </div>
  )}
  className="custom-uploader"
  disabled={isSubmitting}
/> */
}

// // 1. Simple image upload
// <FileUploadComponent
//   acceptedTypes={['image/*']}
//   multiple={false}
//   onFilesChange={(files) => setProfileImage(files[0])}
// />

// // 2. Document upload with custom preview
// <FileUploadComponent
//   acceptedTypes={['application/pdf']}
//   previewRenderer={(file) => (
//     <div className="pdf-preview">
//       <PdfIcon />
//       <span>{file.file.name}</span>
//     </div>
//   )}
// />

// // 3. Multiple file upload with size limit
// <FileUploadComponent
//   maxSize={15}
//   onFilesChange={(files) => setAttachments(files)}
// />
