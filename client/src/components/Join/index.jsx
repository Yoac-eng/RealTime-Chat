import React, {useRef} from 'react'
import io from 'socket.io-client'
import './style.css'
import {Input, Button} from '@mui/material'

export default function Join({setChatVisibility, setSocket}) {

  const usernameRef = useRef();

  const handleSubmit = async () => {
    //Lógica pra verificar se uma mensagem foi digitada ou nao
    const username = usernameRef.current.value;
    if(!username.trim()){
      return
    }
    //Se conectar no back, criando uma instancia do socket
    const socket =  await io.connect("http://localhost:3001")
    //Socket.io trabalha com eventos emitidos e eventos escutados, tanto o front quanto o back
    //.emit irá enviar um evento com o nome "set_username" passando username pro socket
    socket.emit("set_username", username)
    //Passando a instancia do socket e a flag do chat pro componente pai sem redux
    setSocket(socket)
    setChatVisibility(true)
  }

  return (
    <div className="join-container">
      <h2>Real time chat</h2>
      <Input inputRef={usernameRef} placeholder='Nome de usuário' />
      <Button sx={{mt:2}} onClick={()=>handleSubmit()} variant="contained">Entrar</Button>
    </div>
  )
}
