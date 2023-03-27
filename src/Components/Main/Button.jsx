import React from 'react'
import "./Button.css"

function Button(props){
    const {title, func,dis} = props
    return(
        <button disabled = {dis} type="submit" onClick = {func} className='btn-main' style={{backgroundColor: title === "Перейти в личный кабинет" ? "#D2D2D2":"#5970FF",
                                                                                            color: title === "Перейти в личный кабинет" ? "black" : "white"}}>{title}</button>
    );

}

export default Button