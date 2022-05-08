import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ArticleCard from './ArticleCard';

class ShowArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            articles: []
        };
    }

    componentDidMount() {
        // axios
        //     .get('http://localhost:8082/api/articles')
        //     .then(res => {
        //         this.setState({
        //             articles: res.data
        //         })
        //     })
        //     .catch(err => {
        //         console.log('Error from ShowArticleList');
        //     })
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSearchClick = e => {
        // e.preventDefault();
        debugger;
        const data = {
            searchText: this.state.searchText
        };
        console.log(this.state)

        axios
            .get(
                'http://localhost:8082/api/articles/search/', {
                params: {
                    data
                }
            })
            .then(res => {
                // update parent here
                debugger;
                this.setState({
                    // searchText: ''
                    articles: res.data.articles
                })
                // I think this may be tied to form submission and can be removed
                this.props.history.push('/');
            })
            .catch(err => {
                console.log("Error in Search!");
            })

    }

    render() {
        const articles = this.state.articles;
        console.log("PrintArticle: " + articles);
        let articleList;

        if (!articles) {
            articleList = "there is no article recored!";
        } else {
            articleList = articles.map((article, k) =>
                <ArticleCard article={article} key={k} />
            );
        }

        return (

            <div className="ShowArticleList">
                <div className="container">
                    <div className="searchBar form-group">
                        <div className='row'>
                            <input
                                type='text'
                                placeholder='How would you like to improve your robot?'
                                name='searchText'
                                className='form-control col'
                                defaultValue={this.state.searchText}
                                onChange={this.onChange}
                            />
                            {/* <div className='col'> */}
                            {/* <button type="button"
                                className="col-1 btn btn-outline-danger btn-lg btn-block search-icon-svg"
                                onClick={this.onSearchClick()}
                            > */}
                            {/* <img src={searchIcon} alt="blah" /> */}
                            {/* </button> */}
                            {/* <br /> */}

                            <div class="search-icon-svg" onClick={this.onSearchClick.bind(this)}></div>
                            {/* </div> */}
                        </div>

                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <br />
                            <h2 className="display-4 text-center"></h2>
                        </div>

                        {/* <div className="col-md-11">
                            <Link to="/create-article" className="btn btn-outline-warning float-right">
                                + Add New Article
                            </Link>
                            <br />
                            <br />
                            <hr />
                        </div> */}

                    </div>

                    <div className="list">
                        {articleList}
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowArticleList;
