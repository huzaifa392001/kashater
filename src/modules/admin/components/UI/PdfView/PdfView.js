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

import React, { useState } from 'react';

const FileViewer = ({ fileUrl }) => {

    // Function to check if the file is an image
    const isImageFile = (url) => {
        return /\.(jpeg|jpg|gif|png|bmp)$/i.test(url);
    };

    // Function to check if the file is a document (e.g., PDF)
    const isDocumentFile = (url) => {
        return /\.(pdf|doc|docx)$/i.test(url);
    };


    return (
        <>

                <div>
                    {isImageFile(fileUrl) && (
                        <img
                            src={fileUrl}
                            alt="Image Preview"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    )}

                    {isDocumentFile(fileUrl) && (
                        <iframe
                            src={fileUrl}
                            title="Document Viewer"
                            width="100%"
                            height="600px"
                            frameBorder="0"
                        />
                    )}

                    {!isImageFile(fileUrl) && !isDocumentFile(fileUrl) && (
                        <p>Unsupported file type</p>
                    )}
                </div>
  
        </>
    );
};
export default FileViewer; 