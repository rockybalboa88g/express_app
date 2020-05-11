const express = require('express');
const router = express.Router();

const Articles = require('../models/articles')

// Request Get Article
router.get('/', (req, res) => {
    Articles.find()
        .then(article => res.json(article))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

// Request add new article
router.post('/add', (req, res) => {
    const newArticle = new Articles({
        title: req.body.title,
        article: req.body.article,
        authorname: req.body.authorname
    })
    newArticle.save()
    .then(() => res.json("The new article is added!"))
    .catch(err => res.status(400).json(`Error: ${err}`));
})

//  find by ID
router.get('/:id', (req, res) => {
    Articles.findById(req.params.id)
    .then(article => res.json(article))
    .catch(err => res.status(400).json(`Error: ${err}`));
})

// find by ID and update
router.put('/update/:id', (req, res) => {
    Articles.findById(req.params.id)
    .then(article => {
        article.title = req.body.title;
        article.article = req.body.article;
        article.authorname = req.body.authorname;

        article
            .save()
            .then(() => res.json("The Article is updated !!"))
            .catch(err => res.status(400).json(`Error: ${err}`))
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
})


//  find by id and delete
router.delete('/:id', (req, res) => {
    Articles.findByIdAndDelete(req.params.id)
    .then(() => res.json("The article is deleted"))
    .catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;