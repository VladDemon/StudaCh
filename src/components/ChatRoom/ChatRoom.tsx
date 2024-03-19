import React, {useState, useEffect} from "react";
import { Socket} from "socket.io-client";
import * as io from "socket.io-client";
import'./ChatRoom.scss'
import {MessagesBody} from "./MessagesBody/MessagesBody";
import { nanoid } from "nanoid";



interface Message {
    message: string;
    chatUser: string;
    id?: string;
    socketId?: string;
}

const ChatRoom = () =>{ 
    const socketIo = io.connect('http://localhost:3001');
    const [inputValue, setInputValue] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> ) : void => {
        e.preventDefault();
        const user: string | null = localStorage.key(1);
        if(inputValue.trim() && localStorage.getItem(user) === "true"){
            const message: Message = {
                message: inputValue,
                chatUser: user || "",
                id: `${socketIo.id}-${nanoid()}`,
                socketId: socketIo.id,
            };
            socketIo.emit("message",  JSON.stringify(message))}
            setInputValue("");

    }

    

    return(
        <div className="chat">
                <MessagesBody socket={socketIo}/>
                <form className="chat__form" onSubmit={handleSubmit}>
                    <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                    <button type="submit" >Send</button>
                </form>
        </div>
    )
}

export default ChatRoom;
