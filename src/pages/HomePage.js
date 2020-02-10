import React from 'react';
import UserImages from '../containers/UserImages';
import { Link } from 'react-router-dom';

const HomePage = ({ users }) => {
    return (
        <div id='home' >

            {users.map(user => (
                <div className='previewBox d-flex flex-column align-items-center mt-5'>
                    <img className='w-25 d-block rounded-circle' src={user.profileImage} alt={user.username} key={user.id} >
                    </img>
                    <Link to={`/users/${user.id}`} className='usernames d-block'>
                        {user.username}
                    </Link>
                    <UserImages userId={user.id} />
                </div >
            ))}
        </div >
    )
}

export default HomePage;