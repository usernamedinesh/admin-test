import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SharedProvider  } from './Context';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <SharedProvider  >
    <App />
    </SharedProvider>
)
