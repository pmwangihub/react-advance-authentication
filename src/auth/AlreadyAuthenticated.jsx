// import React from 'react';
// import PropTypes from 'prop-types';
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AUTH_ROUTER } from '../constants';

const AlreadyAuthenticated = () => {
    const { authData, } = useSelector(state => state.AuthLoginReducer);
    const navigate = useNavigate();

    useEffect(() => {
        let redirect_url = `${AUTH_ROUTER.auth}${AUTH_ROUTER.login}`;
        if (!authData) {
            navigate(redirect_url, { replace: true })
        }
    }, [authData, navigate]);



    return (
        <Card className="border-0 shadow mb-3 w-100">
            <Card.Body>
                <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Your are already authenticated</h5>
                    <p className="text-center small">Choose one of the actions below.</p>
                </div>
                {/* The rest */}
            </Card.Body>
        </Card>
    )
}

AlreadyAuthenticated.propTypes = {}

export default AlreadyAuthenticated;