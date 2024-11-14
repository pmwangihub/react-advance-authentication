import PropTypes from "prop-types";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from "../constants";
import { useState, useEffect, useMemo } from "react";

const ProfileSideBar = () => {
    const location = useLocation();

    const menuItems = useMemo(() => [
        { eventKey: "dash", route: `${ROUTES.PROFILE}${ROUTES.DASHBOARD}`, icon: "bx bx-food-menu", label: "Dashboard" },
        { eventKey: "info", route: `${ROUTES.PROFILE}${ROUTES.PROFILE_INFO}`, icon: "bx bx-user-circle", label: "Your info" },
        { eventKey: "settings", route: `${ROUTES.PROFILE}${ROUTES.PROFILE_SETTINGS}`, icon: "bx bx-cog", label: "Settings" },
        { eventKey: "security", route: `${ROUTES.PROFILE}${ROUTES.PROFILE_SECURITY}`, icon: "bx bx-shield", label: "Security" },
        { eventKey: "secured", route: `${ROUTES.PROFILE}${ROUTES.PROFILE_SECURED_INFO}`, icon: "bx bxs-data", label: "Secured info" },
    ], []);


    const [activeKey, setActiveKey] = useState(
        menuItems.find(item => location.pathname === item.route)?.eventKey || "dash"
    );


    useEffect(() => {
        const currentKey = menuItems.find(item => location.pathname === item.route)?.eventKey;
        if (currentKey) setActiveKey(currentKey);
    }, [location.pathname, menuItems]);

    const handleSelect = (selectedKey) => {
        setActiveKey(selectedKey);
    };

    return (
        <Col md={3} lg={2} className="sidebar p-0">
            <div className="offcanvas-md offcanvas-end" tabIndex="-1" id="profileSideBar">
                <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                    <Nav className="flex-column" activeKey={activeKey} onSelect={handleSelect}>
                        {menuItems.map(({ eventKey, route, icon, label }) => (
                            <NavLink key={eventKey} eventKey={eventKey} route={route} isActive={activeKey === eventKey}>
                                <i className={`${icon} me-2 fs-5 text-secondary`} />
                                {label}
                            </NavLink>
                        ))}
                    </Nav>
                </div>
            </div>
        </Col>
    );
};

const NavLink = ({ route, children, eventKey, isActive, style = "" }) => {
    const klass = `d-flex small align-items-center ${style} ${isActive ? "active" : ""}`;
    return (
        <Nav.Link as={Link} to={route} eventKey={eventKey} className={klass}>
            {children}
        </Nav.Link>
    );
};

NavLink.propTypes = {
    route: PropTypes.string.isRequired,
    style: PropTypes.string,
    eventKey: PropTypes.string,
    children: PropTypes.node,
    isActive: PropTypes.bool,
};

export default ProfileSideBar;
