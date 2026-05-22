import React, { useEffect, useState } from "react"

const ScreenshotProtection = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Disable right-click
    const disableRightClick = e => e.preventDefault()

    // Disable common keyboard shortcuts (Windows & Mac)
    const disableShortcuts = e => {
      // Windows
      if (
        e.key === "F12" || // Dev Tools
        (e.ctrlKey && e.shiftKey && ["I", "J"].includes(e.key)) ||
        (e.ctrlKey && ["u", "p", "s"].includes(e.key))
      ) {
        e.preventDefault()
      }

      // macOS
      if (
        e.metaKey && // Cmd
        e.shiftKey &&
        ["3", "4", "5", "6"].includes(e.key)
      ) {
        e.preventDefault()
      }

      // Cmd + U (View source)
      if (e.metaKey && e.key.toLowerCase() === "u") {
        e.preventDefault()
      }

      // Cmd + P (Print)
      if (e.metaKey && e.key.toLowerCase() === "p") {
        e.preventDefault()
      }

      // Cmd + S (Save)
      if (e.metaKey && e.key.toLowerCase() === "s") {
        e.preventDefault()
      }
    }

    // Detect tab visibility
    const handleVisibilityChange = () => setIsVisible(!document.hidden)

    document.addEventListener("contextmenu", disableRightClick)
    document.addEventListener("keydown", disableShortcuts)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("contextmenu", disableRightClick)
      document.removeEventListener("keydown", disableShortcuts)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  const containerStyles = { position: "relative" }
  const overlayStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none", // children still work
    backdropFilter: isVisible ? "none" : "blur(10px)",
    backgroundColor: isVisible ? "transparent" : "rgba(255,255,255,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    color: "#666",
    transition: "0.3s",
  }

  return <div style={containerStyles}>{children}</div>
}

export default ScreenshotProtection

// import React, { useEffect, useState } from "react"

// const ScreenshotProtection = ({ children, visibility = true }) => {
//   const [isVisible, setIsVisible] = useState(true)
//   const isMobileWidth = window.innerWidth <= 650
//   console.log(isMobileWidth)
//   useEffect(() => {
//     // Detect developer tools opening

//     // Disable right-click context menu
//     const disableRightClick = e => {
//       e.preventDefault()
//       return false
//     }

//     // Disable common keyboard shortcuts
//     const disableShortcuts = e => {
//       // Disable F12 (Dev Tools)
//       if (e.key === "F12") {
//         e.preventDefault()
//         return false
//       }

//       // Disable Ctrl+Shift+I (Dev Tools)
//       if (e.ctrlKey && e.shiftKey && e.key === "I") {
//         e.preventDefault()
//         return false
//       }
//       if (e.metaKey && e.shiftKey && e.key === "3") {
//         e.preventDefault()
//         // showWarning("Full screen screenshot blocked");
//         return false
//       }

//       // Cmd + Shift + 4 (Selection screenshot)
//       if (e.metaKey && e.shiftKey && e.key === "4") {
//         e.preventDefault()
//         // showWarning("Selection screenshot blocked");
//         return false
//       }

//       // Cmd + Shift + 5 (Screenshot options)
//       if (e.metaKey && e.shiftKey && e.key === "5") {
//         e.preventDefault()
//         // showWarning("Screenshot options blocked");
//         return false
//       }

//       // Cmd + Shift + 6 (Touch Bar screenshot - if applicable)
//       if (e.metaKey && e.shiftKey && e.key === "6") {
//         e.preventDefault()
//         // showWarning("Touch Bar screenshot blocked");
//         return false
//       }
//       // Disable Ctrl+Shift+J (Console)
//       if (e.ctrlKey && e.shiftKey && e.key === "J") {
//         e.preventDefault()
//         return false
//       }

//       // Disable Ctrl+U (View Source)
//       if (e.ctrlKey && e.key === "u") {
//         e.preventDefault()
//         return false
//       }

//       // Disable Print Screen
//       if (e.key === "PrintScreen") {
//         e.preventDefault()
//         return false
//       }

//       // Disable Ctrl+P (Print)
//       if (e.ctrlKey && e.key === "p") {
//         e.preventDefault()
//         return false
//       }

//       if (e.metaKey) {
//         e.preventDefault()
//         return false
//       }
//       if (e.metaKey && e.key === "p") {
//         e.preventDefault()
//         return false
//       }

//       // Disable Ctrl+S (Save)
//       if (e.ctrlKey && e.key === "s") {
//         e.preventDefault()
//         return false
//       }
//     }

//     // Blur content when window loses focus (potential screenshot)
//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         setIsVisible(false)
//       } else {
//         setIsVisible(true)
//       }
//     }

//     // Add event listeners
//     document.addEventListener("contextmenu", disableRightClick)
//     document.addEventListener("keydown", disableShortcuts)

//     // Check for dev tools periodically
//     if (!isMobileWidth) {
//       const detectDevTools = () => {
//         const threshold = 160
//         if (
//           window.outerHeight - window.innerHeight > threshold ||
//           window.outerWidth - window.innerWidth > threshold
//         ) {
//           setIsVisible(false)
//         } else {
//           setIsVisible(true)
//         }
//       }

//       const interval = setInterval(detectDevTools, 500)
//       document.addEventListener("visibilitychange", handleVisibilityChange)

//       return () => {
//         document.removeEventListener("visibilitychange", handleVisibilityChange)
//         clearInterval(interval)
//       }
//     }

//     // Cleanup
//     return () => {
//       document.removeEventListener("contextmenu", disableRightClick)
//       document.removeEventListener("keydown", disableShortcuts)
//     }
//   }, [])

//   const protectionStyles = {
//     userSelect: "none",
//     WebkitUserSelect: "none",
//     MozUserSelect: "none",
//     msUserSelect: "none",
//     WebkitTouchCallout: "none",
//     WebkitTapHighlightColor: "transparent",
//     pointerEvents: isVisible ? "auto" : "none",
//     filter: isVisible ? "none" : "blur(10px)",
//     transition: "filter 0.3s ease",

//     /* Try to detect print screen attempts */
//   }

//   return (
//     <div style={protectionStyles}>
//       {isVisible ? (
//         children
//       ) : (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100vh",
//             fontSize: "24px",
//             color: "#666",
//           }}
//         >
//           Content Protected
//         </div>
//       )}
//     </div>
//   )
// }

// export default ScreenshotProtection

// import React, { useEffect, useState } from "react"

// const ScreenshotProtection = ({ children }) => {
//   const [isVisible, setIsVisible] = useState(true)

//   useEffect(() => {
//     // Disable right-click
//     const disableRightClick = e => e.preventDefault()

//     // Disable keyboard shortcuts
//     const disableShortcuts = e => {
//       if (
//         e.key === "F12" ||
//         (e.ctrlKey && e.shiftKey && ["I", "J"].includes(e.key)) ||
//         (e.ctrlKey && ["u", "p", "s"].includes(e.key)) ||
//         e.metaKey
//       ) {
//         e.preventDefault()
//       }
//     }

//     // Detect tab visibility
//     const handleVisibilityChange = () => setIsVisible(!document.hidden)

//     document.addEventListener("contextmenu", disableRightClick)
//     document.addEventListener("keydown", disableShortcuts)
//     document.addEventListener("visibilitychange", handleVisibilityChange)

//     return () => {
//       document.removeEventListener("contextmenu", disableRightClick)
//       document.removeEventListener("keydown", disableShortcuts)
//       document.removeEventListener("visibilitychange", handleVisibilityChange)
//     }
//   }, [])

//   const containerStyles = { position: "relative" }
//   const overlayStyles = {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     pointerEvents: "none", // so children still work
//     backdropFilter: isVisible ? "none" : "blur(10px)",
//     backgroundColor: isVisible ? "transparent" : "rgba(255,255,255,0.7)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontSize: "24px",
//     color: "#666",
//     transition: "0.3s",
//   }

//   return (
//     <div style={containerStyles}>
//       {children}
//       <div style={overlayStyles}>Content Protected</div>
//     </div>
//   )
// }

// export default ScreenshotProtection
