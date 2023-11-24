var express = require('express');
var router = express.Router();
const User = require('../public/javascripts/User.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session && req.session.usuario) {
    res.render("index", {nome: "admin"});
  } else {
    res.redirect('/login');
  }
});

router.get('/Cadastro', function(req, res, next) {
  if (req.session && req.session.usuario) {
    res.render("cadastro", null);
  } else {
    res.redirect('/login');
  }
});

router.get('/login', function(req, res) {
  res.render("login", null);
});

router.post('/login', function(req, res) {
  var usuario = req.body.usuario;
  var senha = req.body.senha;
  if (usuario == "admin" && senha == "admin") {
    req.session.usuario = usuario;
    res.redirect('/');
  } else {
    res.render('login', { error: '⚠ Usuário ou senha inválidos' });
  }
});

router.get('/register', function(req, res) {
  res.render("register", null);
});

router.post('/register', async function(req, res) {
  const {username, password, password2} = req.body;

  if (username == "" || password == "" || password2 == "") {
      alert("Preencha todos os campos");
      return false;
  }
  if (username.length < 5) {
      alert("Nome de usuário muito curto");
      return false;
  }
  if (password != password2) {
      alert("Senhas diferentes");
      return false;
  }

  const user = new User(req.body);
  await user.save();
  res.redirect('/login');
});

router.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error'); 
});


module.exports = router;