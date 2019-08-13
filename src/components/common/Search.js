import React from 'react';
import { withRouter } from 'react-router-dom';
import Loading from './Loading';
import { API_URL_search } from '../../config';
import { handleResponse } from '../../helpers';
import './Search.css';

class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            searchResults: [],
            searchQuery: '',
            loading: false,
        };
    }

    handleRedirect = (petitionId) => {
        this.setState({
            searchQuery: '',
            searchResults: [],
        })

        this.props.history.push('/petition/' + petitionId);
    }

    handleChange = (event) => {
        const inputValue = event.target.value;

        this.setState({
            searchQuery: inputValue
        });

        // if searchQuery is empty, don't send request
        if (!inputValue) {
            return '';
        }

        this.setState({ loading: true});

        fetch(API_URL_search + "?q=" + inputValue)
            .then(handleResponse)
            .then((result) => {
                this.setState({
                    loading: false,
                    searchResults: result.data,
                });
            });

        //console.log(event.target.name);
        //console.log(event.target.value);
        //console.log(this.state);
    }

    renderSearchResults() {
        const { searchResults, searchQuery, loading } = this.state;

        if (!searchQuery) {
            return '';
        }

        if (searchResults.length > 0) {
            return (
                <div className="search-result-container">
                    {searchResults.map(result => (
                        <div
                            key={result.id}
                            className="search-result"
                            onClick={() => this.handleRedirect(result.id)}
                        >
                            {result.attributes.action}
                        </div>
                    ))}
                </div>
            );
        }

        if (!loading) {
            return (
                <div className="search-result-container">
                    <div className="search-no-result">
                        No results found.
                    </div>
                </div>
            )
        }
    }

    render() {
        const { loading, searchQuery } = this.state;

        return (
            <div className="search">
                <span className="search-icon" />
                <input
                    className="search-input"
                    type="text"
                    placeholder="keywords"
                    onChange={this.handleChange}
                    value={searchQuery}
                />

                {loading &&
                <div className="search-loading">
                    <Loading
                        width='12px'
                        height='12px'
                    />
                </div>}

                {this.renderSearchResults()}
            </div>
        );
    }
}

export default withRouter(Search);