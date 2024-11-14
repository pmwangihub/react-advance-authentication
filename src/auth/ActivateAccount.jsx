import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertComponent from "../components/AlertComponent";
import Spinner from 'react-bootstrap/Spinner';
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AccountEmailActivateAction } from "../reducer/actions/AccountEmailActivateAction";
import { ROUTES } from "../constants";
const ActivateAccount = () => {
    const { regLoader, regError, regData } = useSelector(state => state.RegisterReducer);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const key = queryParams.get("key");
        if (key) dispatch(AccountEmailActivateAction(key))
    }, [location, navigate, dispatch]);
    return (

        <Card className="border-0 bg-transparent mb-3 w-100">
            <Card.Body>
                <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Activate Account</h5>
                    {regLoader && <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                    </div>}
                    {regError && <AlertComponent info={regError} variant='danger' />}
                    {!regData && <AlertComponent info={""} variant='success' >
                        <ActivateSuccessful {...regData} />
                    </AlertComponent>}
                </div>


            </Card.Body>
        </Card>

    );
};


const ActivateSuccessful = () => (
    <p className='mb-0 small'>
        Your account has been activated. Please <Link to={`${ROUTES.AUTH}${ROUTES.LOGIN}`}>{` Sign in here`}</Link>
    </p>
)


export default ActivateAccount;
