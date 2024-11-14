
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { loginWithGoogleApi } from '../api';
import React, { useState } from 'react';


const LoginWithGoogle = () => {
    const [errorMsg, setErrorMsg] = useState(null);
    const { authLoader, authData, } = useSelector(state => state.AuthLoginReducer);

    const handleLoginWithGoogle = () => {
        if (authData) return;

        return loginWithGoogleApi()
            .then((response) => {
                const google_url = response.data.google_url;
                if (google_url) window.location.href = google_url;
            }).catch((error) => {
                setErrorMsg(error.message)
            });
    };

    return (

        <React.Fragment>
            <Button className={btnStyle} onClick={handleLoginWithGoogle} disabled={authLoader}>
                <img className="rounded-circle me-1" height="24" src="/google.png" alt="" />
                Sign in with Google
            </Button>
        </React.Fragment>
    )
};


const btnStyle = `
    badge 
    d-flex 
    text-decoration-none 
    justify-content-center 
    align-items-center 
    p-1 
    pe-2 
    text-primary-emphasis
    bg-primary-subtle 
    border 
    border-primary-subtle 
    rounded
`

export default LoginWithGoogle;