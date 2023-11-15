import React, { useState } from "react";
import axios from "axios";
import ProjectsList from "./ProjectsList";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "./loadingSpinner/LoadingSpinner";

function Projects() {
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [project, setProjects] = useState("");
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsCreatingProject(true);
    try {
      const formData = new FormData();
      formData.append("thumbnail", thumbnail);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);

      const response = await axios.post(
        "http://malig.kodevana.com:8002/admin/create-projects",
        formData
      );

      if (response.data.success) {
        setMessage("Project created successfully.");
        toast.success("Project submitted successfully!", {
          autoClose: 2000, // Close the toast after 3 seconds
          position: "top-center",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);

        const newProject = response.data.project;
        setProjects((prevProjects) => [...prevProjects, newProject]);
        // Do not reload the entire page, handle success in the UI.
      } else {
        setMessage("An error occurred while creating the project.");
      }
    } catch (error) {
      setMessage("An error occurred while creating the project.");
      console.error("Error creating project:", error);
    } finally {
      setIsCreatingProject(false); // Reset loading state when creating the project is complete
    }
  };

  return (
    <>
      {isCreatingProject && <LoadingSpinner />}{" "}
      {/* Display the loading spinner */}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-3 ml-[10%]"
        onClick={goBack}
      >
        Back
      </button>
      <div className="flex ">
        <div className="flex  ml-[20%] ">
          <div className="mx-auto w-3/4 ml-5">
            <h2 className="text-xl">Create New Project</h2>
            <form onSubmit={handleFormSubmit} className="mt-5">
              <div>
                <div className="mt-5">
                  <label className="text-sm">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    name="thumbnail"
                    onChange={handleImage}
                    className="ml-5 border rounded px-3 py-2 mt-2 w-full"
                  />
                </div>
              </div>
              <img className="img-fluid" src={thumbnail} alt="" />
              <div className="mt-3">
                <label className="text-sm">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="ml-5 border rounded px-3 py-2 mt-2 w-full"
                />
              </div>
              <div className="mt-3">
                <label className="text-sm">Content:</label>
                <input
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="ml-5 border rounded px-3 py-2 mt-2 w-full"
                />
              </div>
              <div className="mt-3">
                <label className="text-sm">Category:</label>
                <div className="ml-5 mt-2">
                  <label className="mr-3">
                    <input
                      type="radio"
                      value="WEB"
                      checked={category === "WEB"}
                      onChange={(e) => setCategory(e.target.value)}
                      className="mr-1"
                    />
                    WEB
                  </label>
                  <label className="mr-3 ">
                    <input
                      type="radio"
                      value="APP"
                      checked={category === "APP"}
                      onChange={(e) => setCategory(e.target.value)}
                      className="mr-1"
                    />
                    APP
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="UX/UI"
                      checked={category === "UX/UI"}
                      onChange={(e) => setCategory(e.target.value)}
                      className="mr-1"
                    />
                    UX/UI
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-[10%]"
                disabled={isCreatingProject}
              >
                {isCreatingProject ? (
                  <>
                    <span><LoadingSpinner /></span> Submitting...
                  </>
                ) : (
                  "Create Project"
                )}
              </button>
            </form>
            {message && <p className="mt-3 text-green-500">{message}</p>}
          </div>
        </div>
        <div className="projectList ml-44 mx-auto">
          <ProjectsList />
        </div>
      </div>
    </>
  );
}

export default Projects;
