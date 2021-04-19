const http = require('http');
const { mainModule } = require('node:process');
const app = require('./app.js');
const User = require('./database.js')

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



