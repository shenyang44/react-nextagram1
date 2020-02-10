import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormFeedback, Form, Input, FormGroup } from 'reactstrap';
import SignUpModal from './SignUpModal'

const LogInModal = ({ props }) => {
    const [disableSubmit, setDisableSubmit] = useState(true)
    const [noUser, setNoUser] = useState()
    const [wrongPass, setWrongPass] = useState()

    useEffect(() => {
        if (props.passValid && props.isUserLength) {
            setDisableSubmit(false)
        }
        else {
            setDisableSubmit(true)
        }
    }, [props.passValid, props.isUserLength])

    const handleSubmitClick = () => {
        { props.handleLogIn() }

        setTimeout(() => {
            setNoUser(props.userValid)
            setWrongPass(!props.userValid)
        }, 2500);

    }

    const handleChange = () => {
        console.log('change')
        if (noUser) {
            setNoUser(false)
        }
        else if (wrongPass) {
            setWrongPass(false)
        }
    }

    const validCheck = () => {
        if (props.isUserLength === 0) {
            return null;
        }
        else if (!props.isUserLength) {
            return <FormFeedback invalid>Must be at least 5 characters and no more than 20 characters</FormFeedback>
        }
        else if (noUser) {
            return <FormFeedback invalid>No such username!</FormFeedback>
        }
        else {
            return null;
        }
    }
    const passCheck = () => {
        if (wrongPass) {
            return <FormFeedback invalid> Wrong password!</FormFeedback>
        }
        else {
            return null;
        }
    }
    const fieldValidDisplay = (validState) => {
        if (validState === 0) {
            return null;
        }
        else if (!validState || noUser || wrongPass) {
            return { invalid: true }
        }
    }

    return (
        <div>
            <div onClick={props.handleLogClick}>Log In</div>
            <Modal isOpen={props.modal && props.isLog} toggle={props.toggle}>
                <ModalHeader toggle={props.toggle}>Log In Form</ModalHeader>
                <ModalBody>
                    <Form className='modalForms'>
                        <FormGroup>
                            <div>
                                Username:
                        <Input id='uNameField' {...fieldValidDisplay(props.isUserLength)} onChange={handleChange} onInput={props.handleInput} type='text' value={props.userNameText} />{validCheck()}
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <div>
                                Password:
                        <Input {...fieldValidDisplay(props.passValid)} id='pInputField' onChange={handleChange} onInput={props.handleInput} value={props.pText} type='password' /> {passCheck()}
                                {props.passValid ? '' : <div> Password must be between 8 and 50 characters </div>}
                            </div>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={props.handleSwitch} color="link">Sign In instead</Button>
                    <Button disabled={disableSubmit} color="primary" onClick={handleSubmitClick}>Log In</Button>{' '}
                    <Button color="secondary" onClick={props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={props.modal && !props.isLog} toggle={props.toggle}>
                <SignUpModal props={props} />
            </Modal>
        </div >
    );
}

export default LogInModal;