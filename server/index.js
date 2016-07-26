let server = require('./server');
let db = require('./models/config');

let port = process.env.PORT || 3000;
db.sync().then(() => {
  server.listen(port, () => {
    
    console.log('Listening to port:', port);
  });
});
