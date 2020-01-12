import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import FormSmall from './components/FormSmall'
import TrackComplaint from './components/TrackComplaint'
import Navbar from './components/navbar/Navbar'
import NotFound from './components/NotFound'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path = '/' component = {LandingPage} />
                <Route path= '/shortForm' component = {FormSmall}/>
                <Route path= '/trackcomplaint' component = {TrackComplaint} />
                <Route component= { NotFound }/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;


