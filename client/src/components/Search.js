import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class SearchArticles extends Component {
    constructor() {
        super();
        this.state = {
            searchText: ''
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onClick = e => {
        e.preventDefault();

        const data = {
            title: this.state.searchText
        };

        axios
            .post('http://localhost:8082/api/search', data)
            .then(res => {
                // update parent here
                this.setState({
                    searchText: ''
                })
                this.props.history.push('/');
            })
            .catch(err => {
                console.log("Error in Search!");
            })

    }
    onSubmit = e => {
        e.preventDefault();

        const data = {
            title: this.state.searchText
        };

        axios
            .post('http://localhost:8082/api/search', data)
            .then(res => {
                this.setState({
                    searchText: ''
                })
                this.props.history.push('/');
            })
            .catch(err => {
                console.log("Error in Search!");
            })
    };

    render() {
        return (
            <div className="Search">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br />
                            <Link to="/" className="btn btn-outline-warning float-left">
                                Show Article List
                            </Link>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Add Article</h1>
                            <p className="lead text-center">
                                Create new article
                            </p>

                            <form noValidate onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Search'
                                        name='title'
                                        className='form-control'
                                        value={this.state.title}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    className="btn btn-outline-warning btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchArticles;
