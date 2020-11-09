import React from "react";
import "./styles/Button.css";

function Button(props) {
  return (
    <div className="btn" onClick={props.handleClick}>
      {props.children}
    </div>
  );
}

export default Button;
