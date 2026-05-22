// src/pages/ServiceRequestsPage.jsx
import React from "react"
import { FileUploadComponent } from "../components/FileUploadComponent"

const ServiceRequestsPage = () => {
  const handleServiceFiles = files => {
    console.log("Service request files:", files)
    // Different handling for service requests
  }

  return (
    <div className="page-container">
      <h2>Upload Service Documents</h2>
      <FileUploadComponent
        onFilesUpload={handleServiceFiles}
        additionalText="Upload PDF reports or supporting documents"
      />
    </div>
  )
}

export default ServiceRequestsPage
