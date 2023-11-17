var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index", {nome: "admin"});
});

router.get('/Cadastro', function(req, res, next) {
  res.render("cadastro", null);
});

module.exports = router;
