import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SignUpModal from './SignUpModal'

const SignUpLink = ({ props }) => {
    return (
        <div>
            <div id='signClick' onClick={props.handleLogClick}>Sign Up</div>
            <Modal isOpen={props.modal && !props.isLog} toggle={props.toggle}>
                <SignUpModal props={props} />
            </Modal>
        </div>
    )
}

export default SignUpLink;