import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div>
            <h2 style={{marginTop:'200px'}} className="font-weight-bold text-center">Not Found ! 404</h2>
            <p className="text-center"><Link className="text-success" to="/">Back To Home</Link></p>
        </div>
    );
};

export default Error;