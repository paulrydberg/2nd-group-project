
const path = require("path");
const router = require('express').Router();
var db = require('../models');

module.exports = function (app) {
  // Load index page
  app.get('/', '/blog', function (req, res) {
    res.render(renderBlog);
  });

  // Load example page and pass in an example by id
  app.get('/expenses', function (req, res) {
    res.render('expenses');
  });

  router.get("/cms", function (req, res) {
    res.render('cms');
  });

  // Render 404 page for any unmatched routes
  app.get('*', function (req, res) {
    res.render('404');
  });

  function renderBlog(req, res) {
    var query = {};
    if (req.query.expense_id) {
      query.ExpenseId = req.query.expense_id;
    }
    db.Post.findAll({
      where: query,
      include: [db.Expense]
    }).then(function (posts) {
      res.render('blog', { posts: posts })
    });
  }
};
