


import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithGoogleApi } from '../api';
import React, { useState, useEffect } from 'react';
import { setAuthLoginErrorAction } from '../reducer/reducer/LoginReducer';

const LoginWithGoogle = () => {
    const [errorMsg, setErrorMsg] = useState(null);
    const { authLoader, authData, } = useSelector(state => state.AuthLoginReducer);
    let dispatch = useDispatch();

    const handleLoginWithGoogle = (event) => {
        if (authData) return;
        console.log(event)
        return loginWithGoogleApi()
            .then((response) => {
                const google_url = response.data.google_url;
                if (google_url) window.location.href = google_url;
            }).catch((error) => {
                console.log(error.message)
                setErrorMsg(error.message)
            });
    };


    useEffect(() => {
        if (errorMsg) {
            dispatch(setAuthLoginErrorAction({ authError: errorMsg }));
            setErrorMsg(null);
        }
    }, [errorMsg, dispatch]);

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