import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteForm, editForm, searchToken } from '../actions/todoActions';
import {
  Card, CardText, CardBody, Button
} from 'reactstrap';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const TrackComplaint = () => {

  const dispatch = useDispatch();  
  const form = useSelector(state => state.form.form);
  const formExist = useSelector(state => state.form.formExist);
  const error = useSelector(state => state.form.error);
  const [ editing, setEditing ] = useState(false);
  const [ editedName, setEditedName ] = useState('');
  const [ editedEmail, setEditedEmail ] = useState('');
  const { register, handleSubmit } = useForm();
  
  useEffect (() => {
  
  },[ formExist, form, error ]);

  const add = (event) => {
    //event.preventDefault()
    const tokenNo = event.token;
    dispatch(searchToken(tokenNo));
  
    if(formExist ){
      toast.success('Form found!');
    } else {
      toast.error('Wrong token number');
    }
  };

  const saveEditedForm = () => {
    dispatch(editForm({
      ...form,
      
      username: editedName,
      email: editedEmail,
    }));
    setEditing(false);
  };

  /**
 * For downloading files
 */
  const downloadAttachments = (fileName) => {

    fetch(`http://localhost:5000/report/fileUpload/image/${fileName}`)
      .then(response => {
      
        //console.log('THIS IS',response);
        response.blob().then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          a.click();
        });
      });
  };

  return (
    <div className= 'container' style={ { marginTop:'10%' } }>
      <div className='row'>
        <div className= 'col-md-8'>
          <h3>Enter Form Number</h3>
          <form  onSubmit={ handleSubmit(add) } style={ { margin: '15px' } } id="todoForm">      
            <input className='form-control' type="text" placeholder="token" name="token" 
              ref={ register({ required: true }) }></input><br></br>
            <button type="submit">
              <span role="img" aria-label="Add">👍</span>
            </button>
          </form>
        </div>
      </div>
      <div style={ { margin: '10px' } }>
        { !editing && formExist && (
          <div>       
            <Card className= "cards">
              <CardBody style={ { width: '100%' } }>
                <CardText>Name: {form.username}</CardText>
                <CardText> Email: {form.email}</CardText>
                <CardText>Download Fle: {form.attachments && form.attachments.length > 0 && (form.attachments.map((file, fileIndex) => 
                  <span key={ fileIndex }>
                    <a key={ fileIndex } href="#" onClick={ () => downloadAttachments(file.filename) }>{file.filename}</a><br></br>
                  </span>
                )
                )}</CardText>
                <Button className= "button" onClick={ () => dispatch(deleteForm(form._id)) } >  
                  <span role="img" aria-label="delete">❌</span>
                </Button>
                <Button className= "button" onClick={ () => setEditing(true) }type='button'>
                  <span role="img" aria-label="edit">📝</span>
                </Button>
              </CardBody>
            </Card>
          </div>
        )}

        { editing && (
          <div className= "todo-item">
            <Card className = 'cards' >
              <CardBody>
                <CardText> <input onChange={ (event) => setEditedName(event.target.value) } type="text" name="Name" placeholder="Name" value={ editedName }></input> </CardText>
                <CardText> <input onChange={ (event) => setEditedEmail(event.target.value) } type="text" name="Email" placeholder="Email" value={ editedEmail }></input> </CardText>
                <Button className='button' onClick={ () => setEditing(false) } type='button'>Cancel</Button>
                <Button className='button' onClick={ () => saveEditedForm() } type='button'>Save</Button>
              </CardBody>
            </Card>
          </div>
        )}
      </div>  

    </div>
  );
};

export default TrackComplaint;