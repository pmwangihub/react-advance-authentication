import { useState } from 'react';
import PropTypes from 'prop-types';
import * as Icon from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



export const PasswordInput = ({ name, label }) => {
    const [viewPassword, setViewPassword] = useState(false);
    return (
        <InputGroup className="mb-3" >
            <InputGroup.Text id={name} onClick={() => setViewPassword(!viewPassword)}>
                {viewPassword ? <Icon.UnlockFill /> : <Icon.Lock />}
            </InputGroup.Text>
            <Form.Control placeholder={label} type={viewPassword ? "text" : "password"} name={name} required />
        </InputGroup>
    )
};

PasswordInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}
