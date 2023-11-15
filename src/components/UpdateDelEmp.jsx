import React, { useState, useEffect } from "react";
import axios from "axios";

const DeveloperManagement = () => {
  const [developers, setDevelopers] = useState([]);
  const [message, setMessage] = useState("");
  const [editingDeveloperId, setEditingDeveloperId] = useState(null);
  const [updatedRoles, setUpdatedRoles] = useState("");
  const [updatedSkill, setUpdatedSkill] = useState("");
  const [updatedProfilePicture, setUpdatedProfilePicture] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    try {
      const response = await axios.get(
        "http://malig.kodevana.com:8002/admin/get-all-dev"
      );
      setDevelopers(response.data);
    } catch (error) {
      console.error("Error fetching developers:", error);
    }
  };

  const handleUpdate = async (developerId) => {

  const formData = new FormData();
    formData.append('roles', updatedRoles);
    formData.append('skill', updatedSkill);
    formData.append('profile_picture', updatedProfilePicture);
    formData.append('name', updatedName)
    formData.append('email', updatedEmail);

    try {
      const response = await axios.put(
        `http://malig.kodevana.com:8002/admin/update-dev/${developerId}`,formData
        
      );
      
      if (response.data.data) {
        setMessage("Developer updated successfully");
        fetchDevelopers();
        setEditingDeveloperId(null);
        setUpdatedRoles("");
        setUpdatedSkill("");
        setUpdatedEmail("");
        setUpdatedName("");
        setUpdatedProfilePicture("");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Failed to update developer");
    }
  };

  const handleCancel = () => {
    setEditingDeveloperId(null);
    setUpdatedRoles("");
    setUpdatedSkill("");
    setUpdatedProfilePicture("");
    setUpdatedName("");
    setUpdatedEmail("");
  };

  const handleDelete = async (developerId) => {
    try {
      const response = await axios.delete(
        `http://malig.kodevana.com:8002/admin/delete-developer/${developerId}`
      );

      if (response.data.data) {
        setMessage("Developer deleted successfully");
        fetchDevelopers();
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Failed to delete developer");
    }
  };

  return (
    <div className="container ">
      <div >
        <h2 className="text-2xl font-semibold mb-4">Developer Management</h2>
        <ul>
          {developers.map((developer) => (
            <li
              key={developer._id}
              className="mb-4 p-4 border rounded text-center mr-[150px]"
            >
              <p className="font-semibold">{developer.FullName}</p>
              <p>Email: {developer.email}</p>
              {editingDeveloperId === developer._id ? (
                <>
                  <div className="grid gap-6 mb-6 md:grid-cols-2 m-8">
                <div>
                  <label className=" block ">
                    Name
                    <input
                      type="text"
                      value={updatedName}
                      onChange={(e) => setUpdatedName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </label>
                  </div>
                  <div>
                  <label className="block">
                  
                    Email
                    <input
                      type="text"
                      value={updatedEmail}
                      onChange={(e) => setUpdatedEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </label>
                  </div>
                  <div>
                  <label className="block">
                    Roles
                    <input
                      type="text"
                      value={updatedRoles}
                      onChange={(e) => setUpdatedRoles(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </label>
                  </div>
                  <div>
                  <label className="block">
                    Skill
                    <input
                      type="text"
                      value={updatedSkill}
                      onChange={(e) => setUpdatedSkill(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </label>
                  </div>
                  </div>
                  
                  <label className="block m-8">
                    Profile Picture
                    <input
                      type="file"
                      accept="image/*"
                      name="profile_picture"
                      onChange={(e) => setUpdatedProfilePicture(e.target.files[0])}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </label>

                  <div className="flex mt-2 gap-4 justify-center">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-700"
                      onClick={() => handleUpdate(developer._id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded mt-2 hover:bg-gray-700"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>Roles: {developer.roles}</p>
                  <p>Skill: {developer.skill}</p>
                  <img src={developer.profile_picture.url} alt="profile" />
                  <div className="flex mt-2  justify-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                      onClick={() => setEditingDeveloperId(developer._id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                      onClick={() => handleDelete(developer._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-red-500">{message}</p>
      </div>
    </div>
  );
};

export default DeveloperManagement;
