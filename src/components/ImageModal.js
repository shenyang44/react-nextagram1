import React from 'react';
import { ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import Image from 'react-graceful-image'

const ImageModal = ({ source, imgToggle }) => {

    return (
        <>
            <ModalHeader toggle={imgToggle}></ModalHeader>
            <ModalBody>
                <Image src={source} />
            </ModalBody>
            <ModalFooter>
                text box
                and stuff will go here
            </ModalFooter>
        </>
    )
}

export default ImageModal;