const router = require("express").Router();
const { render } = require("express/lib/response");
const { User, Post, Comment } = require("../models");

router.get("/", (req, res) => {
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      },
    ],
  })
    .then((dbData) => {
      const posts = dbData.map((post) => post.get({ plain: true }));
      res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;
