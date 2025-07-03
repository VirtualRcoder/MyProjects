// import React, { useState } from "react";
// import MessageBubble from "./MessageBubble";

// const ChatBot = ({ userData, initialBotReply }) => {

//     console.log(userData)
//   const [messages, setMessages] = useState([
//   {
//     sender: "bot",
//     text: initialBotReply,
//   },
//   {
//     sender: "user",
//     text: userData.question,
//   },
// ]);


//   const [newMessage, setNewMessage] = useState("");

//   const handleSend = async () => {
//     if (!newMessage.trim()) return;

//     const userMsg = { sender: "user", text: newMessage };
//     setMessages((prev) => [...prev, userMsg]);

//     try {
//         const res = await fetch("http://localhost:8000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: newMessage }),
//         });

//         const data = await res.json();
//         const botReply = { sender: "bot", text: data.response };

//         setMessages((prev) => [...prev, botReply]);
//     } catch (err) {
//         console.log(err)
//         setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "Sorry, I couldn't get a response from the server." },
//         ]);
//     }

//     setNewMessage(""); 
//     };


//   return (
// <div className="container">
//   <header className="chat-header">
//     <h2>✈️ Travel ChatBot</h2>
//   </header>
//   <div className="chat-area">
//     {messages.map((msg, index) => (
//       <MessageBubble key={index} sender={msg.sender} text={msg.text} />
//     ))}
//   </div>

//   <div className="input-area">
//     <input
//       type="text"
//       value={newMessage}
//       onChange={(e) => setNewMessage(e.target.value)}
//       placeholder="Type a message..."
//     />
//     <button onClick={handleSend}>Send</button>
//   </div>
// </div>
//   );
// };

// export default ChatBot;


import React, { useState } from "react";
import MessageBubble from "./MessageBubble";
import { useAuth0 } from "@auth0/auth0-react";
import FlightAccordion from "./FlightAccordion";

// const ChatBot = ({ userData, initialBotReply }) => {
const ChatBot = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [messages, setMessages] = useState([
    { sender: "bot", text:"Hi, HOW can i help you" },
    // { sender: "user", text: userData.question },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    const updatedMessages = [...messages, { sender: "user", text: newMessage }];
    setMessages(updatedMessages);

    const token = await getAccessTokenSilently();
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: newMessage }),
    });

    const data = await res.json();
    console.log(data)
    
    if (typeof data.response === "string") {
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } else {
      setMessages((prev) => [...prev, { sender: "bot", type: "flights", flights: data.response }]);
    }
    console.log(messages)
    setNewMessage("");
  };

  return (
    // <div className="chat-wrapper">
    //   <div className="chat-area">
    //     {messages.map((msg, i) => (
    //       <MessageBubble key={i} sender={msg.sender} text={msg.text} />
    //     ))}
    //   </div>
    //   <div className="input-area">
    //     <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
    //     <button onClick={handleSend}>Send</button>
    //   </div>
    // </div>
    <div className="container">
      <header className="chat-header">
        <h2>✈️ Travel ChatBot</h2>
      </header>
      
      <div className="chat-area">
        {messages.map((msg, index) => {
          if (msg.type === "flights") {
            return (
              <div key={index} className="flights-response">
                <h3>Best Flights</h3>
                {msg.flights.best_flights.map((flight, i) => (
                  <FlightAccordion key={`best-${i}`} title={`Best Option ${i + 1}`} flight={flight} />
                ))}

                <h3 style={{ marginTop: "20px" }}>Other Flights</h3>
                {msg.flights.other_flights.map((flight, i) => (
                  <FlightAccordion key={`other-${i}`} title={`Other Option ${i + 1}`} flight={flight} />
                ))}
              </div>
            );
          } else {
            return <MessageBubble key={index} sender={msg.sender} text={msg.text} />;
          }
        })}



      </div>




      <div className="input-area">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
