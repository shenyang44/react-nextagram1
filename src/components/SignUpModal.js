import React, { useState, useEffect } from 'react';
import { Button, ModalHeader, ModalBody, ModalFooter, FormFeedback, Input, Form, FormGroup } from 'reactstrap';

const SignUpModal = ({ props }) => {
    const [disableSubmit, setDisableSubmit] = useState(true)

    const validCheck = () => {
        if (props.isUserLength === 0) {
            return null;
        }
        else if (!props.isUserLength) {
            return <FormFeedback invalid>Must be at least 5 characters and no more than 20 characters</FormFeedback>
        }
        else if (props.userValid) {
            return <FormFeedback valid>Sweet! That name is available</FormFeedback>;
        }
        else {
            return <FormFeedback invalid>Sorry! Username is taken</FormFeedback>;
        }
    }

    const rePassCheck = () => {
        if (props.rePassState === 0) {
            return null;
        }
        else if (!props.rePassState) {
            return <FormFeedback invalid>The two passwords must match!</FormFeedback>
        }
        else {
            return null;
        }
    }

    const fieldValidDisplay = (length, arg2) => {
        if (length === 0) {
            return null;
        }
        else if (length && arg2) {
            return { valid: true }
        }
        else {
            return { invalid: true }
        }
    }

    useEffect(() => {
        if (props.passValid && props.userValid && props.isUserLength && props.rePassState) {
            setDisableSubmit(false)
        }
        else {
            setDisableSubmit(true)
        }
    }, [props.passValid, props.userValid, props.rePassState])

    return (
        <>
            <ModalHeader toggle={props.toggle}>Sign Up Form</ModalHeader>
            <ModalBody>
                <Form className='modalForms'>
                    <FormGroup>
                        <div>
                            Username:
                        <Input id='uNameField' {...fieldValidDisplay(props.isUserLength, props.userValid)} onInput={props.handleInput} type='text' value={props.userNameText} />{validCheck()}
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <div>
                            Email:
                        <Input id='eInputField' onInput={props.handleInput} placeholder='abc123@blabla.com' type='email' value={props.eText} />
                            {props.emailError.length > 0 ? <div>{props.emailError[0]}</div> : ''}
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <div>
                            Password:
                        <Input {...fieldValidDisplay(props.passValid, props.passValid)} id='pInputField' onInput={props.handleInput} value={props.pText} type='password' />
                            {props.passValid ? '' : <div> Password must be between 8 and 50 characters </div>}
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <div>
                            reenter pass.
                            <Input {...fieldValidDisplay(props.rePassState, props.rePassState)} onChange={props.handleInput} type='password' />
                            {rePassCheck()}
                        </div>
                    </FormGroup>

                </Form>
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.handleSwitch} color="link">Log In instead</Button>
                <Button disabled={disableSubmit} onClick={props.handleLogIn} color="primary">Sign Up</Button>{' '}
                <Button color="secondary" onClick={props.toggle}>Cancel</Button>
            </ModalFooter>
        </>
    );
}

export default SignUpModal;