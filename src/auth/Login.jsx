import * as Icon from 'react-bootstrap-icons';
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import AlertComponent from '../components/AlertComponent';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from "../reducer/actions/LoginAction";
import { AUTH_ROUTER } from '../constants';
import LoginWithGoogle from './LoginWithGoogle';
import { PasswordInput } from './PasswordInput';
import { setAuthLoginErrorAction } from '../reducer/reducer/LoginReducer';

const Login = () => {
    const { authLoader, authData, authError } = useSelector(state => state.AuthLoginReducer);

    let dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        const next_url = location.state?.next_url;
        let redirect_url = next_url ? next_url : `/`;
        if (authData && !authLoader) {
            navigate(redirect_url, { replace: true })
        }
    }, [authData, authLoader, navigate, location]);

    const onAlertClose = () => dispatch(setAuthLoginErrorAction(null))

    const handleLogin = (event) => {
        event.preventDefault();
        const loginData = new FormData(event.target);
        return dispatch(LoginAction(loginData));
    };
    return (
        <Card className="border-0 shadow mb-3 w-100">
            <Card.Body>
                <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Sing in into your account</h5>
                    <p className="text-center small">Fill in your details to login.</p>
                    {authError && <AlertComponent info={authError} variant='danger' onAlertClose={onAlertClose} />}
                </div>
                <Form onSubmit={handleLogin}>
                    <Row>
                        <Col lg={12}>
                            <InputGroup className="mb-3" >
                                <InputGroup.Text id="basic-addon1">
                                    <Icon.At />
                                </InputGroup.Text>
                                <Form.Control placeholder="Email" type="email" name='email' required />
                            </InputGroup>
                        </Col>
                        <Col lg={12}><PasswordInput name='password' label='Password' /></Col>
                        <Col lg={12}>
                            <Button className="w-100" type="submit" variant="primary" disabled={authLoader} >
                                {authLoader ? 'Loading...' : 'Sign in'}
                            </Button>
                        </Col>

                        <Col lg={12}>
                            <p className="small mt-3 fw-bold"><Link to={`${AUTH_ROUTER.auth}${AUTH_ROUTER.register}`}>Create an account</Link></p>
                        </Col>
                        <Col lg={12}><hr className="mb-4" /></Col>
                        <LoginWithGoogle />

                    </Row>
                </Form>

            </Card.Body>
        </Card>
    )
}

Login.propTypes = {}



export default Login;