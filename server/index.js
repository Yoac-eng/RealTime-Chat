const app = require('express')()
//Criando servidor com a instancia do express
const server = require('http').createServer(app)
//Passando cors e um objeto com algumas configurações, no caso do cors (limitar as requisicoes só para essa origin)
const io = require('socket.io')(server, {cors: {origin: "http://localhost:5173"}})

const PORT = 3001;

server.listen(PORT, () => console.log("Server running 🥶"))