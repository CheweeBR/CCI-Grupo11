var express = require('express');
var router = express.Router();
const EmailValidator = require("email-validator");
const User = require('../models/User.js');

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

router.post('/login', async function(req, res) {
  const {username, password} = req.body;

  try {
    const user = await User.find(username);

    if (user.password == password) {
      req.session.usuario = username;
      res.redirect('/');
    } else {
      res.render('login', { error: '⚠ Usuário ou senha inválidos' });
    }
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.render('login', { error: '⚠ Usuário ou senha inválidos' });
  }
});

router.get('/register', function(req, res) {
  res.render("register", null);
});

router.post('/register', async function(req, res) {
  const {email, username, password, password2} = req.body;

   if(!EmailValidator.validate(email)){
      res.render('register', { error: '⚠ E-mail inválido' });
      return false;
  } else if (username.length < 5) {
      res.render('register', { error: '⚠ Nome de usuário muito curto' });
      return false;
  } else if (password != password2) {
      res.render('register', { error: '⚠ Senhas diferentes' });
      return false;
  }

  const user = new User(req.body);
  await user.save();
  res.render('login', { sucess: 'Cadastro realizado com sucesso!' });
});

router.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error'); 
});


module.exports = router;