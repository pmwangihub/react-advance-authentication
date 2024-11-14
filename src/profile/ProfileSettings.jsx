import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserApi } from "../api";
import { localUpdateUserAction } from '../reducer/reducer/LoginReducer';

const ProfileSettings = () => {
    const { authData } = useSelector(state => state.AuthLoginReducer);
    const dispatch = useDispatch();
    const handleUserUpdate = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = {
            full_name: formData.get('full_name'),
            initials: formData.get('initials')
        };
        try {
            const response = await updateUserApi(userData);
            const updatedUser = response.data.user;
            const storedAuthData = localStorage.getItem('authData');
            if (storedAuthData) {
                const oldAuthData = JSON.parse(storedAuthData);
                const updatedAuthData = {
                    ...oldAuthData,
                    user: updatedUser
                };
                localStorage.setItem('authData', JSON.stringify(updatedAuthData));
                dispatch(localUpdateUserAction(updatedAuthData));
            }
        } catch (error) {

        }
    };

    return (
        <Card className="border-0 shadow mb-3 w-100">
            <Card.Body>
                <Card.Title className='mb-4'>{`Update your profile info`}</Card.Title>

                <Form onSubmit={handleUserUpdate}>
                    <Row className="mb-3">
                        <Col>
                            <Col md={6}>
                                <div className='mb-3'>

                                    <Form.Group controlId="formInitials">
                                        <Form.Control className='fw-bold' plaintext readOnly defaultValue={authData ? authData.user.email : 'No email'} />
                                    </Form.Group>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className='mb-3'>
                                    <FloatingLabel
                                        controlId="full_name"
                                        label="Full name"
                                    >
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name="full_name"
                                            placeholder="Enter your full name"
                                            defaultValue={authData ? authData.user.full_name : ''}
                                            required
                                        />
                                    </FloatingLabel>

                                </div>
                            </Col>
                            <Col md={6}>
                                <div className='mb-3'>
                                    <FloatingLabel
                                        controlId="initials"
                                        label="Your initials"
                                    >
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name="initials"
                                            placeholder="Enter your initials"
                                            defaultValue={authData ? authData.user.initials : ''}
                                            required
                                        />
                                    </FloatingLabel>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                    <Button variant="primary" size='sm' type="submit" className='px-4'>
                        Update
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ProfileSettings;
