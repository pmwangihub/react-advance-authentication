import React, { lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';
import { NavBarComponent } from "./navbar/NavBarComponent";
import { ROUTES } from "./constants";
import PreLoader from "./components/PreLoader";
import Home from "./home/Home";
import useTokenRefresh from "./hooks/useTokenRefresh";
const AuthRouter = lazy(() => import("./auth/AuthRouter"));
const ProfileRouter = lazy(() => import("./profile/ProfileRouter"));

/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - App component that sets up main routing and layout structure.
 * @returns {JSX.Element} - The main App component including navigation, main content, and route-based rendering.
 */
export default function App() {
  useTokenRefresh();
  return (
    <React.Fragment>
      <NavBarComponent />
      <main id="main">
        <Suspense fallback={<PreLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={`${ROUTES.AUTH}/*`} element={<AuthRouter />} />
            <Route path={`${ROUTES.PROFILE}/*`} element={<ProfileRouter />} />
          </Routes>
        </Suspense>
      </main>
    </React.Fragment>
  );
}
