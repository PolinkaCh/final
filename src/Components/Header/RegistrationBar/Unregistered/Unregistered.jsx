import React from 'react' 
import './Unregistered.css'
import {Link} from "react-router-dom"


function Unregistered(){
    return (    
        <div className='unregistered'>
            <Link className = "link" to = "/development">
                <button className='btn btn_registartion'>Зарегистрироваться</button>
            </Link>
            <div className='line'></div>
            <Link className = "link" to = "/authorisation">
                <button className='btn btn_login'>Войти</button>
            </Link>
        </div>
    )
}

export default Unregistered