import React from "react";
import {Link} from "react-router-dom"
import "./Header-menu.css"

function Menu (){
    return (<>
    <div className ='header_navigation'>
                <Link to = "/" className='link'><div className='header_navigation_item'>Главная</div></Link>
                <Link to = "/development" className='link'><div className='header_navigation_item'>Тарифы</div></Link>
                <Link to = "/development"className='link'><div className='header_navigation_item'>FAQ</div></Link>
    </div>
    </>)
}

export default Menu