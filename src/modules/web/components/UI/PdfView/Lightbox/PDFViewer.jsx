import React, { useEffect, useRef } from "react"

const PDFViewer = ({ fileUrl }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    import("pdfjs-dist").then(async (pdfjsLib) => {
      const workerSrc = (await import("pdfjs-dist/build/pdf.worker.entry?url")).default
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc
      if (cancelled) return
      const loadingTask = pdfjsLib.getDocument(fileUrl)
      loadingTask.promise.then(pdf => {
        if (cancelled) return
        pdf.getPage(1).then(page => {
          if (cancelled) return
          const viewport = page.getViewport({ scale: 1.5 })
          const canvas = canvasRef.current
          if (!canvas) return
          const context = canvas.getContext("2d")
          canvas.height = viewport.height
          canvas.width = viewport.width
          page.render({ canvasContext: context, viewport })
        })
      })
    })
    return () => { cancelled = true }
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
