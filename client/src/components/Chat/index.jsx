import React, { useEffect, useRef, useState } from 'react'
import {Input} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import './style.css'

export default function Chat({socket}) {

  const messageRef = useRef()
  const [messageList, setMessageList] = useState([])

  useEffect(() => {
    //Listener verificando se o back enviou alguma mensagem
    socket.on('receive_message', data => {
      setMessageList((current) => [...current, data])
    })

    //Como o socket vai renderizar mais de uma vez, esse useEffect vai rodar mais de uma vez, então
    //.off desliga o listener do evento passado
    return () => socket.off("receive_message")
  }, [socket])
  
  const handleSubmit = () => {
    //Lógica pra verificar se uma mensagem foi digitada ou nao
    const message = messageRef.current.value;
    if(!message.trim()){
      return
    }

    //Setar evento de enviar o texto da mensagem
    socket.emit('message', message)
    clearInput()
    focusInput()
  }

  const clearInput = () => {
    messageRef.current.value = "";
  }

  const focusInput = () => {
    messageRef.current.focus()
  }

  const getEnterKey = (e) => {
    if(e.key === 'Enter')
      handleSubmit()
  }

  return (
    <div className="chat-container">
      <div className="chat-body">
        {
          messageList.map((message, index) => (
            <div className={`message-container ${message.authorId === socket.id && "message-mine"}`} key={index}>
              <div className='message-author'><strong>{message.authorId === socket.id ? `Eu (${message.author})` : message.author}</strong></div>
              <div className="message-text">{message.text}</div>
            </div>
            ))
        }
      </div>
      <div className="chat-footer">
        <Input inputRef={messageRef} placeholder='Mensagem' onKeyDown={(e)=>getEnterKey(e)} fullWidth />
        <SendIcon sx={{m:1, cursor: 'pointer'}} onClick={()=>handleSubmit()}color="primary"/>
      </div>
    </div>
  )
}
