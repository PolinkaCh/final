import React from "react";
import "./FormButton.css"

function AuthorisationButton (props){
    const {image} = props;
    return (
        <>
        <button className="formButton"><img src= {image.pic}></img></button>
        </>
    )
}
export default AuthorisationButton