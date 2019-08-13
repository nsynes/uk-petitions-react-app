import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = (props) => {
    const { page, totalPages, handlePaginationClick } = props;
    return (
        <div className="pagination">
            <button
                className="pagination-button"
                onClick={() => handlePaginationClick('prev')}
                disabled={page <= 0}>
                &larr;
            </button>

            <span className="pagination-info">
                page <b>{page}</b> of <b>{totalPages}</b>
            </span>

            <button
                className="pagination-button"
                onClick={() => handlePaginationClick('next')}
                disabled={page >= totalPages}>
                &rarr;
            </button>
        </div>
    );
}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    handlePaginationClick: PropTypes.func.isRequired,
}

export default Pagination;