import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SmallLoader from '../components/SmallLoader'

const MyProfilePage = ({ loggedIn }) => {
    const [imgSources, setImgSources] = useState([]);
    const [myUserInfo, setMyUserInfo] = useState('');
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'https://insta.nextacademy.com/api/v1/images/me',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(result => {
                setImgSources(result.data)
            })
            .catch(err => {
                console.log(err)
            })

        axios.get(`https://insta.nextacademy.com/api/v1/users/${localStorage.getItem('myUserId')}`)
            .then(result => {
                console.log(result.data)
                setMyUserInfo(result.data)
                setIsLoading(false)
            })
            .catch(error => {
                console.log('Error: ' + error)
            })
    }, [])


    return (
        loggedIn ?
            <div className="p-3 fluid-container flex-column flex-wrap" style={{ boxSizing: 'border-box', height: '100vh' }}>
                <header className='row h-50 d-flex'>
                    <h2 className='d-flex flex-column col-6 align-items-center'>
                        {myUserInfo.username}
                        {isLoading ? <SmallLoader /> :
                            <img className='w-50 rounded-circle' src={myUserInfo.profileImage}></img>}
                    </h2>
                    <div className='col-2'>
                    </div>
                    <aside className='d-flex col-4 align-items-center'>
                        <Link id='uploadLink' to='/profile/upload'>
                            upload shiz
                        </Link>
                    </aside>

                </header>
                <div>
                    wow, amazing styling
                </div>

                <br />

                <section className='h-50 d-flex align-items-center flex-wrap' id='profileImages'>
                    {isLoading ? <SmallLoader /> :
                        imgSources.map(source => {
                            return (
                                <img width='200px' src={source}></img>
                            )
                        })
                    }
                </section>
            </div>
            : <h2 className="d-flex justify-content-center mt-5">You are not signed in!</h2>
    )
}

export default MyProfilePage;
