import AuthLayout from "./AuthLayout";
import Register from "./Register";
import Login from "./Login";

import AlreadyAuthenticated from "./AlreadyAuthenticated";
import ResendActivate from "./ResendActivate";
import ActivateAccount from "./ActivateAccount";
import { ROUTES } from "../constants";
import { Route, Routes } from 'react-router-dom';
import GoogleComplete from "./GoogleComplete";

const AuthRouter = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />} >
                <Route path={`${ROUTES.ALREADY}`} element={<AlreadyAuthenticated />} />
                <Route path={`${ROUTES.REGISTER}`} element={<Register />} />
                <Route path={`${ROUTES.LOGIN}`} element={<Login />} />
                <Route path={`${ROUTES.RESEND}`} element={<ResendActivate />} />
                <Route path={`${ROUTES.ACTIVATE}`} element={<ActivateAccount />} />
                <Route path={`${ROUTES.GOOGLE_COMPLETE}`} element={<GoogleComplete />} />
            </Route>
        </Routes>
    );
};

AuthRouter.propTypes = {};

export default AuthRouter;