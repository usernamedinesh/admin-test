import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UiDesign() {
    const [selectedAttachment, setSelectedAttachment] = useState(null);
  
    const initialState = {
      filename:"",
      imageId: "",
      thumbnail: "",
    };
  
    const [formData, setFormData] = useState(initialState);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        
      }));
    };
  
    const handleAttachmentChange = async (event) => {
      const file = event.target.files[0];
      setSelectedAttachment(file)
  
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            attachment: e.target.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    
  
    const handleSubmit = async (event) => {
      event.preventDefault();
        console.log(filename,thumbnail,imageId)
      try {
        const response = await axios.post(
          "http://malig.kodevana.com:8002/app/uidesign",
          formData
        );
  
        if (response.status === 201) {
          toast.success(" uploaded successfully!", {
            position: "top-center",
          });
          resetFormData();
          // Handle successful response
  
          console.log("ui uploaded successfully");
        } else {
          // Handle error response
          console.error("Failed to send message");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };
  
    const resetFormData = () => {
      setFormData(initialState);
    };
  
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-3 ml-[10%]"
        
      >
        Back
      </button>
      <div className="flex ">
        <div className="flex  ml-[20%] ">
          <div className="mx-auto w-3/4 ml-5">
            <h2 className="text-xl">Upoad here ui desings</h2>
            <form onSubmit={handleSubmit} className="contact-form">
                  <div className="input-wrap">
                    <input
                      type="text"
                      className="contact-input"
                      autoComplete="off"
                      name="filename"
                      value={formData.filename}
                      placeholder="."
                      required
                      onChange={handleInputChange}
                    />
                    <label htmlFor="filename">Filename</label>
                  </div>

                  <div className="input-wrap">
                    <input
                      type="text"
                      className="contact-input"
                      autoComplete="off"
                      name="imageId"
                      value={formData.imageId}
                      placeholder="."
                      required
                      onChange={handleInputChange}
                    />
                    <label htmlFor="imageId">ImageId</label>
                  </div>

                  
                 
                  <div className="contact-buttons">
                    <label
                      className={`btn1 upload ${
                        selectedAttachment ? "selected-button" : ""
                      }`}
                    >
                      <span>
                        {selectedAttachment
                          ? selectedAttachment.name
                          : "upload image"}
                      </span>
                      <input
                        type="file"
                        className="attachment"
                        onChange={handleAttachmentChange}
                      />
                    </label>
                    
                  </div>
                </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UiDesign;
