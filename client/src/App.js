import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import FormSmall from './components/pages/FormSmall';
import TrackComplaint from './components/pages/TrackComplaint';
import Navbar from './components/navbar/Navbar';
import NotFound from './components/pages/NotFound';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center"
        autoClose={ 1300 }
        hideProgressBar={ true }
        newestOnTop={ false }
        closeOnClick
        rtl={ false }
        pauseOnVisibilityChange
        draggable
        pauseOnHover />
      <Navbar />
      <Switch>
        <Route exact path = '/' component = { LandingPage } />
        <Route path= '/shortForm' component = { FormSmall }/>
        <Route path= '/trackcomplaint' component = { TrackComplaint } />
        <Route component= { NotFound }/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
