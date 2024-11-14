import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { userSecuredInfoApi } from '../api';
import AlertComponent from '../components/AlertComponent';
import Spinner from 'react-bootstrap/Spinner';
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const ProfileSecuredInfo = () => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const fetchUserData = () => {
        setLoading(true);
        setError(null);
        userSecuredInfoApi()
            .then((response) => {
                setUserData(response.data);

                setError(null);
            })
            .catch((err) => {
                setError(err.response.data);
                setUserData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const requestInfo = () => {
        fetchUserData();
    };

    return (
        <Card.Body>
            <h5 className="card-title pb-0 fs-4">This is a secured page.</h5>
            <p className="small">This page only receives secured information from the server directly.</p>
            <Button variant="primary" size="sm" onClick={requestInfo}>
                {loading ? `Loading ...` : `Reload info`}
            </Button>
            <Col className='py-4' lg="8">
                {loading && <Spinner animation="border" variant="primary" />}
                {userData && <AlertComponent info={userData} variant='info' dismissible={false} />}
                {error && <AlertComponent info={error} variant='warning' />}
            </Col>
        </Card.Body>
    );
};

export default ProfileSecuredInfo;
