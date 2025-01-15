import React, { useState } from "react";
import Button from "./Button"; // Import your custom Button component

function AiChat() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
      ]);
      setInput(""); // Clear input after sending
      // Simulate AI response (replace with actual API call)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "This is a response from the AI.", sender: "ai" },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {/* Minimized Chat Icon */}
      {!isExpanded && (
        <Button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="p-3 !border-0 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
          <span className="material-icons">chat</span>
        </Button>
      )}

      {/* Expanded Chatbox */}
      {isExpanded && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-t-lg">
            <h2 className="text-lg font-semibold">AI Chat</h2>
            <Button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="p-1 !border-0 hover:bg-blue-700 rounded-full"
            >
              <span className="material-icons">close</span>
            </Button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

    
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                placeholder="Type a message..."
              />
              <Button
                type="submit"
                className="ml-2 p-2 !border-0 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <span className="material-icons">send</span>
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AiChat;