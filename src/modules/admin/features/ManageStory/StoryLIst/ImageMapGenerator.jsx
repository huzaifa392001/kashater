// import React, { useRef, useState, useEffect } from "react"
// import styles from "./ImageMapGenerator.module.css"

// export function scaleCoordinatesToOriginal(
//   coords,
//   displayWidth,
//   displayHeight,
//   naturalWidth,
//   naturalHeight
// ) {
//   if (!displayWidth || !displayHeight || !naturalWidth || !naturalHeight)
//     return null

//   const scaleX = naturalWidth / displayWidth
//   const scaleY = naturalHeight / displayHeight

//   const [x1, y1, x2, y2] = coords
//   return {
//     x1: Math.round(x1 * scaleX),
//     y1: Math.round(y1 * scaleY),
//     x2: Math.round(x2 * scaleX),
//     y2: Math.round(y2 * scaleY),
//   }
// }

// export default function ImageMapGenerator({
//   img,
//   setAllSize,
//   allSize,
//   defaultCoords,
// }) {
//   const [areas, setAreas] = useState([])
//   const [currentShape] = useState("rect")
//   const [drawing, setDrawing] = useState(false)
//   const [points, setPoints] = useState([])
//   const [overlayData, setOverlayData] = useState(null)
//   const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 })
//   const [selectedIndex, setSelectedIndex] = useState(null)
//   const [dragging, setDragging] = useState(false)
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
//   const [resizingHandle, setResizingHandle] = useState(null)

//   const imageRef = useRef(null)

//   useEffect(() => {
//     const imgEl = imageRef.current
//     if (!imgEl) return

//     const updateSize = () => {
//       const naturalWidth = imgEl.naturalWidth
//       const naturalHeight = imgEl.naturalHeight
//       const displayWidth = imgEl.clientWidth
//       const displayHeight = imgEl.clientHeight

//       if (naturalWidth && naturalHeight && displayWidth && displayHeight) {
//         setAllSize(prev => ({
//           ...prev,
//           naturalWidth,
//           naturalHeight,
//           displayWidth,
//           displayHeight,
//         }))
//       }
//     }

//     if (imgEl.complete) {
//       updateSize()
//     } else {
//       imgEl.onload = updateSize
//     }
//   }, [img, setAllSize])

//   useEffect(() => {
//     if (
//       defaultCoords &&
//       defaultCoords.x1 !== undefined &&
//       defaultCoords.y1 !== undefined &&
//       defaultCoords.x2 !== undefined &&
//       defaultCoords.y2 !== undefined &&
//       areas.length === 0
//     ) {
//       const coords = [
//         defaultCoords.x1,
//         defaultCoords.y1,
//         defaultCoords.x2,
//         defaultCoords.y2,
//       ]
//       setAreas([
//         {
//           shape: "rect",
//           coords,
//           href: "#",
//           title: "Hot Area",
//           target: "_self",
//         },
//       ])
//       setSelectedIndex(0)
//       updateCoords(
//         defaultCoords.x1,
//         defaultCoords.y1,
//         defaultCoords.x2,
//         defaultCoords.y2
//       )
//     }
//   }, [defaultCoords])

//   const getRelativeCoords = e => {
//     const rect = imageRef.current.getBoundingClientRect()
//     return {
//       x: Math.round(e.clientX - rect.left),
//       y: Math.round(e.clientY - rect.top),
//     }
//   }

//   const updateCoords = (x1, y1, x2, y2) => {
//     const width = Math.abs(x2 - x1)
//     const height = Math.abs(y2 - y1)

//     const imgEl = imageRef.current
//     const naturalWidth = imgEl.naturalWidth
//     const naturalHeight = imgEl.naturalHeight
//     const displayWidth = imgEl.clientWidth
//     const displayHeight = imgEl.clientHeight

//     setAllSize({
//       x1,
//       y1,
//       x2,
//       y2,
//       width,
//       height,
//       naturalWidth,
//       naturalHeight,
//       displayWidth,
//       displayHeight,
//     })
//   }

//   const handleWrapperMouseDown = e => {
//     if (e.target === e.currentTarget) setSelectedIndex(null)
//     const { x, y } = getRelativeCoords(e)
//     if (!drawing && currentShape === "rect" && areas.length === 0) {
//       setDrawing(true)
//       setPoints([{ x, y }])
//     }
//   }

//   const handleMouseDownOnShape = (index, e) => {
//     e.stopPropagation()
//     setSelectedIndex(index)
//     const { x, y } = getRelativeCoords(e)
//     const coords = areas[index].coords
//     const offsetX = x - Math.min(coords[0], coords[2])
//     const offsetY = y - Math.min(coords[1], coords[3])
//     setDragOffset({ x: offsetX, y: offsetY })
//     setDragging(true)
//   }

//   const handleMouseDownOnHandle = (handle, e) => {
//     e.stopPropagation()
//     setResizingHandle(handle)
//   }

//   const handleMouseMove = e => {
//     const coords = getRelativeCoords(e)
//     setLastMouse(coords)

//     if (resizingHandle && selectedIndex !== null) {
//       setAreas(prev => {
//         const updated = [...prev]
//         let [x1, y1, x2, y2] = updated[selectedIndex].coords
//         if (x1 > x2) [x1, x2] = [x2, x1]
//         if (y1 > y2) [y1, y2] = [y2, y1]

//         switch (resizingHandle) {
//           case "tl":
//             x1 = coords.x
//             y1 = coords.y
//             break
//           case "tr":
//             x2 = coords.x
//             y1 = coords.y
//             break
//           case "bl":
//             x1 = coords.x
//             y2 = coords.y
//             break
//           case "br":
//             x2 = coords.x
//             y2 = coords.y
//             break
//           case "t":
//             y1 = coords.y
//             break
//           case "b":
//             y2 = coords.y
//             break
//           case "l":
//             x1 = coords.x
//             break
//           case "r":
//             x2 = coords.x
//             break
//         }

//         updated[selectedIndex].coords = [x1, y1, x2, y2]
//         updateCoords(x1, y1, x2, y2)
//         return updated
//       })
//       return
//     }

//     if (dragging && selectedIndex !== null) {
//       const dx = coords.x - dragOffset.x
//       const dy = coords.y - dragOffset.y

//       setAreas(prev => {
//         const updated = [...prev]
//         const area = updated[selectedIndex]
//         const width = Math.abs(area.coords[2] - area.coords[0])
//         const height = Math.abs(area.coords[3] - area.coords[1])
//         const x1 = dx,
//           y1 = dy,
//           x2 = dx + width,
//           y2 = dy + height

//         updated[selectedIndex] = {
//           ...area,
//           coords: [x1, y1, x2, y2],
//         }
//         updateCoords(x1, y1, x2, y2)
//         return updated
//       })
//       return
//     }

//     if (!drawing || points.length !== 1) return
//     const [start] = points
//     const x1 = Math.min(start.x, coords.x)
//     const y1 = Math.min(start.y, coords.y)
//     const x2 = Math.max(start.x, coords.x)
//     const y2 = Math.max(start.y, coords.y)
//     setOverlayData({ x1, y1, x2, y2, width: x2 - x1, height: y2 - y1 })
//   }

//   const handleMouseUp = () => {
//     setDragging(false)
//     setResizingHandle(null)

//     if (!drawing) return
//     setDrawing(false)

//     if (points.length === 1) {
//       const [start] = points
//       const { x } = lastMouse
//       const { y } = lastMouse
//       const coords = [start.x, start.y, x, y]

//       const x1 = Math.min(start.x, x)
//       const y1 = Math.min(start.y, y)
//       const x2 = Math.max(start.x, x)
//       const y2 = Math.max(start.y, y)

//       addNewArea("rect", coords)
//       updateCoords(x1, y1, x2, y2)
//       setPoints([])
//       setOverlayData(null)
//     }
//   }

//   const addNewArea = (shape, coords) => {
//     const href = "#"
//     const title = "Hot Area"
//     const target = "_self"
//     setAreas([{ shape, coords, href, title, target }])
//     setSelectedIndex(0)
//   }

//   const renderHandles = (x1, y1, x2, y2) => {
//     const cx = (x1 + x2) / 2
//     const cy = (y1 + y2) / 2
//     const size = 8
//     const style = {
//       position: "absolute",
//       width: size,
//       height: size,
//       backgroundColor: "white",
//       border: "1px solid black",
//       zIndex: 10,
//     }

//     return (
//       <>
//         {"tl,tr,bl,br,t,b,l,r".split(",").map(handle => {
//           const positions = {
//             tl: { left: x1, top: y1 },
//             tr: { left: x2, top: y1 },
//             bl: { left: x1, top: y2 },
//             br: { left: x2, top: y2 },
//             t: { left: cx, top: y1 },
//             b: { left: cx, top: y2 },
//             l: { left: x1, top: cy },
//             r: { left: x2, top: cy },
//           }
//           const cursors = {
//             tl: "nwse-resize",
//             tr: "nesw-resize",
//             bl: "nesw-resize",
//             br: "nwse-resize",
//             t: "ns-resize",
//             b: "ns-resize",
//             l: "ew-resize",
//             r: "ew-resize",
//           }
//           return (
//             <div
//               key={handle}
//               style={{
//                 ...style,
//                 left: positions[handle].left - size / 2,
//                 top: positions[handle].top - size / 2,
//                 cursor: cursors[handle],
//               }}
//               onMouseDown={e => handleMouseDownOnHandle(handle, e)}
//             />
//           )
//         })}
//       </>
//     )
//   }

//   return (
//     <div className={styles.container}>
//       <div
//         className={styles.imageWrapper}
//         onMouseDown={handleWrapperMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//       >
//         <img
//           ref={imageRef}
//           src={img}
//           alt="Map"
//           className={styles.mapImage}
//           style={{ display: "block" }}
//         />

//         {drawing && overlayData && (
//           <div
//             className={styles.liveRect}
//             style={{
//               left: overlayData.x1,
//               top: overlayData.y1,
//               width: overlayData.width,
//               height: overlayData.height,
//             }}
//           />
//         )}

//         {areas.map((area, index) => {
//           const [x1, y1, x2, y2] = area.coords
//           const left = Math.min(x1, x2)
//           const top = Math.min(y1, y2)
//           const width = Math.abs(x2 - x1)
//           const height = Math.abs(y2 - y1)

//           return (
//             <React.Fragment key={index}>
//               <div
//                 onMouseDown={e => handleMouseDownOnShape(index, e)}
//                 style={{
//                   position: "absolute",
//                   left,
//                   top,
//                   width,
//                   height,
//                   border:
//                     selectedIndex === index
//                       ? "2px solid blue"
//                       : "1px dashed red",
//                   cursor: "move",
//                   background: "#ffffff40",
//                 }}
//               />
//               {selectedIndex === index && renderHandles(x1, y1, x2, y2)}
//               {selectedIndex === index && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     left: left + width - 5,
//                     top: top - 28,
//                     zIndex: 15,
//                     cursor: "pointer",
//                     backgroundColor: "white",
//                     border: "1px solid #aaa",
//                     padding: "2px 4px",
//                     fontSize: 12,
//                   }}
//                   onClick={() => {
//                     setAreas([])
//                     setSelectedIndex(null)
//                     setOverlayData(null)
//                     setAllSize(null)
//                   }}
//                 >
//                   ✕
//                 </div>
//               )}
//             </React.Fragment>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

import React, { useRef, useState, useEffect } from "react"
import styles from "./ImageMapGenerator.module.css"

export function scaleCoordinatesToOriginal(
  coords,
  displayWidth,
  displayHeight,
  naturalWidth,
  naturalHeight
) {
  if (!displayWidth || !displayHeight || !naturalWidth || !naturalHeight)
    return null

  const scaleX = naturalWidth / displayWidth
  const scaleY = naturalHeight / displayHeight

  const [x1, y1, x2, y2] = coords
  return {
    x1: Math.round(x1 * scaleX),
    y1: Math.round(y1 * scaleY),
    x2: Math.round(x2 * scaleX),
    y2: Math.round(y2 * scaleY),
  }
}

export default function ImageMapGenerator({
  img,
  setAllSize,
  allSize,
  defaultCoords,
}) {
  const [areas, setAreas] = useState([])
  const [drawing, setDrawing] = useState(false)
  const [points, setPoints] = useState([])
  const [overlayData, setOverlayData] = useState(null)
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 })
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizingHandle, setResizingHandle] = useState(null)

  const imageRef = useRef(null)

  useEffect(() => {
    const imgEl = imageRef.current
    if (!imgEl) return

    const updateSize = () => {
      setAllSize(prev => ({
        ...prev,
        naturalWidth: imgEl.naturalWidth,
        naturalHeight: imgEl.naturalHeight,
        displayWidth: imgEl.clientWidth,
        displayHeight: imgEl.clientHeight,
      }))
    }

    if (imgEl.complete) updateSize()
    else imgEl.onload = updateSize
  }, [img, setAllSize])

  useEffect(() => {
    if (
      defaultCoords &&
      areas.length === 0 &&
      defaultCoords.x1 !== undefined &&
      defaultCoords.y1 !== undefined
    ) {
      const coords = [
        defaultCoords.x1,
        defaultCoords.y1,
        defaultCoords.x2,
        defaultCoords.y2,
      ]
      setAreas([
        {
          shape: "rect",
          coords,
          href: "#",
          title: "Hot Area",
          target: "_self",
        },
      ])
      setSelectedIndex(0)
      updateCoords(...coords)
    }
  }, [defaultCoords])

  useEffect(() => {
    const handleKey = e => {
      if (e.key === "Escape") {
        setDrawing(false)
        setPoints([])
        setOverlayData(null)
      }
      if (e.key === "Delete" && selectedIndex !== null) {
        setAreas([])
        setSelectedIndex(null)
        setOverlayData(null)
        setAllSize(null)
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [selectedIndex])

  const getRelativeCoords = e => {
    const rect = imageRef.current.getBoundingClientRect()
    return {
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    }
  }

  const updateCoords = (x1, y1, x2, y2) => {
    const imgEl = imageRef.current
    if (!imgEl) return
    setAllSize({
      x1,
      y1,
      x2,
      y2,
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1),
      naturalWidth: imgEl.naturalWidth,
      naturalHeight: imgEl.naturalHeight,
      displayWidth: imgEl.clientWidth,
      displayHeight: imgEl.clientHeight,
    })
  }

  const handleWrapperMouseDown = e => {
    if (e.target === e.currentTarget) setSelectedIndex(null)
    if (!drawing && areas.length === 0) {
      const { x, y } = getRelativeCoords(e)
      setDrawing(true)
      setPoints([{ x, y }])
    }
  }

  const handleMouseDownOnShape = (index, e) => {
    e.stopPropagation()
    setSelectedIndex(index)
    const { x, y } = getRelativeCoords(e)
    const coords = areas[index].coords
    setDragOffset({
      x: x - Math.min(coords[0], coords[2]),
      y: y - Math.min(coords[1], coords[3]),
    })
    setDragging(true)
  }

  const handleMouseDownOnHandle = (handle, e) => {
    e.stopPropagation()
    setResizingHandle(handle)
  }

  const handleMouseMove = e => {
    const coords = getRelativeCoords(e)
    setLastMouse(coords)

    if (resizingHandle !== null && selectedIndex !== null) {
      setAreas(prev => {
        const updated = [...prev]
        let [x1, y1, x2, y2] = updated[selectedIndex].coords
        if (x1 > x2) [x1, x2] = [x2, x1]
        if (y1 > y2) [y1, y2] = [y2, y1]
        switch (resizingHandle) {
          case "tl":
            x1 = coords.x
            y1 = coords.y
            break
          case "tr":
            x2 = coords.x
            y1 = coords.y
            break
          case "bl":
            x1 = coords.x
            y2 = coords.y
            break
          case "br":
            x2 = coords.x
            y2 = coords.y
            break
          case "t":
            y1 = coords.y
            break
          case "b":
            y2 = coords.y
            break
          case "l":
            x1 = coords.x
            break
          case "r":
            x2 = coords.x
            break
        }
        updated[selectedIndex].coords = [x1, y1, x2, y2]
        updateCoords(x1, y1, x2, y2)
        return updated
      })
      return
    }

    if (dragging && selectedIndex !== null) {
      const dx = coords.x - dragOffset.x
      const dy = coords.y - dragOffset.y
      const area = areas[selectedIndex]
      const w = Math.abs(area.coords[2] - area.coords[0])
      const h = Math.abs(area.coords[3] - area.coords[1])
      const updatedCoords = [dx, dy, dx + w, dy + h]
      setAreas(prev => {
        const updated = [...prev]
        updated[selectedIndex].coords = updatedCoords
        updateCoords(...updatedCoords)
        return updated
      })
      return
    }

    if (drawing && points.length === 1) {
      const [start] = points
      const x1 = Math.min(start.x, coords.x)
      const y1 = Math.min(start.y, coords.y)
      const x2 = Math.max(start.x, coords.x)
      const y2 = Math.max(start.y, coords.y)
      setOverlayData({ x1, y1, x2, y2, width: x2 - x1, height: y2 - y1 })
    }
  }

  const handleMouseUp = () => {
    setDragging(false)
    setResizingHandle(null)

    if (!drawing) return
    setDrawing(false)

    if (points.length === 1) {
      const [start] = points
      const { x, y } = lastMouse
      const x1 = Math.min(start.x, x)
      const y1 = Math.min(start.y, y)
      const x2 = Math.max(start.x, x)
      const y2 = Math.max(start.y, y)

      if (Math.abs(x2 - x1) < 10 || Math.abs(y2 - y1) < 10) {
        setOverlayData(null)
        setPoints([])
        return
      }

      setAreas([
        {
          shape: "rect",
          coords: [x1, y1, x2, y2],
          href: "#",
          title: "Hot Area",
          target: "_self",
        },
      ])
      setSelectedIndex(0)
      updateCoords(x1, y1, x2, y2)
      setPoints([])
      setOverlayData(null)
    }
  }

  const renderHandles = (x1, y1, x2, y2) => {
    const cx = (x1 + x2) / 2
    const cy = (y1 + y2) / 2
    const size = 12
    const style = {
      position: "absolute",
      width: size,
      height: size,
      backgroundColor: "white",
      border: "1px solid black",
      zIndex: 10,
    }
    return (
      <>
        {["tl", "tr", "bl", "br", "t", "b", "l", "r"].map(handle => {
          const pos = {
            tl: { left: x1, top: y1 },
            tr: { left: x2, top: y1 },
            bl: { left: x1, top: y2 },
            br: { left: x2, top: y2 },
            t: { left: cx, top: y1 },
            b: { left: cx, top: y2 },
            l: { left: x1, top: cy },
            r: { left: x2, top: cy },
          }
          const cursors = {
            tl: "nwse-resize",
            tr: "nesw-resize",
            bl: "nesw-resize",
            br: "nwse-resize",
            t: "ns-resize",
            b: "ns-resize",
            l: "ew-resize",
            r: "ew-resize",
          }
          return (
            <div
              key={handle}
              title={`Resize ${handle}`}
              onMouseDown={e => handleMouseDownOnHandle(handle, e)}
              style={{
                ...style,
                left: pos[handle].left - size / 2,
                top: pos[handle].top - size / 2,
                cursor: cursors[handle],
              }}
            />
          )
        })}
      </>
    )
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.imageWrapper} ${
          drawing ? styles.drawingMode : ""
        }`}
        onMouseDown={handleWrapperMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <img ref={imageRef} src={img} alt="Map" className={styles.mapImage} />

        {drawing && overlayData && (
          <>
            <div
              className={styles.liveRect}
              style={{
                left: overlayData.x1,
                top: overlayData.y1,
                width: overlayData.width,
                height: overlayData.height,
              }}
            />
            <div
              className={styles.tooltip}
              style={{
                left: overlayData.x1,
                top: overlayData.y1 - 28,
              }}
            >
              {overlayData.width} × {overlayData.height}
            </div>
          </>
        )}

        {areas.length === 0 && !drawing && (
          <div className={styles.hint}>
            Click and drag to draw a selection area
          </div>
        )}

        {areas.map((area, index) => {
          const [x1, y1, x2, y2] = area.coords
          const left = Math.min(x1, x2)
          const top = Math.min(y1, y2)
          const width = Math.abs(x2 - x1)
          const height = Math.abs(y2 - y1)
          return (
            <React.Fragment key={index}>
              <div
                onMouseDown={e => handleMouseDownOnShape(index, e)}
                style={{
                  position: "absolute",
                  left,
                  top,
                  width,
                  height,
                  border:
                    selectedIndex === index
                      ? "2px solid blue"
                      : "1px dashed red",
                  background: "#ffffff40",
                  cursor: "move",
                }}
              />
              {selectedIndex === index && renderHandles(x1, y1, x2, y2)}
              {selectedIndex === index && (
                <div
                  style={{
                    position: "absolute",
                    left: left + width - 5,
                    top: top - 28,
                    zIndex: 15,
                    cursor: "pointer",
                    backgroundColor: "white",
                    border: "1px solid #aaa",
                    padding: "2px 4px",
                    fontSize: 12,
                  }}
                  onClick={() => {
                    setAreas([])
                    setSelectedIndex(null)
                    setOverlayData(null)
                    setAllSize(null)
                  }}
                >
                  ✕
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
