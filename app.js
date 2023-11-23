const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const Menina = require('./public/javascripts/Menina.js'); // Importa o modelo

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Para o fetch da selecao.js, dar find() no Menina.js e retornar para fazer a iteração nos dados para colocar na table
app.get('/meninas', async (req, res) => {
  try {
    const meninas = await Menina.find();
    res.json(meninas);
  } catch (error) {
    console.error('Erro ao obter meninas:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

//POST para o cadastro de meninas
app.post('/cadastrar_menina', async (req, res) => {
  try {
    const menina = new Menina(req.body);
    await menina.save();

    //AINDA PRECISO FAZER O REDIRECIONAMENTO CERTO
    console.log('Menina cadastrada com sucesso:', menina);
  } catch (error) {
    console.error('Erro ao cadastrar menina:', error);
  }
});

//

app.use(session({
  secret: 'goiaba', 
  resave: false,
  saveUninitialized: true,
}));

// view engine setup
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); 
app.use('/public', express.static(path.join(__dirname, 'public'))); // Configurar CSS com mustache
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/fonts/icomoon', express.static(path.join(__dirname, 'fonts/icomoon')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;