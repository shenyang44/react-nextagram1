import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'react-graceful-image';

const UserImages = ({ userId }) => {
    const [userMedia, setUserMedia] = useState([]);
    const [picLoading, setPicLoading] = useState(true);
    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${userId}`)
            .then(result => {
                setUserMedia(result.data)
                setPicLoading(false)
            })
            .catch(err => {
                console.log('ERROR: ', err)
            })
    }, [])

    return (
        <div>
            {userMedia.map((source, index) => {
                if (index < 5) {
                    return (
                        <Image src={source} alt={index} width='200px' style={{ margin: '10px' }} />
                    )
                }
            })
            }
        </div>
    )
}

export default UserImages;