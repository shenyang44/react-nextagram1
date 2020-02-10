import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Container, Col, Row } from 'reactstrap';
import Image from 'react-graceful-image';


const UserProfilePage = () => {
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
                                <Image alt={index} width='400px' style={{ margin: '10px' }} src={source} />
                            )
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default UserProfilePage;