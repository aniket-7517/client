import React from "react";
import "./home.css";

function HomePage() {
  const style = {
    textAlign: "center",
    fontSize: "100px",
    textTransform: "uppercase",
    color: "#222",
    letterSpacing: "1px",
    fontFamily: "Playfair Display, serif",
    marginTop: "200px",
    fontWeight: "400",
  };

  return (
    <div>
      <div className="nine">
        <h4 style={style}>
          Task Management<span> Web Application</span>
        </h4>
      </div>
    </div>
  );
}

export default HomePage;
