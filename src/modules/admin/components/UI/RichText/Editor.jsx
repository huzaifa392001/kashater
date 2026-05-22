// import React from "react"
// import { useQuill } from "react-quilljs"
// import EditorToolbar, { modules } from "./EditorToolbar"

// import classes from "./Editor.module.css"

// export const Editor = ({ onChange, value, placeholder }) => {
//   const { quill, quillRef } = useQuill({
//     modules,
//     placeholder: placeholder,
//     theme: "snow",
//   })

//   React.useEffect(() => {
//     if (!quill) return
//     const handleTextChange = () => {
//       const html = quill.root.innerHTML
//       if (typeof onChange === "function") onChange(html)
//     }
//     quill.on("text-change", handleTextChange)
//     return () => {
//       quill.off("text-change", handleTextChange)
//     }
//   }, [quill, onChange])

//   React.useEffect(() => {
//     if (!quill) return
//     if (typeof value === "string" && value !== quill.root.innerHTML) {
//       quill.root.innerHTML = value
//     }
//   }, [quill, value])

//   return (
//     <div className="text-editor">
//       <div className={classes.toolbar}>
//         <EditorToolbar />
//       </div>
//       <div className={classes.textarea_box}>
//         {/* <p className={classes.lable_text}>{label}</p> */}
//         <div ref={quillRef} />
//       </div>
//     </div>
//   )
// }

// export default Editor

// import React, { useMemo } from "react"
// import ReactQuill from "react-quill"
// import "react-quill/dist/quill.snow.css"
// import PropTypes from "prop-types"

// import classes from "./Editor.module.css"

// export const Editor = ({ onChange, value, placeholder }) => {
//   const modules = useMemo(
//     () => ({
//       toolbar: [
//         // [{ header: [1, 2, false] }],
//         ["bold", "italic", "underline", "strike"],
//         [{ list: "ordered" }, { list: "bullet" }],
//         // ["link", "image"],
//         ["clean"],
//       ],
//     }),
//     []
//   )

//   return (
//     <div className="text-editor">
//       <div className={classes.toolbar}></div>
//       <div className={classes.textarea_box}>
//         <ReactQuill
//           theme="snow"
//           value={value}
//           onChange={onChange}
//           modules={modules}
//           placeholder={placeholder}
//         />
//       </div>
//     </div>
//   )
// }

// Editor.propTypes = {
//   onChange: PropTypes.func.isRequired,
//   value: PropTypes.string,
//   placeholder: PropTypes.string,
// }

// export default Editor


// import React from "react";
// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline"; // For underline support
// import PropTypes from "prop-types";
// import classes from "./Editor.module.css";

// const Editor = ({ value, onChange, placeholder }) => {
//   const editor = useEditor({
//     extensions: [StarterKit, Underline],
//     content: value,
//     onUpdate: ({ editor }) => onChange(editor.getHTML()),
//   });

//   if (!editor) return null;

//   return (
//     <div className={classes.editorWrapper}>
//       {/* Toolbar */}
//       <div className={classes.toolbar}>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           className={editor.isActive("bold") ? classes.active : ""}
//         >
//           B
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           className={editor.isActive("italic") ? classes.active : ""}
//         >
//           I
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleUnderline().run()}
//           className={editor.isActive("underline") ? classes.active : ""}
//         >
//           U
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleStrike().run()}
//           className={editor.isActive("strike") ? classes.active : ""}
//         >
//           S
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           className={editor.isActive("bulletList") ? classes.active : ""}
//         >
//           • List
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           className={editor.isActive("orderedList") ? classes.active : ""}
//         >
//           1. List
//         </button>
//         <button type="button" onClick={() => editor.chain().focus().clearNodes().run()}>
//           Clear
//         </button>
//       </div>

//       {/* Editor */}
//       <div className={classes.textarea_box}>
//         <EditorContent editor={editor} placeholder={placeholder} />
//       </div>
//     </div>
//   );
// };

// Editor.propTypes = {
//   onChange: PropTypes.func.isRequired,
//   value: PropTypes.string,
//   placeholder: PropTypes.string,
// };

// export default Editor;


// import React, { useState } from "react";
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// const MyEditor = ({ value, onChange, placeholder }) => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());

//   // Optional: if you want to pass content outside
//   const handleEditorChange = (state) => {
//     setEditorState(state);
//     if (onChange) {
//       // Convert editorState to raw text or HTML if needed
//       onChange(state.getCurrentContent().getPlainText());
//     }
//   };

//   return (
//     <div style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "8px", minHeight: "200px" }}>
//       <Editor
//         editorState={editorState}
//         onEditorStateChange={handleEditorChange}
//         toolbar={{
//           options: ["inline", "list", "history"],
//           inline: {
//             options: ["bold", "italic", "underline", "strikethrough"],
//           },
//           list: {
//             options: ["unordered", "ordered"],
//           },
//           history: {
//             options: ["undo", "redo"],
//           },
//         }}
//         editorStyle={{ minHeight: "150px", padding: "10px" }}
//         placeholder={placeholder}
//       />
//     </div>
//   );
// };

// export default MyEditor;


import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import React, { useMemo } from "react";
import { Editor as PrimeEditor } from "primereact/editor";
import PropTypes from "prop-types";
import classes from "./Editor.module.css";

export const Editor = ({ value, onChange, placeholder }) => {
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
      ],
    }),
    []
  );

  return (
    <div className="text-editor">
      <div className={classes.textarea_box}>
        <PrimeEditor
          value={value}
          onTextChange={(e) => onChange(e.htmlValue)}
          style={{ height: "200px" }}
          placeholder={placeholder}
          modules={modules}
        />
      </div>
    </div>
  );
};

Editor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default Editor;

