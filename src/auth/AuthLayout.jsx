import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as CONST from "../constants";
import { Link, Outlet } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <Container >
            <section className="section register d-flex flex-column align-items-center justify-content-center py-2">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={4} md={6} className="d-flex flex-column align-items-center justify-content-center">
                            <div className="d-flex justify-content-center py-4">
                                <Link to="/"
                                    className="d-flex align-items-center text-decoration-none">
                                    <img src="/logo.png" alt="Logo" height="45" className="me-2" />
                                    <span className="d-none d-lg-block text-secondary text-uppercase">{CONST.APP_LABEL}</span>
                                </Link>
                            </div>
                            <Outlet />
                        </Col>
                    </Row>
                </Container>
            </section>
        </Container>
    )
};





