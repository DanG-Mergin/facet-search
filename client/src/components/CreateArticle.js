import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class CreateArticle extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            title: '',
            author: '',
            description: '',
            keywords: [],
            datePublishedReg: ''
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            description: this.state.description,
            keywords: this.state.keywords,
            datePublishedReg: this.state.datePublishedReg
        };

        axios
            .post('http://localhost:8082/api/articles', data)
            .then(res => {
                this.setState({
                    id: '',
                    title: '',
                    author: '',
                    description: '',
                    keywords: [],
                    datePublishedReg: ''
                })
                this.props.history.push('/');
            })
            .catch(err => {
                console.log("Error in CreateArticle!");
            })
    };

    render() {
        return (
            <div className="CreateArticle">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br />
                            <Link to="/" className="btn btn-outline-warning float-left">
                                Search For Articles
                            </Link>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Add Article</h1>
                            <p className="lead text-center">
                                Create New Article
                            </p>

                            <form noValidate onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Title of the Article'
                                        name='title'
                                        className='form-control'
                                        value={this.state.title}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <br />

                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='ISBN'
                                        name='isbn'
                                        className='form-control'
                                        value={this.state.isbn}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Author'
                                        name='author'
                                        className='form-control'
                                        value={this.state.author}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Describe this article'
                                        name='description'
                                        className='form-control'
                                        value={this.state.description}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <div className='form-group'>
                                    <input
                                        type='date'
                                        placeholder='published_date'
                                        name='published_date'
                                        className='form-control'
                                        value={this.state.published_date}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Publisher of this Article'
                                        name='publisher'
                                        className='form-control'
                                        value={this.state.publisher}
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

export default CreateArticle;
