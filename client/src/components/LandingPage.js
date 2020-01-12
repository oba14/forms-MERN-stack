import React from 'react'
import {NavLink} from 'react-router-dom'


const LandingPage = () => {
    return (
        <div>
        <div className='container' style={{marginLeft:'0%', marginTop:'10%', textAlign:'center'}}>
            <div className='row'>
                <div className= 'col-md-12'>
                    <div className = "landing-welcome">
                        <h1>WELCOME </h1>
                        <h3>Upload and Retrieve forms data from mongodb using MERN stack</h3>
                    </div>
                </div>
            </div>
        </div>
        <div className='container' style={{marginLeft:'0%', marginTop:'1%', textAlign:'center'}}>
            <div className='row'>    
                <div className= 'col-md-12'>
                    <div style={{border: '1px solid grey', display: 'inline-block', padding: '2px'}}>
                       <button className='btn'> <NavLink to= '/shortForm'>Submit Form</NavLink></button> 
                    </div>
                </div>
            </div>
        </div>
        <div className='container' style={{marginLeft:'0%', marginTop:'1%', textAlign:'center'}}>
            <div className='row'>
                <div className= 'col-md-12'>
                    <div style={{border: '1px solid grey', display: 'inline-block', padding: '2px', alignSelf:'center' }}>
                        <button className='btn'><NavLink to= '/trackcomplaint'>Edit Form</NavLink> </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
export default LandingPage