import React from "react"

import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"
import PropTypes from "prop-types"

const QuillDisplay = ({ content }) => {
  return (
    // <div className={classes["quill-display-container"]}>
    //   <div dangerouslySetInnerHTML={{ __html: content }} />
    // </div>
    <div className="ql-snow">
      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

QuillDisplay.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
}

export default QuillDisplay
