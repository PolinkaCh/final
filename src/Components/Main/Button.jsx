import React from 'react'
import "./Button.css"

function Button(props){
    const {title, func,dis} = props
    return(
        <button disabled = {dis} type="submit" onClick = {func} className='btn-main'>{title}</button>
    );

}

export default Button