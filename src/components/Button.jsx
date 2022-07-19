import React from "react";
import "./Button.css";

const Button = props => {
    let className = "button ";
    className += props.operation ? "operation" : "";
    className += props.double ? "double" : "";
    className += props.triple ? "triple" : "";

    return (
        <button className={className} onClick={e => props.click && props.click(props.label)}>
            {props.label}
        </button>
    )
}

export default Button;