import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { addForm } from '../../actions/todoActions';
import './FormModal.css';

const FormModal = (props) => {
  const {
    modalData, dataForMongodb
  } = props;
  const dispatch = useDispatch();

  const [ modal, setModal ] = useState(true);

  const toggle = () => setModal(!modal);

  const finalFormSubmission = () => {

    dispatch(addForm(
      dataForMongodb
    ));
  };

  return (
    <div>
      {/* <Button color="danger" onClick={toggle}>SHow MOdal</Button> */}
      <Modal isOpen={ modal } toggle={ toggle } className="">
        <ModalHeader style={ { color: 'black' }} toggle={ toggle }>Please review form details</ModalHeader>
        <ModalBody style={ { color: 'black' } }>
          <label>1- Title: </label><span className="user-data">{`  ${modalData.entity_type}`}</span> <br></br>
          <label>2- What is your name: </label><span className="user-data">{` ${modalData.username}`}</span> <br></br>
          <label>3- Email: </label><span className="user-data">{`  ${modalData.email}`}</span> <br></br>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={ finalFormSubmission }>Submit Form</Button>{' '}
          <Button color="secondary" onClick={ toggle }>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default FormModal;