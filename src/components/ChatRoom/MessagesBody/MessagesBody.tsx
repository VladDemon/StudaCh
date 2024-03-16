import { FC, useState } from 'react'
import { useEffect } from 'react'
import { Socket } from 'socket.io-client';



interface Message {
    message: string;
    chatUser: string;
    id?: string;
    socketId?: string;
}

interface MessagesBodyProps {
    socket: Socket;
}

export const MessagesBody : FC<MessagesBodyProps> = ({socket}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    useEffect(() => {
        const messageBody = document.querySelector('.MessagesBody');
        if (messageBody) {
            messageBody.scrollTo(0, messageBody.scrollHeight);
        }
    }, [messages]);

    useEffect(() => {
        const GetMessages = (messages : Message[]) => {
            setMessages(messages);
        }
        socket.on('init', GetMessages);
        return () => {
            socket.off('init', GetMessages);
        };
    }, [socket])


    useEffect(() => {
        const handleAddMessage = (message: Message) => {
            setMessages(prevMessages => [...prevMessages, message]);
            console.log(message)
        };
        socket.on('res', handleAddMessage)
        return () => {
            socket.off('res', handleAddMessage);
        };
    }, [socket])


    return (
        <div className='MessagesBody'>
            <ul>
                {messages.map((msg, index) => 
                    msg.chatUser === sessionStorage.key(0) ? (
                        
                        <li className='userMsg' key={msg.id}>{msg.chatUser} : {msg.message}</li>
                    ) : (
                        <li key={index}>{msg.chatUser} : {msg.message}</li>
                    )
                
                )}
            </ul>
        </div>
    )
}
