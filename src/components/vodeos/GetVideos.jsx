import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://malig.kodevana.com:8002/app/get-video').then((response) => {
      setVideos(response.data);
      setIsLoading(false);
    });
  }, []);

  const handleVideoLoad = (event) => {
    const videoElement = event.target;
    videoElement.addEventListener('pause', () => {
      videoElement.play();
    });
  };

  return (
    <div>
      {/* <h2>Video List</h2> */}
      {videos.length === 1 ? (
        <ul>
          <li key={videos[0]._id}>
            {/* <h3>{videos[0].title}</h3> */}
            {isLoading && <LoadingSpinner />}
            <video
              autoPlay
              // controls
              muted
              // controlsList="nodownload"
             

              width="950px"
             
              onLoadedData={handleVideoLoad}
            >
              <source src={videos[0].videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </li>
        </ul>
      ) : (
        <p>No video available</p>
      )}
    </div>
  );
};

export default VideoList;
