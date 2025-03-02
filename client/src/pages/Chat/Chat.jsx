import React, { useRef, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Coversation/Conversation";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import NavIcons from "../../components/NavIcons/NavIcons";
import "./Chat.css";
import { useEffect } from "react";
import { userChats } from "../../api/ChatRequests";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const socket = useRef()


  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io('http://localhost:8800');
    socket.current.emit('new-user-add', user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage)
    }
  }, [sendMessage]);


  // Get the message from socket server
  useEffect(() => {
    socket.current.on('recieve-message', (data) => {

      setReceiveMessage(data)
    }

    );
  }, []);


  const checkOnlineStatus = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user._id)
    const online = onlineUsers.find((user) => user.userId === chatMembers)
    return online ? true : false
  }

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chats) => (
              <div
                onClick={() => {
                  setCurrentChat(chats);
                }}
              >
                <Conversation
                  data={chats}
                  currentUser={user._id}
                  online={checkOnlineStatus(chats)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receiveMessage}
        />
      </div>
    </div>
  );
};

export default Chat
