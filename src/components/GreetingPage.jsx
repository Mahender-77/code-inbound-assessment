import React from 'react'
import { useNavigate } from 'react-router-dom'
function GreetingPage() {
    const navigate=useNavigate()
  return (
    <div
    style={{
        fontSize: "4rem",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        paddingTop: "8rem",
        fontWeight: "600",
        lineHeight: "1.2",
    }}
>
    <h1 style={{ margin: "0", color: "#1a1a1a" }}>Welcome</h1>
    <button
        style={{
            marginTop: "2rem",
            padding: "0.75rem 1.5rem",
            fontSize: "1.25rem",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        onClick={()=>navigate(`/survey`)}
    >
        Start
    </button>
</div>

  )
}

export default GreetingPage