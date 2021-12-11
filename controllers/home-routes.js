const router = require('express').Router();
const { User, Post, Comment } = require("../models");

router.get("/", (req, res) => {
    Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    })
    .then(dbData => {
        const posts = dbData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });    
});


module.exports = router;
