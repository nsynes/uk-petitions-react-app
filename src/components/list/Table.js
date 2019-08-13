import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { renderStatus } from '../../helpers';
import './Table.css';

const Table = (props) => {
    const { petitions, renderDate, history } = props;

    return (
        <div className="Table-container">
                <table className="Table">
                    <thead className="Table-head">
                        <tr>
                            <th>Petition</th>
                            <th>Status</th>
                            <th>Signatures</th>
                            <th>Date Created</th>
                            <th>ID</th>
                        </tr>
                    </thead>
                    <tbody className="Table-body">
                        {petitions.map((petition) => (
                            <tr
                                key={petition.id}
                                onClick={() => history.push('/petition/' + petition.id)}>
                                <td>
                                    <span className="Table-petition-name"></span>
                                    {petition.attributes.action}
                                </td>
                                <td>
                                    {renderStatus(petition.attributes.state)}
                                </td>
                                <td>
                                    <span className="Table-details">{petition.attributes.signature_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                </td>
                                <td>
                                    <span className="Table-details">{renderDate(petition.attributes.created_at)}</span>
                                </td>
                                <td>
                                    <span className="Table-details">{petition.id}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    );
}

Table.propTypes = {
    petitions: PropTypes.array.isRequired,
    renderDate: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
}

export default withRouter(Table);