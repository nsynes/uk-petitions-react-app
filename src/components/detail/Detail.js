import React from 'react';
import { API_URL_detail } from '../../config';
import Loading from '../common/Loading';
import { handleResponse, renderStatus } from '../../helpers';
import './Detail.css';
import SignatureData from '../signatureData/SignatureData.js'

class Detail extends React.Component {
    constructor() {
        super();

        this.state = {
            petition: {},
            loading: false,
            error: null,
        }

    }

    componentDidMount() {
        const petitionId = this.props.match.params.id

        this.fetchPetition(petitionId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            //get new petition id from url
            const newPetitionId = nextProps.match.params.id;

            this.fetchPetition(newPetitionId);
        }
    }

    fetchPetition(petitionId) {

        this.setState({ loading: true });

        fetch(API_URL_detail + "/" + petitionId + '.json')
            .then(handleResponse)
            .then((petition) => {
                this.setState({
                    loading: false,
                    error: null,
                    petition: petition,
                })
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                })
            });

    }

    render() {
        const { loading, error, petition } = this.state;

        if (loading) {
            return <div className="loading-container"><Loading /></div>
        }

        if (error) {
            return <div className="error">{error}</div>
        }

        if (!(petition.data === undefined)) {

            return (
                <div>
                    <div className="detail">
                        <div className="detail-container" >
                            <h1 className="detail-heading">
                                <div className="detail-title">
                                    {petition.data.attributes.action}
                                </div>
                            </h1>
                            <div style={{display:'flex'}}>
                                <div className='detail-container-left'>
                                    <div className="detail-item">
                                        Petition state <span className="detail-value">{renderStatus(petition.data.attributes.state)}</span>
                                    </div>
                                    <div className="detail-item">
                                        <a href={`https://petition.parliament.uk/petitions/${petition.data.id}/signatures/new`} target='_blank'>See petition</a>
                                    </div>
                                    <div className="detail-item">
                                        Background<br /><span className="detail-para">{petition.data.attributes.background}</span>
                                    </div>
                                    <div className="detail-item">
                                        Additional details<br /><span className="detail-para">{petition.data.attributes.additional_details ? petition.data.attributes.additional_details : 'None'}</span>
                                    </div>
                                    <div className="detail-item">
                                        Signature count <span className="detail-value">{petition.data.attributes.signature_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                    </div>
                                    <div className="detail-item">
                                        Date created <span className="detail-value">{petition.data.attributes.created_at.split("T")[0]}</span>
                                    </div>
                                    <div className="detail-item">
                                        Petition created by <span className="detail-value">{petition.data.attributes.creator_name}</span>
                                    </div>
                                </div>
                                <div className='detail-container-right' align='center'>
                                    <div className="detail-item">
                                        Signature count by region
                                    </div>
                                    <SignatureData constituencySignatureCount={petition.data.attributes.signatures_by_constituency} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="detail">
                    <h1 className="detail-heading">
                        No petition data found
                    </h1>
                </div>
            );
        }

    }
}

export default Detail;