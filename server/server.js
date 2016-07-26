let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');

// let decorate = require('./alphadeltaninerniner.service');
// let auth = require('./auth');

// checkForEnvironmentVariables(['FB_ID', 'FB_SECRET', 'SESSION_SECRET']);

let sessionMiddleware = session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});
// middleware configuration
let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(sessionMiddleware);
// app.use(auth.passport.initialize());
// app.use(auth.passport.session());
// app.use(auth.routes);
app.use(express.static(__dirname + '/../public'));
// app.use(auth.isAuth, express.static(__dirname + '/../dist'));
app.use(express.static(__dirname + '/../dist'));
// let server = decorate(app, sessionMiddleware);

var port = process.env.PORT || 4000;

app.listen(port, () => {
    
  console.log('Listening to :', port);
});

// module.exports = server;

// function checkForEnvironmentVariables(arr) {
//   console.log(process.env.NODE_ENV, 'NODE_ENV');
//   arr.forEach(v => {
//     if (!process.env[v]) {
//       // throw new Error(`environment variable ${v} not defined`);
//       process.env[v] = 'test';
//     }
//   });
// };
