import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-circular-progressbar/dist/styles.css';
import { BrowserRouter } from 'react-router-dom';
import 'react-datetime-picker/dist/DateTimePicker.css';
// import 'react-calendar/dist/Calendar.css';

import 'react-clock/dist/Clock.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>

    <App />
  </BrowserRouter>
  </React.StrictMode>,
)
