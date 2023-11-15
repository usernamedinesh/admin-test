// SharedContext.js
import React, { createContext, useContext, useState } from 'react';

const SharedContext = createContext();

export const useSharedContext = () => useContext(SharedContext);

export const SharedProvider = ({ children }) => {
    const [totalContacts, setTotalContacts] = useState(0);
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [totalProject,setTotalProject] = useState(0)

    return (
        <SharedContext.Provider value={{ totalContacts, totalBlogs, setTotalContacts, setTotalBlogs,totalProject,setTotalProject }}>
            {children}
        </SharedContext.Provider>
    );
};
