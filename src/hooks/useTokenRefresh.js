
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RefreshTokenAction } from "../reducer/actions/RefreshTokenAction";

const useTokenRefresh = () => {
    const dispatch = useDispatch();
    const authData = useSelector((state) => state.AuthLoginReducer.authData);

    useEffect(() => {
        if (!authData) return;
        const intervalId = setInterval(() => dispatch(RefreshTokenAction()), 1000 * 60 * 25);
        return () => clearInterval(intervalId);
    }, [authData, dispatch]);
};

export default useTokenRefresh;
