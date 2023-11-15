import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const VisitorGraph = () => {
  const [visitorData, setVisitorData] = useState([]);

  useEffect(() => {
    fetchVisitorData();
  }, []);

  const fetchVisitorData = async () => {
    try {
      const response = await axios.get('http://malig.kodevana.com:8002/app/get');
      setVisitorData(response.data);
    } catch (error) {
      console.error('Error fetching visitor data:', error);
    }
  };

  const totalVisitors = visitorData.reduce((total, entry) => total + entry.count, 0);

  return (
   

    <div className='flex gap-10 items-center'>
    <div className="container mx-auto py-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Visitor Graph</h2>
      <div className="p-4 bg-gray-100 rounded-md">
        <div className="flex justify-center items-center">
          
        </div>
        <LineChart
          width={600}
          height={300}
          data={visitorData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#82ca9d" // Custom stroke color
            activeDot={{ r: 8, fill: '#82ca9d' }} // Highlight active data point
          />
        </LineChart>
      </div>
    </div>
    <div
    className="w-[150px] h-20 bg-green-300 rounded-md ml-11 hover:bg-green-400  flex justify-center items-center text-white"
    
  >
    <div className="text-xl font-medium text-black  ">Visit:{totalVisitors}</div>
  </div>
  </div>
  
  );
};

export default VisitorGraph;
