import React, { useState } from "react";
import "react-resizable/css/styles.css";
import Button from "./Button";
import { Rnd } from "react-rnd";
import { model } from "../conf/conf";


function AiChat() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [size, setSize] = useState({ width: 320, height: 384 });
  const [state, setState] = useState({
    width: 400,
    height: 400,
    x: -400,
    y: -400,
  });

  

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
      ]);
      setInput("");
      try {
        const result = await model.generateContent(input);
        const response = await result.response;
        const text = response.text();

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: text, sender: "ai" },
        ]);
      } catch (error) {
        console.error("Error calling Gemini API:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Sorry, something went wrong. Please try again.", sender: "ai" },
        ]);
      }
    }
  };

  const onResize = (event, { size }) => {
    setSize(size);
  };

  return (
    <div className="fixed bottom-4 right-4">
      {!isExpanded && (
        <Button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="p-3 !border-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full shadow-lg hover:from-cyan-600 hover:to-blue-700 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
        >
          <span className="material-icons">chat</span>
        </Button>
      )}

      {isExpanded && (
        <Rnd
          size={{ width: state.width, height: state.height }}
          position={{ x: state.x, y: state.y }}
          onDragStop={(e, d) => {
            setState((prevState) => ({
              ...prevState,
              x: d.x,
              y: d.y,
            }));
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            setState((prevState) => ({
              ...prevState,
              width: ref.style.width,
              height: ref.style.height,
              x: position.x,
              y: position.y,
            }));
          }}
        >
          <div
            style={{ width: state.width, height: state.height }}
            className="bg-gray-900 rounded-lg shadow-lg flex flex-col border border-cyan-500/20"
          >
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-800 to-blue-900 text-white rounded-t-lg">
              <h2 className="text-lg font-semibold">AI Assistant</h2>
              <Button
                onClick={() => setIsExpanded((prev) => !prev)}
                className="p-1 !border-0 rounded-full text-white hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
              >
                <span className="material-icons">close</span>
              </Button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-800">
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
                        ? "bg-gradient-to-r from-cyan-600 to-blue-700 text-white"
                        : "bg-gray-700 text-gray-200"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-cyan-500/20">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 p-2 bg-gray-700 text-white rounded-lg outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
                  placeholder="Type a message..."
                />
                <Button
                  type="submit"
                  className="ml-2 p-2 !border-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
                >
                  <span className="material-icons">send</span>
                </Button>
              </div>
            </form>
          </div>
        </Rnd>
      )}
    </div>
  );
}

export default AiChat;