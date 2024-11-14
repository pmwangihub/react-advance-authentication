import { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import * as Icon from 'react-bootstrap-icons';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavbarToggle from 'react-bootstrap/NavbarToggle'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { UserDropDown } from './UserDropDown';
import { Link } from 'react-router-dom';
import * as CONST from "../constants";
import { useSelector } from 'react-redux';
import { ROUTES } from '../constants';

export const NavBarComponent = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { authData } = useSelector(state => state.AuthLoginReducer);

    return (
        <>

            <Navbar expand={`lg`} fixed="top" className="bg-body-tertiary navbar-dark mb-3" >
                <Container >
                    <Link className='navbar-brand' to={ROUTES.BASE} >
                        <img src="/logo.png" className="img-fluid me-1" alt="log" width={45} />
                        {CONST.APP_LABEL}
                    </Link>
                    <NavbarToggle as={'a'} onClick={handleShow}><Icon.List /></NavbarToggle>
                    <Navbar.Offcanvas
                        id="navbarMobile"
                        placement="end"
                        className="text-bg-dark"
                        show={show} onHide={handleClose}
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title >

                                {CONST.APP_LABEL}
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body >
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link as={Link} to="/" onClick={handleClose}>Home</Nav.Link>
                                {authData && <UserDropDown authData={authData} onclick={handleClose} />}
                            </Nav>
                            {!authData &&
                                <>
                                    <div className="d-flex mt-3 mt-lg-0 align-items-lg-center">
                                        <NavbarSmallBtn
                                            className={`btn btn-sm btn-outline-light`}
                                            url={`/auth${CONST.AUTH_ROUTER.login}`}
                                            state={{ next_url: `/` }}
                                            onclick={handleClose}>
                                            <Icon.PersonFill size={18} className="me-1" />
                                            Sign in
                                        </NavbarSmallBtn>
                                    </div>
                                    <div className="d-flex mt-3 mt-lg-0 ms-0 ms-lg-2 align-items-lg-center">
                                        <NavbarSmallBtn
                                            className={`btn btn-sm btn-dark`}
                                            url={`/auth${CONST.AUTH_ROUTER.register}`}
                                            state={{ next_url: `/` }}
                                            onclick={handleClose}
                                        >

                                            <Icon.PersonFillAdd size={18} className="me-1" />
                                            Sign up
                                        </NavbarSmallBtn>
                                    </div>
                                </>}
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

        </>
    );
};


const NavbarSmallBtn = ({ url, className, children, state, onclick }) => (
    <Link to={url} className={`${className} h-max-content`} state={{ ...state }} onClick={onclick}>
        {children}
    </Link>
);

NavbarSmallBtn.propTypes = {
    children: PropTypes.node,
    url: PropTypes.string,
    className: PropTypes.string,
    state: PropTypes.object,
    onclick: PropTypes.func.isRequired,
};