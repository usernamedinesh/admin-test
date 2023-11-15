import React, { useState, useEffect,  } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useSharedContext } from '../Context';
import ContactReceived from './ContactReceived';



const Contact = () => {
  const [submissions, setSubmissions] = useState([]);
  const { setTotalContacts } = useSharedContext()
    const navigate = useNavigate();
  const goBack = () => {
		navigate(-1);
	}

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await axios.get('http://malig.kodevana.com:8002/admin/get-form');
        setSubmissions(response.data.submissions);

        const totalContacts = response.data.submissions.length;
        setTotalContacts(totalContacts);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    }

    fetchSubmissions();
  }, []);

  const handleDelete = async (submissionId) => {
    try {
      await axios.delete(`http://malig.kodevana.com:8002/admin/delete-form/${submissionId}`);
      // Update the submissions list after successful deletion
      setSubmissions(submissions.filter(submission => submission._id !== submissionId));
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };


  return (
    <>
    <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-3 ml-[10%]"
        onClick={goBack}
      >
        Back
      </button>
    <div className="p-4 px-[25%]">
      <h1 className="text-2xl font-semibold ml-10 mb-4">Received contact form</h1>
      <ul className="space-y-4 text-center">
        {submissions.map((submission, index) => (
          <li
            key={index}
            className="border p-4 rounded shadow-md bg-white relative"
          >
            <h3 className="text-lg font-semibold">
              {submission.firstName} {submission.lastName}
            </h3>
            <p>Email: {submission.email}</p>
            <p>Message: {submission.message}</p>
            {/* Add more details as needed */}
            {submission.attachment && (
              <div className="mt-2 flex justify-center items-center ">
                <img
                  src={submission.attachment}
                  alt="Attachment"
                  className="max-w-full h-auto  "
                />
              </div>
              
            )}
            <div className="flex justify-end ">
              <button
                className="bg-red-500 text-white px-2 md:mb-1 rounded hover:bg-red-700"
                onClick={() => handleDelete(submission._id)}
              >
                Delete
              </button>
            </div>
             
          </li>
        ))}
       
      </ul>
    </div>
    <div>
            <ContactReceived />
    </div>
    </>
  );
};

export default Contact;
