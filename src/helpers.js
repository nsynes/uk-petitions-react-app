import React from 'react';

/*
Fetch error helper

@param {object} response
*/

export const handleResponse = (response) => {
    return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
    });
}

/*
Render open (green) or closed (red)s

@param {string} status, 'open' or 'closed'
*/
export const renderStatus = (status) => {
    // Note the classes are from tutorial, hence currently irrelevant names
    if (status === 'open') {
        return <span className="status-open">{status}</span>
    } else if (status === 'closed') {
        return <span className="status-closed">{status}</span>
    } else {
        return <span>{status}</span>
    }
}