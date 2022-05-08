// const elastic = require('elasticsearch');
const { Client } = require('@elastic/elasticsearch')
const fs = require('fs');
const config = require('config');

// TODO: of course config should be an ENV dependent object
// and this is terrible security practice...

const elasticClient = new Client({
    node: config.get('localElasticURI'),
    auth: {
        "username": "elastic",
        "password": "qPM2x05T4Vb5pwYJAFrI",

    },
});

module.exports = elasticClient;
