const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  Post.findAll({
    order: [
      ['createdAt', 'DESC']
    ],
    where: {
      user_id: req.session.user_id,
    },
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
      res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/add-post", withAuth, (req, res) => {
  res.render("add-post", { loggedIn: req.session.loggedIn });
});

router.get("/edit-post/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).render("404");
        return;
      }

      const post = dbData.get({ plain: true });
      res.render("edit-post", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
