import "./style.scss";
import { Avatar, Divider, Input, Button, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import React from "react";
import { ticketAPI } from "api/tickets";
import { GetApiKey } from "utils/user";

interface MessageType {
  id: number;
  type: number;
  text: string;
  time: string;
}

interface ChatProps {
  messages: MessageType[];
  id?: number;
}

const Chat: React.FC<ChatProps> = ({ messages: initialMessages, id }) => {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    console.log("Sending message:", newMessage);
    if (newMessage.trim() !== "") {
      const newMsg: MessageType = {
        id: messages.length + 1,
        type: 0,
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
      sendMessage(id || 0, newMessage);
    }
  };
  const sendMessage = async (ticketId: number, messageContent: string) => {
    try {
      const response = await ticketAPI.addMessage(
        { ticket_id: ticketId, message: messageContent },
        GetApiKey() || "",
      );
    } catch (error) {
      message.error("Failed to send message");
    }
  };
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="rounded-lg px-0 py-0">
      <div className="custom-scrollbar max-h-[calc(100vh-480px)] grow space-y-4 overflow-y-auto px-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 0 ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`${
                msg.type === 1
                  ? "rounded-lg rounded-bl-sm rounded-br-3xl rounded-tl-3xl bg-[#e6f4f1]"
                  : "rounded-lg rounded-bl-3xl rounded-br-sm rounded-tr-3xl bg-[#e2e5e8]"
              } max-w-fit p-4`}
            >
              <p className="mr-4 text-sm sm:mr-10 md:mr-16">{msg.text}</p>
              <span className="float-right mt-2 text-xs text-[#697586]">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <Divider className="mt-2" />

      <div className="flex items-start gap-2">
        <Input.TextArea
          rows={1}
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button
          style={{ backgroundColor: "#2CA58D" }}
          type="primary"
          icon={<SendOutlined style={{ fontSize: "14px" }} />}
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default Chat;
