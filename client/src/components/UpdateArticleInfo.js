import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class UpdateArticleInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            isbn: '',
            author: '',
            description: '',
            published_date: '',
            publisher: ''
        };
    }

    componentDidMount() {
        // console.log("Print id: " + this.props.match.params.id);
        axios
            .get('http://localhost:8082/api/articles/' + this.props.match.params.id)
            .then(res => {
                // this.setState({...this.state, article: res.data})
                this.setState({
                    title: res.data.title,
                    isbn: res.data.isbn,
                    author: res.data.author,
                    description: res.data.description,
                    published_date: res.data.published_date,
                    publisher: res.data.publisher
                })
            })
            .catch(err => {
                console.log("Error from UpdateArticleInfo");
            })
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            title: this.state.title,
            isbn: this.state.isbn,
            author: this.state.author,
            description: this.state.description,
            published_date: this.state.published_date,
            publisher: this.state.publisher
        };

        axios
            .put('http://localhost:8082/api/articles/' + this.props.match.params.id, data)
            .then(res => {
                this.props.history.push('/show-article/' + this.props.match.params.id);
            })
            .catch(err => {
                console.log("Error in UpdateArticleInfo!");
            })
    };


    render() {
        return (
            <div className="UpdateArticleInfo">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br />
                            <Link to="/" className="btn btn-outline-warning float-left">
                                Show BooK List
                            </Link>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Edit Article</h1>
                            <p className="lead text-center">
                                Update Article's Info
                            </p>
                        </div>
                    </div>

                    <div className="col-md-8 m-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className='form-group'>
                                <label htmlFor="title">Title</label>
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
                                <label htmlFor="isbn">ISBN</label>
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
                                <label htmlFor="author">Author</label>
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
                                <label htmlFor="description">Description</label>
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
                                <label htmlFor="published_date">Published Date</label>
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
                                <label htmlFor="publisher">Publisher</label>
                                <input
                                    type='text'
                                    placeholder='Publisher of this Article'
                                    name='publisher'
                                    className='form-control'
                                    value={this.state.publisher}
                                    onChange={this.onChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Article</button>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

export default UpdateArticleInfo;
