
const mongoose = require('mongoose');
const elasticClient = require('../config/elasticClient');
const ScholarlyArticle = require('./ScholarlyArticle');

const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');



async function BuildIndexes() {
    let articles = async () => {
        for (var i = 886; i <= 886; i++) {
            try {
                const j = `articles_${i}.jsonl`;
                const rl = createInterface({
                    input: createReadStream(`./articles_${i}.jsonl`),
                    crlfDelay: Infinity
                });

                rl.on('line', (line) => {
                    let {
                        id,
                        title,
                        isbn,
                        description,
                        keywords,
                        datePublishedReg
                    } = JSON.parse(line)
                    const art = {
                        id,
                        title,
                        isbn,
                        description,
                        keywords,
                        datePublishedReg
                    }
                    ScholarlyArticle.create(art)
                        .then(function (article) {
                            console.log(article);
                            let { id,
                                title,
                                isbn,
                                description,
                                keywords,
                                datePublishedReg } = article;
                            elasticClient.index({
                                index: 'scholarlyarticles',
                                body: {
                                    id,
                                    title,
                                    isbn,
                                    description,
                                    keywords,
                                    datePublishedReg
                                }
                            })
                        })
                        .then(article => {

                            console.log({ article })
                        })
                        .catch(err => console.log(err));
                });

                await once(rl, 'close');

                console.log('File processed.');
            } catch (err) {
                console.error(err);
            }
        }
    }
    await articles();
    await ScholarlyArticle.find()
        .then(articles => console.log(articles))
        .catch(err => console.log(err));
}

module.exports = BuildIndexes;
