import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Container, Col, Row, Modal } from 'reactstrap';
import Image from 'react-graceful-image';
import ImageModal from '../components/ImageModal'


const UserProfilePage = ({ handleImgClick, imageClicked, imgToggle, clickedSrc }) => {
    const { id } = useParams();
    const [userImages, setUserImages] = useState([]);
    const [userInfo, setUserInfo] = useState('')

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${id}`)
            .then(result => {
                setUserImages(result.data)
            })
            .catch(err => {
                console.log('Error: ' + err)
            })

        axios.get(`https://insta.nextacademy.com/api/v1/users/${id}`)
            .then(result => {
                setUserInfo(result.data)
            })
            .catch(error => {
                console.log('Error: ' + error)
            })
    }, [])

    return (
        <Container id='container' fluid={true}>
            <Row>
                <Col lg='4' style={{ textAlign: 'center', marginTop: '30px' }}>
                    <h2>{userInfo.username}</h2>
                    <img className='w-50 rounded-circle' src={userInfo.profileImage}></img>
                </Col>
                <Col lg='8'>
                    {
                        userImages.map((source, index) => {
                            return (
                                <>
                                    <div style={{ display: 'inline' }} onClick={handleImgClick}>
                                        <Image key={index} alt={index} width='400px' style={{ margin: '10px' }} src={source} />
                                    </div>
                                    <Modal className='modal-lg' isOpen={imageClicked} toggle={imgToggle}>
                                        <ImageModal imgToggle={imgToggle} source={clickedSrc} />
                                    </Modal>
                                </>
                            )
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default UserProfilePage;