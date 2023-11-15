import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = () => {
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Move this line inside the component

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleUpload = async () => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('video', video);

    try {
      await axios.post('http://malig.kodevana.com:8002/app/video-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Handle successful upload, e.g., show a success message
    } catch (error) {
      console.error('Failed to upload video:', error);
    } finally {
      setIsUploading(false); // Reset loading state
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Upload Video</h2>
      <input
        type="text"
        placeholder="Video Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-2 w-full"
      />
      <div className="flex items-center mb-2">
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleVideoChange}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <button
        onClick={handleUpload}
        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${
          isUploading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Upload Video'}
      </button>
    </div>
  );
};

export default VideoUpload;
