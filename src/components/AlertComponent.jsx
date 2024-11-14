import { useState } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';


const AlertComponent = ({ info, variant, children, dismissible = true, onAlertClose = () => { } }) => {
    const [show, setShow] = useState(true);

    const handleClose = (event) => {
        setShow(false);
        if (typeof onAlertClose === 'function') onAlertClose(event);
    };

    const renderContent = (data) => {
        if (typeof data === 'object' && data !== null) {
            return Object.entries(data).map(([key, value]) => (
                <div key={key} className="alert-content">
                    <div>{renderContent(value)}</div>
                </div>
            ));
        }
        return <p className='mb-1'>{data}</p>;
    };

    return (
        show && (
            <Alert variant={variant} onClose={handleClose} dismissible={dismissible}>
                {renderContent(info)}
                {children}
            </Alert>
        )
    );
};

AlertComponent.propTypes = {
    info: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.node]).isRequired,
    variant: PropTypes.string.isRequired,
    dismissible: PropTypes.bool,
    onAlertClose: PropTypes.func,
    children: PropTypes.node,
};

export default AlertComponent;
