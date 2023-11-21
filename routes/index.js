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
    res.redirect('/');
  } else {
    res.render('login', { error: '⚠ Usuário ou senha inválidos' });
  }
});

router.get('/register', function(req, res) {
  res.render("register", null);
});

router.post('/register', function(req, res) {
  var username = req.body.username;
  var senha = document.getElementById("senha").value;
  var senha2 = document.getElementById("senha2").value;
  if (username == "" || senha == "" || senha2 == "") {
      alert("Preencha todos os campos");
      return false;
  }
  if (username.length < 5) {
      alert("Nome de usuário muito curto");
      return false;
  }
  if (senha != senha2) {
      alert("Senhas diferentes");
      return false;
  }

  user = {
      username: username,
      senha: senha    
  }
});


module.exports = router;