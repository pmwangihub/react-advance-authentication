import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { localLogoutAction } from '../reducer/reducer/LoginReducer';
import { useDispatch } from 'react-redux';
import { deleteAccountApi } from '../api';
import { useState } from 'react';


const ProfileSecurity = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = () => {
        setLoading(true)
        deleteAccountApi().then((res) => {
            setLoading(false);
        }).catch((err) => {
            setLoading(false)
        });
        dispatch(localLogoutAction())
    }


    return (
        <Card.Body>
            <h5 className="card-title pb-0 fs-4">Your security settings.</h5>
            <p className="small">Choose one of the actions below.</p>

            <Dropdown>
                <Dropdown.Toggle variant="danger" id="deleteAccountBtn" className='btn-sm px-4'>
                    {loading ? "Deleting account..." : "Delete Account"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item className='text-center small' onClick={handleDelete}>
                        Yes, delete this account
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        </Card.Body>
    )
}

ProfileSecurity.propTypes = {}

export default ProfileSecurity