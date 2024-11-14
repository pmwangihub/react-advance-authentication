// import React from 'react';
// import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

const ResendActivate = () => {
    return (
        <Card className="border-0 shadow mb-3 w-100">
            <Card.Body>
                <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Your are already authenticated</h5>
                    <p className="text-center small">Choose one of the actions below.</p>
                </div>
                {/* The rest */}
            </Card.Body>
        </Card>
    )
}

ResendActivate.propTypes = {}

export default ResendActivate;