import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSharedContext } from '../Context';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const {setTotalProject} = useSharedContext();
  


  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://malig.kodevana.com:8002/admin/getallProjects');
      setProjects(response.data.projects);
      const totalProject = response.data.projects.length;
       setTotalProject(totalProject);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };


  const handleDelete = async (projectId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this project?');
    if (confirmDelete) {
      try {
        setIsDeleting(true);
        await axios.delete(`http://malig.kodevana.com:8002/admin/delete/${projectId}`);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }finally {
        setIsDeleting(false); // Reset loading state
      }
    }
  };

  const handleDeleteReview = async (projectId, reviewId) => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(`http://malig.kodevana.com:8002/admin/reviews/${reviewId}`);
      if (response.data.success) {
        // Refresh the projects list to reflect the deleted review
        fetchProjects();
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }finally {
      setIsDeleting(false); // Reset loading state
    }
  };


  return (
    <div className="container sm mx-auto">
      <h2 className="text-xl font-semibold mb-4">All Projects</h2>
      <div className="grid grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project._id} className="border p-4">
            <img src={project.thumbnail.url} alt={project.title} className="mb-2 w-full" />
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <div className="text-lg font-semibold">
              {project.reviews.map((review) => (
                <div key={review._id}>
                  <p>Name: {review.name}</p>
                  <p>Email: {review.email}</p>
                  <p>Rating: {review.rating}</p>
                  <p>Comment: {review.comment}</p>
                  <button
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => handleDeleteReview(project._id, review._id)} 
                    disabled={isDeleting}
                  >
                    {isDeleting ? <span className="animate-spin">⏳</span> : "Delete Review"}
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleDelete(project._id)}
              disabled={isDeleting}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              
              {isDeleting ? <span className="animate-spin">⏳</span> : "Delete Project"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;