import React from 'react';
import { ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
// import Image from 'react-graceful-image'

const ImageModal = ({ source, imgToggle }) => {
    let ratio;
    let wLimit;
    let modalImg = new Image();
    modalImg.src = source
    modalImg.onload = () => {
        ratio = modalImg.width / modalImg.height * 45;
        wLimit = ratio.toString();
        wLimit = wLimit.concat('%')
    }
    console.log(wLimit)
    return (
        <>
            <ModalHeader toggle={imgToggle}></ModalHeader>
            <ModalBody>
                <img width={wLimit} src={source}>
                </img>
            </ModalBody>
            <ModalFooter>
                text box
                and stuff will go here
            </ModalFooter>
        </>
    )
}

export default ImageModal;