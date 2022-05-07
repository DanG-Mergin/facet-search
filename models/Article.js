// models/Article.js

const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    id: {
        type: String
    },
    title: {
        type: String,

    },
    isbn: {
        type: String,

    },
    author: {
        type: String,

    },
    description: {
        type: String
    },
    keywords: {
        type: Array
    },
    datePublishedReg: {
        type: Date
    }
});

module.exports = Article = mongoose.model('article', ArticleSchema);
