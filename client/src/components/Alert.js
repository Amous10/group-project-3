import React from 'react';
import { Modal, Button } from 'react-materialize';
import { PromiseProvider } from 'mongoose';

const Alert = props => {
  return (
    <Modal id="foo" style={{ size: '10%' }}>
      <h4 className="center-align">{props.modalMessage}</h4>
    </Modal>
  );
};

export default Alert;
