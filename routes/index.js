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

router.post('/login', function(req, res) {
  var usuario = req.body.usuario;
  var senha = req.body.senha;
  if (usuario == "admin" && senha == "admin") {
    req.session.usuario = usuario;
    res.status(200).send(`Login bem-sucedido para ${username}`);
    res.redirect('/');
  } else {
    alert("Usuário ou senha inválidos");
    res.redirect('/login');
  }
});

router.get('/register', function(req, res) {
  res.render("register", null);
});


module.exports = router;