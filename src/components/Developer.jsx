import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "./loadingSpinner/LoadingSpinner";
import UpdateDelEmp from "./UpdateDelEmp";

function AddDeveloper() {
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [skill, setSkill] = useState("");
  const [roles, setRoles] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!fullName || !profilePicture || !skill || roles.length === 0) {
      const mm = setErrorMessage("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("FullName", fullName);
    formData.append("profile_picture", profilePicture);
    formData.append("skill", skill);
    formData.append("roles", roles);
    formData.append("email", email);

    try {
      const response = await axios.post(
        "http://malig.kodevana.com:8002/admin/new-developer",
        formData
      );
      if (response.data.success) {
        setMessage("Developer added successfully.");
        toast.success("Added member successfully!", {
          autoClose: 2000, // Close the toast after 3 seconds
          position: "top-center",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setMessage("An error occurred while adding the developer.");
      }
    } catch (error) {
      setMessage("An error occurred while adding the developer.");
      console.error("Error adding developer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmitDisabled =
    !fullName || !profilePicture || !skill || roles.length === 0;

  return (
    <div>
       {isLoading && <LoadingSpinner />}{" "}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-3 ml-[10%]"
        onClick={goBack}
      >
        Back
      </button>
      <div className="flex">
      <div className="mx-auto  mt-5 w-1/2 text-2xl font-semibold mb-4">
        <h1 className="ml-[23%]">Add Developer</h1>

        {errorMessage && !isLoading && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            {errorMessage}
          </div>
        )}

        {message && !isLoading && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="mt-5">
        <div className="grid gap-6 mb-6 md:grid-cols-1 ml-[20%]">

          <div className="">
            <label className="text-xl block">Enter Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[67%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
          </div>

          <div className="">
            <label className="block text-xl">Profile Picture</label>
            <input
              type="file"
              name="profile_picture"
              accept="image/*"
              onChange={handleFileChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[67%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
          </div>

          <div className="">
            <label className="text-xl block">Skill</label>
            <input
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[67%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
          </div>

          <div className="">
            <label className="block text-xl">Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[67%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
          </div>

          <div className="">
            <label className="block text-xl">Roles:</label>
            <input
              type="text"
              value={roles}
              onChange={(e) => setRoles(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[67%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
          </div>
          </div>

          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 ml-[30%]`}
            disabled={isLoading || isSubmitDisabled}
          >
            {/* {isLoading ? 'submitting...' : 'Submit'}
        </button> */}
            {isLoading ? (
              <>
                <span>
                  <LoadingSpinner />
                </span>{" "}
                Submitting...
              </>
            ) : (
              "Submit Form"
            )}
          </button>
        </form>
      </div>
      <div className="w-1/2">

      <UpdateDelEmp />
      </div>
      </div>
    </div>
  );
}

export default AddDeveloper;
