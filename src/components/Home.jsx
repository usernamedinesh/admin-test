import React from "react";
import Navbar from "./Navbar";
import VisitorGraph from "./Visitore";
import { useSharedContext } from "../Context";
import VideoUpload from "./vodeos/Upload";
import Getvideos from "./vodeos/GetVideos";

function Home() {
  const { totalContacts, totalBlogs,totalProject } = useSharedContext();

  return (
    <div>
      <div>
        <Navbar />
        <div className="flex gap-10 justify-center items-center">
          <div>
            <VisitorGraph />
          </div>
         
          <div className=" md:flex gap-10 cursor-pointer text-xl   font-medium">
            <div className="w-[150px] h-20 bg-green-300 rounded-md hover:bg-green-500 flex justify-center items-center">
              <p>Contact: {totalContacts == 0 ? "loading.." : totalContacts}</p>
            </div>
            <div className="w-[150px] h-20 bg-green-300 rounded-md hover:bg-green-500 flex justify-center items-center">
              <p>Blogs: {totalBlogs ==0 ? "loading.." : totalBlogs}</p>
            </div>
            <div className="w-[100px] text-xl font-medium h-20 bg-green-300 rounded-md hover:bg-green-500 flex justify-center items-center">
              <p>Project: {totalProject ==0 ? "loading.." : totalProject}</p>
            </div>
          </div>
          
        </div>
        <div className="w-[30%] ml-[16%] ">
            <VideoUpload />
          </div>
       
        <div className="ml-[20%] mb-[30%]">
        <Getvideos />

    </div>
      </div>
    </div>
  );
}

export default Home;
