

import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { localUpdateUserAction } from '../reducer/reducer/LoginReducer';
import AlertComponent from '../components/AlertComponent';
import Spinner from 'react-bootstrap/Spinner';
import { ROUTES } from "../constants";
import { BASE_URL } from "../http";

const GoogleComplete = () => {
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const { authData } = useSelector(state => state.AuthLoginReducer);
    const redirect = useNavigate();
    const dispatch = useDispatch();
    let redirect_url = `${ROUTES.PROFILE}${ROUTES.PROFILE_SECURED_INFO}/`

    useEffect(() => {
        if (authData) redirect(redirect_url, { replace: true });
    }, [authData])


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const access = urlParams.get('access');
        const refresh = urlParams.get('refresh');
        axios.post(`${BASE_URL}accounts/google-complete/`,
            { access, refresh },
            {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${access}`,
                    'Content-Type': 'application/json',
                    "X-Origin": "react",
                }
            }).then(response => {

                let authUserData = response.data;
                localStorage.setItem('authData', JSON.stringify(authUserData));
                dispatch(localUpdateUserAction(authUserData));
                setLoading(false)
            }).catch(error => {
                setErr(error.response.data)
                setLoading(false)
            });

        return () => {

        }

    }, [redirect, dispatch, redirect_url])


    return (
        <Card className="border-0 bg-transparent mb-3 w-100">
            <Card.Body>
                <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Google Sign in complete</h5>
                    {loading && <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                    </div>}
                    {(!loading && err) && <AlertComponent info={err} variant='danger' />}
                </div>
            </Card.Body>
        </Card>
    )
}

GoogleComplete.propTypes = {}

export default GoogleComplete