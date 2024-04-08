"use client";

import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "./TextEditor.css";

const TextEditor = ({ editorState, setEditorState }) => {
  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        placeholder="Type Something ..."
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
      />
      {/* <div>{text}</div> */}
    </div>
  );
};

export default TextEditor;
