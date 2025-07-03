import React, { useState } from "react";

const FlightAccordion = ({ flight }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className="flight-card"
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "12px",
        overflow: "hidden",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div
  className="accordion-header"
  onClick={() => setIsOpen(!isOpen)}
  style={{
    display: "flex",
    alignItems: "center",
    padding: "8px",             // Reduced from 12px to 8px
    backgroundColor: "#f7f9fc",
    cursor: "pointer",
    fontSize: "14px",           // Add smaller font size
    lineHeight: "1.4"           // Tighter spacing
  }}
>

        {flight.airline_logo && (
          <img
            src={flight.airline_logo}
            alt="airline"
            style={{ width: "40px", height: "40px", marginRight: "12px" }}
          />
        )}
          <strong>Normal</strong> <span>&#128336;{flight.total_duration}</span> {" "}
          <span>
            
            
            {flight.price}</span>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent accordion toggle
              setIsSelected((prev) => !prev); // Toggle selection
              console.log("Flight selection toggled:", flight);
            }}
            style={{
              backgroundColor: isSelected ? "green" : "#0052cc",
              color: "#fff",
              border: "none",
              padding: "6px 14px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "10px",
            }}
          >
            Select
          </button>
      </div>

      {isOpen && (
        <div className="accordion-body" style={{ padding: "14px", backgroundColor: "#ffffff" }}>
          {flight.segments.map((seg, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                borderBottom: index !== flight.segments.length - 1 ? "1px solid #eee" : "none",
              }}
              className="flight-Detail-Card"
            >
              <div
                style={{
                  justifySelf: "center",
                  alignSelf: "center",
                  textAlign: "center",
                  fontSize: "15px", // Slightly bigger font
                  padding: "6px 0",
                  lineHeight: "1.4",
                }}
              >
                <p style={{ margin: 0 }}>
                  <strong>{seg.airline}</strong> ({seg.flight_number})
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center", // Vertical alignment
                  border: "1px solid #ccc",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  fontSize: "12px", // Smaller font
                  flexWrap: "wrap", // Responsive
                  gap: "6px",
                }}
              >
                <p style={{ flex: 1, textAlign: "left", margin: 0 }}>
                  <strong>{seg.from}</strong><br />
                  {seg.departure_time}
                </p>
                
                <p style={{ fontSize: "18px", margin: "0 12px" }}>✈︎</p>
                
                <p style={{ flex: 1, textAlign: "right", margin: 0 }}>
                  <strong>{seg.to}</strong><br />
                  {seg.arrival_time}
                </p>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightAccordion;
