const express = require('express');
const router = express.Router();
const config = require('config');
const thesaurus = config.get('thesaurus');

const elasticClient = require('../../config/elasticClient');

const nltkStopWords = new Set(config.get('nltkStopWords'));

// TODO: this doesn't belong here
for (k in thesaurus) {
    thesaurus[k] = new Set(thesaurus[k])
}

// Load Article model
const ScholarlyArticle = require('../../models/ScholarlyArticle');

// @route GET api/articles/test
// @description tests articles route
// @access Public
router.get('/test', (req, res) => res.send('article route testing!'));

// @route GET api/articles
// @description Get all articles
// @access Public
router.get('/', (req, res) => {
    console.log(req);
    ScholarlyArticle.find()
        .then(articles => res.json(articles))
        .catch(err => res.status(404).json({ noarticlesfound: 'No Articles found' }));
});

// @route GET api/search
// @description Get articles by key terms
// @access Public
router.get('/search', (req, res) => {
    console.log(req.query.data)
    // TODO: all this parsing should be in another module
    function parseText(text) {
        text = text.toLowerCase();
        console.log(Object.entries(thesaurus));
        // let matchedCategories = {}
        // remove duplicates with Set
        let words = new Set(text.split(/\s+/));
        let noStopWords = [...words].filter(w => !nltkStopWords.has(w))
            .reduce((acc, w) => {
                for (const k in thesaurus) {
                    console.log(thesaurus[k])
                    if (thesaurus[k].has(w)) {
                        acc['keys'] = new Set([...acc['keys'], ...thesaurus[k]])
                    }
                }
                return acc;
            }, { keys: new Set() });
        return noStopWords;
    }
    // discuss the usefulness of semantic search using euclidian distance
    // perhaps this could be a comparison vs human guided in this domain


    if (req.query.data) {
        // TODO: this is a security issue
        const parsed = JSON.parse(req.query.data);
        if (parsed.searchText) {
            const matches = parseText(parsed.searchText)

            if (matches.keys.size) {
                console.log(`found matches ${matches.keys}`);
                console.log(`object ${Object.entries(matches)}`);
                const q = [...matches.keys].join(' ');

                elasticClient.search({
                    index: 'scholarlyarticles',
                    body: {
                        query: {
                            match: {
                                description: q
                            }
                        }
                    }
                }).then(response => {
                    console.log(response)
                    if (response['statusCode'] && response['statusCode'] == 200) {
                        let hits = response.body.hits.hits;
                        // TODO: needs to get response from mongoose.  No time atm
                        obs = hits.map(x => {
                            return x['_source'];
                        })
                        res.json({ articles: obs })
                        // console.log(obs);
                        // sourceIds = hits.map(x => {
                        //     return x['_source']['id'];
                        // })
                        // if (sourceIds.length) {
                        //     // ScholarlyArticle.find({
                        //     //     'id': {
                        //     //         $in: sourceIds
                        //     //     }
                        //     // })
                        //     ScholarlyArticle.find()
                        //         .where('id')
                        //         .in(sourceIds)
                        //         .exec()
                        //         .then(response => {
                        //             console.log('articles')
                        //             res.json(response)
                        //         })
                        //         .catch(err => res.status(404).json({ noarticlesfound: 'No Articles found' }));
                        // }
                    }
                    // model.find({
                    //     '_id': { $in: [
                    //         mongoose.Types.ObjectId('4ed3ede8844f0f351100000c'),
                    //         mongoose.Types.ObjectId('4ed3f117a844e0471100000d'), 
                    //         mongoose.Types.ObjectId('4ed3f18132f50c491100000e')
                    //     ]}
                    // }, function(err, docs){
                    //      console.log(docs);
                    // });
                })


                // console.log(result)
                // compare keys to target list and expand search
                // this would be better done with an option for hte user
                // if we have time.  Anyways pass the search terms in
                // output should be organized according to directly related to search terms, vs 
                // inferred  

            }
        }
    }
    // res.status(404).json({ noarticlefound: 'No Article found' });
    // Article.find()
    //     .then(articles => res.json(articles))
    //     .catch(err => res.status(404).json({ noarticlesfound: 'No Articles found' }));
});

// @route GET api/articles/:id
// @description Get single article by id
// @access Public
router.get('/:id', (req, res) => {
    ScholarlyArticle.findById(req.params.id)
        .then(article => res.json(article))
        .catch(err => res.status(404).json({ noarticlefound: 'No Article found' }));
});

// @route GET api/articles
// @description add/save article
// @access Public
router.post('/', (req, res) => {
    // curl -d '{"title":"title", "isbn":"1234", "author": "author1", "description":"descrip1",  "published_date": "10/1/2012", "publisher":"publisher1"}' -H "Content-Type: application/json" -X POST http://localhost:8082/articles
    ScholarlyArticle.create(req.body)
        .then(article => res.json({ msg: 'Article added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add this article' }));
});

// @route GET api/articles/:id
// @description Update article
// @access Public
router.put('/:id', (req, res) => {
    ScholarlyArticle.findByIdAndUpdate(req.params.id, req.body)
        .then(article => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

// @route GET api/articles/:id
// @description Delete article by id
// @access Public
router.delete('/:id', (req, res) => {
    ScholarlyArticle.findByIdAndRemove(req.params.id, req.body)
        .then(article => res.json({ mgs: 'Article entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a article' }));
});

module.exports = router;