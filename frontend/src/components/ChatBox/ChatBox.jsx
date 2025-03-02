import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { addMessage, getMessages } from "../../api/MessageRequests";
import { getUser } from "../../api/UserRequests";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();

  const handleChange = (newMsg) => {
    setNewMessage(newMsg);
  };

  // grab header stuff
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
        console.log("got the chat buddy", data);
      } catch (error) {
        console.log("user fetch tanked", error);
      }
    };
    if (chat) getUserData();
  }, [chat, currentUser]);

  // snag messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
        console.log("messages loaded yay", data);
      } catch (error) {
        console.log("messages broke rip", error);
      }
    };
    if (chat) fetchMessages();
  }, [chat]);

  // scroll to newest msg
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // send a msg
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      chatId: chat._id,
      senderId: currentUser,
      text: newMessage,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);

    setSendMessage({ ...message, receiverId }); // socket stuff
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
      console.log("msg sent hell yeah", data);
    } catch (error) {
      console.log("send failed oof", error);
    }
  };

  // catch incoming msg
  useEffect(() => {
    console.log("new msg dropped", receivedMessage);
    if (receivedMessage && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const imageRef = useRef();

  return (
    <div className="ChatBox-container">
      {chat ? (
        <>
          <div className="chat-header">
            <div className="follower">
              <div>
                <img
                  src={
                    userData?.profilePicture
                      ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
                      : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
                  }
                  alt="profile"
                  className="followerImage"
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="name" style={{ fontSize: "0.9rem" }}>
                  <span>
                    {userData?.firstname} {userData?.lastname}
                  </span>
                </div>
              </div>
            </div>
            <hr style={{ width: "95%", border: "0.1px solid #ececec", marginTop: "20px" }} />
          </div>
          <div className="chat-body">
            {messages.map((msg) => (
              <div
                ref={scroll}
                className={msg.senderId === currentUser ? "message own" : "message"}
              >
                <span>{msg.text}</span>
                <span>{format(msg.createdAt)}</span>
              </div>
            ))}
          </div>
          <div className="chat-sender">
            <div onClick={() => imageRef.current.click()}>+</div>
            <InputEmoji value={newMessage} onChange={handleChange} />
            <div className="send-button button" onClick={handleSend}>
              Send
            </div>
            <input type="file" style={{ display: "none" }} ref={imageRef} />
          </div>
        </>
      ) : (
        <span className="chatbox-empty-message">Pick a chat to start yappin...</span>
      )}
    </div>
  );
};

export default ChatBox;