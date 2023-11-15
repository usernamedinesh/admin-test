import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling
import "react-resizable/css/styles.css";
import "../style.css";
import BlogTitles from "./BlogList";
import { useNavigate } from "react-router-dom";

import BlotFormatter from "quill-blot-formatter";

//import { useQuill } from "react-quilljs";
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/imageResize", ImageResize);

const Blog = () => {
  // const { quill, quillRef } = useQuill({
  //    modules: { blotFormatter: {} },
  // });

  // if (Quill && !quill) {
  //   Quill.register("modules/blotFormatter", BlotFormatter);

  // }

  const [title, setTitle] = useState("");
  const [editorHtml, setEditorHtml] = useState("");
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const postArticle = async () => {
    try {
      await axios.post("http://localhost:8002/admin/create-blog", {
        title,
        content: editorHtml,
      });
      console.log("Article posted successfully");
      toast.success("Article created!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTitle("");
      setEditorHtml("");
    } catch (error) {
      console.error("Error posting article:", error);
    }
  };

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ color: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: "1" }, { header: "2" }, { header: "3" }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      [{ script: "sub" }, { script: "super" }],
      ["link", "image", "video"],
      [{ align: [] }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  const formats = [
    "font",
    "color",
    "size",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "script",
    "link",
    "image",
    "video",
    "align",
  ];

  return (
    <>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-3 ml-[10%]"
          onClick={goBack}
        >
          Back
        </button>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-semibold mb-4 text-center">
            Wanna post blog!
          </h1>
          <div className="bg-white rounded p-4 mx-[25%] shadow">
            <h2 className="text-lg font-medium mb-2 text-center">
              Create Post
            </h2>
            <input
              className="w-full mb-4 px-3 py-2 border rounded"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <ReactQuill
              theme="snow"
              value={editorHtml}
              onChange={setEditorHtml}
              placeholder="Write your article..."
              modules={modules}
              formats={formats}
            />

            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4 ml-2"
              onClick={postArticle}
            >
              Post Article
            </button>
          </div>
        </div>
        <div>
          <BlogTitles />
        </div>
      </div>
    </>
  );
};

export default Blog;
