import React, { useState } from 'react';
import Landing from './pages/Landing/Landing';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './App.css';
import Exams from './pages/Exams/Exams';
import TestSeries from './pages/TestSeries/TestSeries';
import Aboutus from './pages/Aboutus/Aboutus';
import News from './pages/News/News';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const url = 'http://localhost:4000'
  return (
    <div className="app">
      {showLogin ? <LoginPopUp url={url} setShowLogin={setShowLogin} /> : <></>}
      {showLogin ?<></>:<Navbar  setShowLogin={setShowLogin} showLogin={showLogin} />}
      
      <main className="main-content">
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route  path='/exams' element={<Exams/>}/>
          <Route  path='/test-series' element={<TestSeries/>}/>
          <Route  path='/about' element={<Aboutus/>}/>
          <Route path='/news' element={<News url={url}/>}/>
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
