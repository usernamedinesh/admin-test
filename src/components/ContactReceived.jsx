import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmailList() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://malig.kodevana.com:8002/api/get_emails'); 
        setEmails(response.data.emails);
      } catch (error) {
        console.error('Failed to fetch emails', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="max-w-screen-sm mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Email List</h1>
      <ul>
        {emails.map((email) => (
          <li key={email._id} className="mb-2">
            <div className="font-semibold">{email.email}</div>
            <div className="text-sm text-gray-600">
              {new Date(email.date).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmailList;
