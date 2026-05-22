// import { useState } from 'react';
// import { Document, Page } from 'react-pdf';

// function PdfView({ pdfFile }) {
//     const [numPages, setNumPages] = useState();
//     const [pageNumber, setPageNumber] = useState(1);

//     function onDocumentLoadSuccess({ numPages }){
//         setNumPages(numPages);
//     }

//     return (
//         <div>
//             <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>

//                 <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />

//             </Document>
//             <p>
//                 Page {pageNumber} of {numPages}
//             </p>
//         </div>
//     );
// }

// export default PdfView;

import React, { useState } from "react"

const FileViewer = ({ fileUrl }) => {
  // Improved file type detection with URL parameter handling
  const isImageFile = url => {
    return /\.(jpeg|jpg|gif|png|bmp)(\?.*)?$/i.test(url)
  }

  const isDocumentFile = url => {
    return /\.(pdf|doc|docx)(\?.*)?$/i.test(url)
  }

  // Create a clean filename for display
  const getFileName = url => {
    if (!url) return ""
    return url.split("/").pop().split("?")[0]
  }

  return (
    <div>
      {isImageFile(fileUrl) && (
        <img
          src={fileUrl}
          alt={`Preview of ${getFileName(fileUrl)}`}
          style={{
            maxWidth: "100%",
            height: "auto",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
      )}

      {isDocumentFile(fileUrl) && (
        <div style={{ position: "relative", paddingTop: "56.25%" }}>
          <iframe
            src={`${fileUrl}#view=fitH`}
            title="Document Viewer"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "8px",
            }}
          />
        </div>
      )}

      {!isImageFile(fileUrl) && !isDocumentFile(fileUrl) && (
        <div
          style={{
            padding: "1rem",
            background: "#f8f9fa",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          <p>Unsupported file type: {getFileName(fileUrl)}</p>
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0066cc" }}
          >
            Download file
          </a>
        </div>
      )}
    </div>
  )
}

export default FileViewer
