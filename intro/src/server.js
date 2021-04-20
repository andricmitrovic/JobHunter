const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

try{

    const server = http.createServer(app);

    server.listen(port, () => {
    console.log(`Aplikacija je aktivna na adresi http://localhost:${port}`);

  });
 }
 catch(error)
 {
   console.log('Server neuspesno pokrenut')
   console.error(error);
 }



