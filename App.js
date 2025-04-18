
import React, { useState } from "react";
import { Card, CardContent } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { InputGroup, FormControl } from "react-bootstrap";
import { Plus, Trash2 } from "lucide-react";

const ChatApp = () => {
  const [chats, setChats] = useState([
    { id: 1, name: "Juan", messages: [] },
  ]);
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const addChat = () => {
    const newId = Date.now();
    setChats([...chats, { id: newId, name: "Nuevo Chat", messages: [] }]);
    setSelectedChat(newId);
  };

  const deleteMessage = (msgIndex) => {
    setChats(
      chats.map((chat) =>
        chat.id === selectedChat
          ? {
              ...chat,
              messages: chat.messages.filter((_, i) => i !== msgIndex),
            }
          : chat
      )
    );
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setChats(
      chats.map((chat) =>
        chat.id === selectedChat
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { text: newMessage, sender: "me", time: new Date().toLocaleTimeString() },
              ],
            }
          : chat
      )
    );
    setNewMessage("");
  };

  const currentChat = chats.find((chat) => chat.id === selectedChat);

  return (
    <div className="grid grid-cols-3 h-screen bg-[#121B22] text-white">
      <div className="border-r border-gray-700 p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <Button onClick={addChat} className="w-full"> <Plus className="mr-2" /> Nuevo Chat </Button>
        <div className="space-y-2 mt-4">
          {chats.map((chat) => (
            <Card
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`cursor-pointer p-2 ${chat.id === selectedChat ? "bg-[#1f2c33]" : "bg-[#202C33]"}`}
            >
              <CardContent className="text-white">{chat.name}</CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="col-span-2 flex flex-col">
        <div className="bg-[#202C33] p-4 font-bold text-lg border-b border-gray-700">{currentChat?.name}</div>
        <div className="flex-1 p-4 space-y-3">
          {currentChat?.messages.map((msg, index) => (
            <div
              key={index}
              className="flex justify-end items-center space-x-2"
            >
              <div className="bg-[#25D366] text-black rounded-xl px-4 py-2 max-w-xs">
                <div className="text-sm">{msg.text}</div>
                <div className="text-xs text-right text-gray-700">{msg.time}</div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteMessage(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex p-4 border-t border-gray-700 bg-[#202C33]">
          <InputGroup className="mr-2">
            <FormControl
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
            />
          </InputGroup>
          <Button onClick={sendMessage}>Enviar</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
    