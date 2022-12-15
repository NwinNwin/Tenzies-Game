import React from "react";

export default function Die(props){
    return (
        <div className= {props.isHeld ? "dice dice-held" : "dice"}>
            <h1 className="dice-num">{props.value}</h1>
        </div>
    )
}