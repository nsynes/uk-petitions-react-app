import React from 'react';
import{ handleResponse } from '../../helpers';
import { API_URL_search } from '../../config';
import Loading from '../common/Loading';
import Table from './Table'
import Pagination from './Pagination';

class List extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            petitions: [],
            error: null,
            totalPages: 0,
            page: 1
        };
    }

    componentDidMount() {
        this.fetchPetitions();

    }

    fetchPetitions() {
        this.setState({loading: true});

        const { page } = this.state;
        fetch(API_URL_search + '?page=' + page)// + '&state=open') //open, closed, rejected, awaiting_response, with_response, awaiting_debate, debated, not_debated
            .then(handleResponse)
            .then((result) => {

                var totalPages = parseInt(result.links.last.split('page=')[1], 10);

                this.setState({
                    petitions: result.data,//.result.items,
                    totalPages: totalPages,
                    loading: false,
                });
            })
            .catch((error) => {
                console.log('Error', error);

                this.setState({
                    error: error.errorMessage,
                    loading: false,
                })
            });
    }

    renderDate(dateTime) {
        var date = dateTime.split("T")[0]

        return (
            <span className="Table-details">{date}</span>
        );
    }

    handlePaginationClick = (direction) => {
        let nextPage = this.state.page;

        if (direction === 'next') {
            nextPage++;
        } else {
            nextPage--;
        }

        this.setState({ page: nextPage }, () => {
            // fetch petitions inside setState callback to ensure
            // next page is set before fetching
            this.fetchPetitions();
        })
    }

    render () {
        const {loading, error, petitions, page, totalPages } = this.state;

        if (loading) {
            return <div className="loading-container"><Loading /></div>
        }

        if (error) {
            return <div className="error">{error}</div>
        }

        return (
            <div>
                <Table
                    petitions={petitions}
                    renderDate={this.renderDate} />

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    handlePaginationClick={this.handlePaginationClick} />
            </div>
        );
    }
}

export default List;