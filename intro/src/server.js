const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;

try{

    const server = http.createServer(app);

    app.use(function(req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
      next();
   });

    server.listen(port, () => {
    console.log(`Aplikacija je aktivna na adresi http://localhost:${port}`);

  });
 }
 catch(error)
 {
   console.log('Server neuspesno pokrenut')
   console.error(error);
 }



