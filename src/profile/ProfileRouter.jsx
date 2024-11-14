

import ProfileLayout from "./ProfileLayout";
import ProfileLogout from "./ProfileLogout";
import ProfileInfo from "./ProfileInfo";
import ProfileSecurity from "./ProfileSecurity";
import ProfileSettings from "./ProfileSettings";
import ProfileSecuredInfo from "./ProfileSecuredInfo";
import Dashboard from "./Dashboard";
import { AUTH_ROUTER, PROFILE_ROUTER, ROUTES } from "../constants";
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from "react";


const LOGIN_URL = `${AUTH_ROUTER.auth}${AUTH_ROUTER.login}`;
const NEXT_URL = `${PROFILE_ROUTER.profile}${PROFILE_ROUTER.dash}`;

const ProfileRouter = () => {
    const { authData, authLoader } = useSelector(state => state.AuthLoginReducer);
    const navigate = useNavigate()

    useEffect(() => {
        const redirectToLogin = () => {
            if (authData && !authLoader) return;
            return navigate(LOGIN_URL, { state: { next_url: NEXT_URL } });
        };

        if (!authData && !authLoader) {
            redirectToLogin();
        }
    }, [authData, authLoader, navigate]);

    return (
        <Routes>
            <Route element={<ProfileLayout />} >
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                <Route path={ROUTES.LOGOUT_CONFIRM} element={<ProfileLogout />} />
                <Route path={ROUTES.PROFILE_INFO} element={<ProfileInfo />} />
                <Route path={ROUTES.PROFILE_SECURITY} element={<ProfileSecurity />} />
                <Route path={ROUTES.PROFILE_SETTINGS} element={<ProfileSettings />} />
                <Route path={ROUTES.PROFILE_SECURED_INFO} element={<ProfileSecuredInfo />} />
            </Route>
        </Routes>
    );
};



export default ProfileRouter;