import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileSideBar from './ProfileSideBar';
import { Outlet } from 'react-router-dom';


export default function ProfileLayout() {
    return (
        <Container fluid className='mt-4'>
            <Row>
                <ProfileSideBar />
                <Col md={9} lg={8} className='mx-auto'>
                    <Outlet />
                </Col>
            </Row>

        </Container>
    )
}

ProfileLayout.propTypes = {}

