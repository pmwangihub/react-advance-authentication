// import React from 'react';
// import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { LogoutAction } from '../reducer/actions/LogoutAction';
import { useDispatch } from 'react-redux';

const ProfileLogout = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {

        dispatch(LogoutAction())
    }
    return (

        <Card.Body>
            <h5 className="card-title pb-0 fs-4">Confirm you want to sign out</h5>
            <p className="small">Choose one of the actions below.</p>

            <Button variant="danger" size='sm' className='px-5' onClick={handleLogout}>Sign out</Button>

        </Card.Body>

    )
}

ProfileLogout.propTypes = {}

export default ProfileLogout;