import React from 'react'
import { Modal, Button } from 'react-materialize'
import { PromiseProvider } from 'mongoose';



const Alert = (props) => {
    return (
        <Modal
            id="foo"
            bottomSheet>
            <h1 className="center-align">{props.modalMessage}</h1>
        </Modal>
    )



}

export default Alert

