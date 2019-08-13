import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="notfound">
            <h1 className="notfound-title">Oops! Page not found</h1>
            <Link to="/" className="notfound-link">Go to homepage</Link>
        </div>
    );
}

export default NotFound;