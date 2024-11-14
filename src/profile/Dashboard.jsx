import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Placeholder from 'react-bootstrap/Placeholder';
import { useSelector } from 'react-redux';
import { ROUTES } from "../constants";
import { Link } from 'react-router-dom';
import { utils } from '../utils';

const Dashboard = () => {

    const { authData, authLoader } = useSelector(state => state.AuthLoginReducer);
    const card_title = authLoader ? `Fetching account info ...` : `Personal information`;
    const card_info = authLoader ? <InfoLoader /> : information;
    return (
        <Card border='light' className='shadow'>
            <Card.Body className='pb-0'>
                <Card.Title>{card_title}</Card.Title>
            </Card.Body>
            <Card.Body className='px-0'>
                <ListGroup variant="flush" >
                    <ListGroup.Item>
                        {card_info}
                    </ListGroup.Item>

                    {(!authLoader && authData) &&
                        <>
                            <ListGroup.Item>
                                <span className='me-3'>Email</span>
                                <span className='fw-bold'>{authData.user.email}</span>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <span className='me-3'>Full names</span>
                                {
                                    authData.user.full_name ?
                                        <span className='fw-bold'>{authData.user.full_name}</span> :
                                        <Button variant="warning" size="sm">
                                            Update info
                                        </Button>
                                }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <span className='me-3'>Initials</span>
                                {
                                    authData.user.initials ?
                                        <span className='fw-bold'>{authData.user.initials}</span>
                                        : <Button variant="warning" size="sm">
                                            Update info
                                        </Button>
                                }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <span className='me-3'>Account Status</span>
                                <span className='fw-bold'> {authData.user.is_active ? "Active" : "Inactive"}</span>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <span className='me-3'>Join Date</span>
                                <span className='fw-bold'> {utils.PlainDate(authData.user.timestamp)}</span>
                            </ListGroup.Item>


                            <ListGroup.Item as={Link} to={`${ROUTES.PROFILE}${ROUTES.PROFILE_SETTINGS}`} action className={`${card_link} py-3`}>
                                Manage your data
                            </ListGroup.Item>
                        </>
                    }
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

const card_link = `link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover`;
const information = `See the data in your Django Account and personalize your Account experience.`;
const InfoLoader = () => (
    <Placeholder as={Card.Title} animation="glow">
        <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={6} />
        </Placeholder>
    </Placeholder>
);

export default Dashboard;
