import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import News from './pages/News/News';

const App = () => {
  // for testing
  const url ='http://localhost:4000';


  return (
    <div>
<Navbar/>
      <div className="app-content">
      <Sidebar /> 
        <Routes>
          <Route path='/' element={<News url={url} />} />
          <Route path='/news' element={<News url={url} />} />

        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
