import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "./FormModal.css";

const FormSuccessModal = props => {
  const { modalData } = props;
  // console.log('FORM DATA MODAL', dataForMongodb.get('disc_verbal'));
  // console.log('FORM DATA action', dataForMongodb.get('disc_action'));

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <div>
      {/* <Button color="danger" onClick={toggle}>SHow MOdal</Button> */}
      <Modal isOpen={modal} toggle={toggle} className="">
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody style={{ color: "black" }}>
          <label>Track your Report:</label>{" "}
          <NavLink to="/trackcomplaint">
            {" "}
            <span className="user-data">{`  ${modalData}`}</span>{" "}
          </NavLink>{" "}
          <br></br>
        </ModalBody>
        <ModalFooter>
          <NavLink to="/">
            {" "}
            <i className="material-icons left">keyboard_backspace</i>Go Back To
            Home
          </NavLink>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default FormSuccessModal;
