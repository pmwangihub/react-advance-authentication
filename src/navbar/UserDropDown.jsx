import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { ROUTES } from '../constants';
import { Link } from 'react-router-dom';




export const UserDropDown = ({ authData, onclick }) => {
    const { user } = authData;
    return (
        <Dropdown autoClose={true}>
            <Dropdown.Toggle as={CustomToggle} initial={user.initials} id="dropdown-custom-components" />
            <Dropdown.Menu style={{ ...Styles }} className='shadow-sm'>
                <div className="d-flex justify-content-between">
                    <div>
                        <img src="#" alt="logo" className='d-none' />
                        <small>Django cloud App</small>
                    </div>

                    <Dropdown.Item
                        as={Link}
                        onClick={onclick}
                        to={`${ROUTES.PROFILE}${ROUTES.LOGOUT_CONFIRM}`}
                        className='btn btn-warning btn-sm small'
                        style={{ ...btnStyles }}>
                        Sign out
                    </Dropdown.Item>
                </div>
                <ul className="list-group list-group-flush small mt-2">
                    <li className="list-group-item px-0">
                        <div className="d-flex w-100 justify-content-between">
                            {user.full_name && <h5 className="mb-1 fw-bold"> {user.full_name} </h5>}
                            {!user.full_name && <span className=" badge text-bg-warning rounded-pill small mb-1">
                                Update your profile
                            </span>}
                        </div>
                        {user.email && <small>{user.email}</small>}
                    </li>
                </ul>
                <Dropdown.Item as={Link} onClick={onclick} to={`${ROUTES.PROFILE}${ROUTES.DASHBOARD}`} className='px-0 small'>Account</Dropdown.Item>
                <Dropdown.Item as={Link} onClick={onclick} to={`${ROUTES.PROFILE}${ROUTES.PROFILE_INFO}`} className='px-0 small'>Your info</Dropdown.Item>
                <Dropdown.Item as={Link} onClick={onclick} to={`${ROUTES.PROFILE}${ROUTES.PROFILE_SETTINGS}`} className='px-0 small'>Settings</Dropdown.Item>
                <Dropdown.Item as={Link} onClick={onclick} to={`${ROUTES.PROFILE}${ROUTES.PROFILE_SECURITY}`} className='px-0 small'>Security</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}


// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
export const CustomToggle = React.forwardRef(({ onClick, initial }, ref) => {
    const name = initial ? initial.trim() : 'U.S'
    return (
        <>
            <Button
                className='btn btn-primary rounded-circle p-2 small'
                variant="primary"
                ref={ref}
                onClick={(e) => {
                    e.preventDefault();
                    onClick(e);
                }}
            >
                {name}
            </Button>
        </>
    )
})

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
export const CustomMenu = React.forwardRef(({ children, style, className, }, ref) => {
    const [value, setValue] = useState('');

    return (
        <div
            ref={ref}
            style={style}
            className={`${className}`}
        >
            <Form.Control
                autoFocus
                className="mx-3 my-2 w-auto"
                placeholder="Type to filter..."
                onChange={(e) => setValue(e.target.value)}
                value={value}
            />
            <ul className="list-unstyled">
                {React.Children.toArray(children).filter(
                    (child) => !value || child.props.children.toLowerCase().startsWith(value)
                )}
            </ul>
        </div>
    );
});

CustomToggle.displayName = "CustomToggle";
CustomMenu.displayName = "CustomMenu";
CustomToggle.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    initial: PropTypes.string,
}

CustomMenu.propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

const btnStyles = {
    width: 'unset',
    padding: '0.25rem 0.5rem',
    backgroundColor: '#ffc107'
};

const Styles = {
    width: "320px",
    padding: "1rem",
    right: "0",
    left: "auto",
    border: "none",
}
UserDropDown.propTypes = {
    authData: PropTypes.object.isRequired,
    onclick: PropTypes.func.isRequired
}