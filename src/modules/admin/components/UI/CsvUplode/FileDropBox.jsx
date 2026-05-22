import React, { useState } from "react"
import { useDropzone } from "react-dropzone"
import { Box, Typography, IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

const FileDropBox = ({
  accept = { "text/csv": [".csv"] }, // ✅ default CSV
  //   accept={{ "application/pdf": [".pdf"] }}
  onFileSelect,
  onError, // ✅ send error outside instead of internal Alert
  title = "Upload file",
  subtitle = "or drag and drop it here",
  icon,
  width = "100%",
  close = true,
  maxSize = 10 * 1024 * 1024, // ✅ default 10MB
  sx = {},
}) => {
  const [selectedFile, setSelectedFile] = useState(null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple: false,
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0]
      if (file) {
        // ✅ validate extension dynamically
        const allowedExts = Object.values(accept).flat()
        const ext = "." + file.name.split(".").pop().toLowerCase()

        if (allowedExts.length && !allowedExts.includes(ext)) {
          onError?.(`Only ${allowedExts.join(", ")} files are allowed.`)
          return
        }

        // ✅ validate size
        if (file.size > maxSize) {
          onError?.(`File size must be under ${maxSize / 1024 / 1024} MB.`)
          return
        }

        onError?.("") // clear error
        setSelectedFile(file)
        onFileSelect?.(file)
      }
    },
    onDropRejected: () => {
      onError?.("Invalid file type or size.")
    },
  })

  const handleRemoveFile = () => {
    setSelectedFile(null)
    onError?.("")
    onFileSelect?.(null)
  }

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed #ccc",
        borderRadius: "10px",
        padding: "20px",
        textAlign: "center",
        backgroundColor: isDragActive ? "#f9f9f9" : "#fff",
        cursor: "pointer",
        width,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        ...sx,
      }}
    >
      <input {...getInputProps()} />

      {!selectedFile ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          {icon && (
            <img src={icon} alt="upload-icon" style={{ marginBottom: "6px" }} />
          )}
          <Typography variant="body1" fontWeight={600}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          bgcolor="#f5f5f5"
          p={1.5}
          borderRadius="8px"
        >
          <Box>
            <Typography fontWeight={600}>{selectedFile.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </Typography>
          </Box>
          {close && (
            <IconButton
              onClick={e => {
                e.stopPropagation()
                handleRemoveFile()
              }}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  )
}

export default FileDropBox

// import React, { useState } from "react"
// import { useDropzone } from "react-dropzone"
// import { Box, Typography, IconButton } from "@mui/material"
// import DeleteIcon from "@mui/icons-material/Delete"

// const FileDropBox = ({
//   accept = ".csv",
//   onFileSelect,
//   title = "Upload file",
//   subtitle = "or drag and drop it here",
//   icon,
//   width = "100%",
//   close,
// }) => {
//   const [selectedFile, setSelectedFile] = useState(null)

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept,
//     multiple: false,
//     onDrop: acceptedFiles => {
//       const file = acceptedFiles[0]
//       if (file) {
//         setSelectedFile(file)
//         onFileSelect?.(file) // still trigger parent callback
//       }
//     },
//   })

//   const handleRemoveFile = () => {
//     setSelectedFile(null)
//     onFileSelect?.(null) // reset in parent
//   }

//   return (
//     <Box
//       {...getRootProps()}
//       sx={{
//         border: "2px dashed #ccc",
//         borderRadius: "10px",
//         padding: "20px",
//         textAlign: "center",
//         backgroundColor: isDragActive ? "#f9f9f9" : "#fff",
//         cursor: "pointer",
//         width,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         flexDirection: "column",
//       }}
//     >
//       <input {...getInputProps()} />

//       {!selectedFile ? (
//         <Box display="flex" flexDirection="column" alignItems="center">
//           {icon && <img src={icon} alt="upload-icon" style={{ width: 40 }} />}
//           <Typography variant="body1" fontWeight={600}>
//             {title}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {subtitle}
//           </Typography>
//         </Box>
//       ) : (
//         <Box
//           display="flex"
//           alignItems="center"
//           justifyContent="space-between"
//           width="100%"
//           bgcolor="#f5f5f5"
//           p={1.5}
//           borderRadius="8px"
//         >
//           <Box>
//             <Typography fontWeight={600}>{selectedFile.name}</Typography>
//             <Typography variant="caption" color="text.secondary">
//               {(selectedFile.size / 1024).toFixed(2)} KB
//             </Typography>
//           </Box>
//           {close && (
//             <IconButton
//               onClick={e => {
//                 e.stopPropagation()
//                 handleRemoveFile()
//               }}
//               color="error"
//             >
//               <DeleteIcon />
//             </IconButton>
//           )}
//         </Box>
//       )}
//     </Box>
//   )
// }

// export default FileDropBox

// import React from "react"
// import { useDropzone } from "react-dropzone"
// import { Box } from "@mui/material"

// const FileDropBox = ({
//   accept = ".csv",
//   onFileSelect,
//   title = "Upload file",
//   subtitle = "or drag and drop it here",
//   icon,
//   width = "100%",
// }) => {
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept,
//     onDrop: acceptedFiles => {
//       const file = acceptedFiles[0]
//       if (file && onFileSelect) {
//         onFileSelect(file)
//       }
//     },
//   })

//   return (
//     <Box
//       {...getRootProps()}
//       sx={{
//         border: "2px dashed #ccc",
//         padding: "20px",
//         textAlign: "center",
//         backgroundColor: isDragActive ? "#f0f0f0" : "#fff",
//         cursor: "pointer",
//         width,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div>
//         <input {...getInputProps()} />
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           {icon && <img src={icon} alt="upload-icon" />}
//           <p style={{ fontWeight: 600 }}>{title}</p>
//           <p style={{ fontSize: "14px", color: "#666" }}>{subtitle}</p>
//         </div>
//       </div>
//     </Box>
//   )
// }

// export default FileDropBox
