import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import uuid from 'uuid/v1';
import { toast } from 'react-toastify';
import 'react-dropzone-uploader/dist/styles.css';
import { NavLink } from 'react-router-dom';
import FormModal from '../layouts/FormModal';
import FormSuccessModal from '../layouts/FormSuccessModal';

const ShortReport = () => {

  const id = uuid();
  const  formSubmitted  = useSelector(state=> state.form.formSubmitted);
  const  errorAdding  = useSelector(state=> state.form.error_adding);
  const form_id = useSelector(state => state.form.form_id);
  const { register, handleSubmit } = useForm();
  const [finalFormData, setFinalFormData] = useState(null);
  const [dataForMongodb, setDataForMongodb] = useState(null);
  
  useEffect (() => {
    if(formSubmitted){
      toast.success('Given token exist in the database')
    }
  },[formSubmitted]);

  useEffect(() => {
    if(errorAdding){
      toast.error('Given token is wrong!');
    }
  }, [errorAdding])
  
  /**
   * 
   * @param {*} data 
   */
  const onSubmit = (data) => {
    
    if (data) {
      const myForm = document.getElementById('myForm');
      const formData = new FormData(myForm);
  
      setDataForMongodb(formData);
      setFinalFormData(data);
    }
  };

  const checkFileLimit = (event) =>{
    const files = event.target.files; // create file object
    if (files.length > 3) { 
      event.target.value = null; // discard selected file
           
      // Display an error toast
      toast.error('Cannot add more than 3 files', { position: toast.POSITION.TOP_CENTER, autoClose: 1300 });
      return false;
 
    }
    return true;
 
  };

  const onChangeFiles = (e) => {
    
    if (checkFileLimit(e)) {
      
      const inputFiles = e.target.files;  
      
      // Display a success toast, with a title
      toast.success(`${inputFiles.length} Files added`);
      
      //dispatch(filesLoaded())
      
      for(let i=0; i< inputFiles.length; i++) {
        document.querySelector('#myList').innerHTML += `<li> ${inputFiles[i].name}</li>`;  
      }
    }
  };

  return (
    <div className= 'container'>
      <div className='row'>
        <div className= 'col-md-12'>
          <h1>Fill in details</h1>

          <form key={ id } onSubmit={ handleSubmit(onSubmit) } id= { 'myForm' } name= { 'myForm' } encType='multipart/form-data'>
            <label>1- Title</label> <br></br>
            <select name="entity_type" ref={ register({ required: false }) }>
              <option value="">Select</option>
              <option value="Mr">Mr</option>
              <option value="Mr's">Mrs</option>
              <option value="Miss">Miss</option>
            </select> <br></br>
    
            <label>2- Full Name</label> <br></br>
            <input className='form-control' type="text" placeholder="username" name="username" ref={ register({ required: true }) } required /><br />

            <label>3- Email</label> <br></br>
            <input 
              className='form-control'
              type="email"
              placeholder="email" name="email" ref={ register({
                required: false,
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              }) } /><br />
            <label>4- Upload single or multiple files!</label> <br></br>
        
            <div className="custom-file mb-3 input-files">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroup"
                name="multiple_images" multiple
                onChange= { onChangeFiles }
              />
              <label className="custom-file-label" htmlFor="multiple_images" id="file-label">Add files!</label>
              <ul id="myList"> 
              </ul>
            </div>
            <br/>
            <button className='btn btn-primary' type="submit" > Submit </button>
          </form>

          {finalFormData && <FormModal modalData={finalFormData} dataForMongodb={dataForMongodb} />}

          {formSubmitted && (
            <FormSuccessModal modalData={form_id} dataForMongodb={dataForMongodb} />
            // <div>
            //   <label>Form Successfully submitted</label> <br></br>
            //   <span style={ { fontWeight: 'bold', color: 'blue' } }>You can edit the form using given id:</span>
            //   <span style={ { border: '2px solid green' } }>{form_id}</span>
            //   <NavLink to='/' > <i className="material-icons left">keyboard_backspace</i>Go Back To Home</NavLink>
            // </div>
          )}
          {errorAdding && (
            <div>
              <label style={ { display: 'inline-block', border: '1px solid red' } }>Form submission wasn't successfull</label>
              <NavLink to='/'> <i className="material-icons left">keyboard_backspace</i>Go Back To Home</NavLink>
            </div>
          )}
        </div>
      </div>  
    </div>
  );
};

export default ShortReport;