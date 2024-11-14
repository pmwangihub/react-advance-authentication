
import PropTypes from 'prop-types';
import * as Icon from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AlertComponent from '../components/AlertComponent';
import LoginWithGoogle from './LoginWithGoogle';
import { useEffect } from 'react';
import { useNavigate, Link, useLocation, } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_ROUTER } from '../constants';
import { RegisterAction } from '../reducer/actions/RegisterAction';
import { PasswordInput } from './PasswordInput';


const Register = () => {
    const { authLoader, authData, } = useSelector(state => state.AuthLoginReducer);
    const { regLoader, regError, regData } = useSelector(state => state.RegisterReducer);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        const default_url = `${AUTH_ROUTER.auth}${AUTH_ROUTER.already}`;
        const next_url = location.state?.next_url;
        const redirect_url = next_url ? next_url : default_url;
        if (authData && !authLoader) {
            navigate(redirect_url, { replace: true })
        }
    }, [authData, authLoader, navigate, location]);

    const handleRegister = (event) => {
        event.preventDefault();
        const reg_data = new FormData(event.target);
        event.target.reset()
        return dispatch(RegisterAction(reg_data))
    };

    return (

        <Card className="border-0 shadow mb-3 w-100">
            <Card.Body>
                <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Create account</h5>
                    <p className="text-center small">Fill in your details to create account.</p>
                    {regError && <AlertComponent info={regError} variant='danger' />}
                    {regData && <AlertComponent info={""} variant='success' >
                        <RegistrationSuccessful {...regData} />
                    </AlertComponent>}
                </div>
                <Form method='post' onSubmit={handleRegister}>
                    <Row>
                        <Col lg={12}>
                            <InputGroup className="mb-3" >
                                <InputGroup.Text id="basic-addon1">
                                    <Icon.At />
                                </InputGroup.Text>
                                <Form.Control placeholder="Email" type="email" name='email' required />
                            </InputGroup>
                        </Col>
                        <Col lg={12}><PasswordInput name='password1' label='Password' /></Col>
                        <Col lg={12}><PasswordInput name='password2' label='Password again' /></Col>
                        <Col lg={12}>
                            <Button className="w-100" type="submit" variant="primary" disabled={regLoader}>
                                {regLoader ? 'Loading...' : 'Create account'}
                            </Button>
                        </Col>
                        <Col lg={12}>
                            <p className="small mt-3 fw-bold"> <Link to={`${AUTH_ROUTER.auth}${AUTH_ROUTER.login}`}>Sign in</Link></p>
                        </Col>
                        <Col lg={12}><hr className="mb-4" /></Col>
                        <LoginWithGoogle />
                    </Row>
                </Form>
            </Card.Body>
        </Card>



    )
};


const RegistrationSuccessful = ({ email }) => (
    <p className='mb-0 small'>
        Registration successful. Check your email - <strong>{email}</strong> - and verify your.
        Or you can resend verification email<Link to={'#'}>{` here`}</Link>
    </p>
)

RegistrationSuccessful.propTypes = {
    email: PropTypes.string.isRequired
}




export default Register;