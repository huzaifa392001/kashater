import React, { useEffect, useRef } from "react"
import * as pdfjsLib from "pdfjs-dist"
import "pdfjs-dist/build/pdf.worker.entry"

const PDFViewer = ({ fileUrl }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const loadingTask = pdfjsLib.getDocument(fileUrl)

    loadingTask.promise.then(pdf => {
      pdf.getPage(1).then(page => {
        const viewport = page.getViewport({ scale: 1.5 })
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        canvas.height = viewport.height
        canvas.width = viewport.width

        page.render({
          canvasContext: context,
          viewport: viewport,
        })
      })
    })
  }, [fileUrl])

  return (
    <div style={{ textAlign: "center" }}>
      <canvas ref={canvasRef}></canvas>
      <p style={{ marginTop: "1rem", color: "#999" }}>
        Download and print disabled
      </p>
    </div>
  )
}

export default PDFViewer
