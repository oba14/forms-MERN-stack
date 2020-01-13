import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { deleteForm, editForm, searchToken } from '../actions/todoActions';
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';


const TrackComplaint = () => {

  const dispatch = useDispatch()
  const [tockenNo, setTocken] = useState('')
  
  const form = useSelector(state => state.form.form)
  const formExist = useSelector(state => state.form.formExist)
  const error = useSelector(state => state.form.error)
  
  const [editing, setEditing] = useState(false)
  const [editedName, setEditedName] = useState('')
  const [editedEmail, setEditedEmail] = useState('')
  
  const add = (event) => {
    event.preventDefault()
     dispatch(searchToken(tockenNo))
     
    setTimeout(() => {
      if(formExist) {
        
        toast.success("Form found!")
      }else {
        toast.error("Given Form number doesn't exist!")
       }
     }, 1000)
     
  }

  const saveEditedForm = () => {
    dispatch(editForm({
      ...form,
      
      username: editedName,
      email: editedEmail,
    }))
    setEditing(false)
  }

  /**
 * For downloading files
 */
const downloadAttachments = (fileName) => {
    

  fetch(`http://localhost:5000/report/fileUpload/image/${fileName}`)
    .then(response => {
      console.log('THIS IS',response);
      
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
      });
    //window.location.href = response.url;
    });
}

  return (
    <div className= 'container' style={{marginTop:'10%'}}>
      <div className='row'>
        <div className= 'col-md-8'>
          <h3>Enter Form Number</h3>
          <form style={{margin: "15px"}} id="todoForm" onSubmit={add}>      
            <input onChange={(event) => setTocken(event.target.value)} name="Text" type="text" placeholder="Text"></input><br></br>
            <button type="submit">
            <span role="img" aria-label="Add">👍</span>
            </button>
          </form>
        </div>
      </div>
  <div style={{margin: "10px"}}>
      { !editing && formExist && (
          <div>
          {/* {toast.success("Form found!", { position: toast.POSITION.TOP_CENTER, autoClose: 1300 })} */}
          <ToastContainer position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover />
          
         <Card className= "cards">
          <CardBody style={{ width: '100%' }}>
          <CardText>Name: {form.username}</CardText>
          <CardText> Email: {form.email}</CardText>
          <CardText>Download Fle: {form.attachments.length > 0 && (form.attachments.map((file, fileIndex) => 
                      <span key={fileIndex}>
                      <a key={fileIndex} href="#" onClick={ () => downloadAttachments(file.filename)}>{file.filename}</a><br></br>
                      </span>
                    )
                  )}</CardText>
          <Button className= "button" onClick={() => dispatch(deleteForm(form._id))} >  
            <span role="img" aria-label="delete">❌</span>
          </Button>
          <Button className= "button" onClick={() => setEditing(true)}type='button'>
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
              <CardText> <input onChange={(event) => setEditedName(event.target.value)} type="text" name="Name" placeholder="Name" value={editedName}></input> </CardText>
              <CardText> <input onChange={(event) => setEditedEmail(event.target.value)} type="text" name="Email" placeholder="Email" value={editedEmail}></input> </CardText>
              <Button className='button' onClick={() => setEditing(false)} type='button'>Cancel</Button>
              <Button className='button' onClick={() => saveEditedForm()} type='button'>Save</Button>
              </CardBody>
          </Card>
        </div>
      )}
      {/* {error && (
        <div>
          {toast.error("Given Form number doesn't exist!", { position: toast.POSITION.TOP_CENTER })}
          <ToastContainer />
        </div>
      )} */}
    </div>  

  </div>
  )
}

export default TrackComplaint;