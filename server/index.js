const app = require('express')()
//Criando servidor com a instancia do express
const server = require('http').createServer(app)
//Passando cors e um objeto com algumas configurações, no caso do cors (limitar as requisicoes só para essa origin)
const io = require('socket.io')(server, {cors: {origin: "http://localhost:5173"}})

const PORT = 3001;

//Primeiro argumento: nome do evento recebido, no caso evento de conexão do front 
//recebe a instancia do socket q ele esta se conectando
io.on('connection', socket => {
  console.log("Usuario conectado, id do socket: ", socket.id);

  //No caso desse método on ele está ouvindo um evento com nome reservado, no caso, "disconnect"
  socket.on("disconnect", reason => {
    console.log("Usuário desconectado :", socket.id)
  })

  //.on é o método que vai "ouvir" o evento enviado pelo front
  socket.on("set_username", username => {
    //Vamos armazenar o valor recebido pelo socket no back aqui nessa propreidade "data" que existe
    //no socket, mas em uma aplicação real seria no banco ou algo do tipo
    socket.data.username = username;
  })

  socket.on("message", text => {
    //uma vez recebida a mensagem pela conexão do socket
    //O servidor (io) deve retornar para o front a mensagem pro front(pois nesse contexto de chat a mensagem vai ser enviada por uma pessoa para que varias vejam)
    io.emit('receive_message', {
      text,
      authorId: socket.id,
      author: socket.data.username
    })
  })
})

server.listen(PORT, () => console.log(`Server running on port 🥶 ${PORT}`))