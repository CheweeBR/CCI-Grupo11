var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session && req.session.usuario) {
    res.render("index", {nome: "admin"});
  } else {
    res.redirect('/login');
  }
});

router.get('/Cadastro', function(req, res, next) {
  res.render("cadastro", null);
});

router.get('/login', function(req, res) {
  res.render("login", null);
});


module.exports = router;
