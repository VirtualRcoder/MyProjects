import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import ChatBot from "./Chatbot";

const TravelForm = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    travellers: "",
    departure: "",
    arrival: "",
    question: "",
  });

  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!isAuthenticated) {
      alert("Please login to continue to chat.");
      return;
  }

  const token = await getAccessTokenSilently();

  try {

    const res = await fetch("http://localhost:8000/travelform", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    const botReply = data.response;

    // Pass formData and first bot reply
    setSubmitted({ formData, botReply });
  } catch (err) {
    console.log(err)
    alert("Failed to connect to chatbot backend.");
  }
};


  return (
    <>
      {!submitted ? (
        <div className="container">
        <div className="form-wrapper">
          <h2 className="form-title">Travel Details</h2>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="place"
              placeholder="Destination"
              value={formData.place}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="travellers"
              placeholder="Number of Travellers"
              value={formData.travellers}
              onChange={handleChange}
              required
            />  
            <input
              type="date"
              name="departure"
              placeholder="departure dat"
              value={formData.departure}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="arrival"
              value={formData.arrival}
              onChange={handleChange}
              required
            />
            <textarea
              name="question"
              placeholder="Ask your travel question..."
              value={formData.question}
              onChange={handleChange}
              required
              rows="3"
            />
            <button type="submit">Submit & Start Chat</button>
          </form>
        </div>
        </div>
      ) : (
        <ChatBot userData={submitted.formData} initialBotReply={submitted.botReply} />
      )}
    </>
  );
};

export default TravelForm;
