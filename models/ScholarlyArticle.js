// models/ScholarlyArticle.js

const mongoose = require('mongoose');

const ScholarlyArticleSchema = new mongoose.Schema({
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
}, { collection: 'scholarlyarticles' });

module.exports = ScholarlyArticle = mongoose.model('ScholarlyArticle', ScholarlyArticleSchema);
