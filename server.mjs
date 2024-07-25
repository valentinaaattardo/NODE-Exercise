
import { createServer } from 'node:http';


const server = createServer((request, response) => {
    console.log('Richiesta ricevuta');

   
    response.statusCode = 200;


    response.setHeader('Content-Type', 'text/html');

   
    response.end('<html><body><h1>Questa pagina è servita con Node.js!</h1><p>Benvenuto nel mio server HTTP con moduli ES6!</p></body></html>');
});

server.listen(3000, () => {
    console.log('Server in esecuzione su http://localhost:3000');
});