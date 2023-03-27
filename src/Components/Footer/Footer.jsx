import React from 'react'
import './Footer.css'
import logo from "./static-footer/logo-footer.svg"

function Footer(){
    return(
        <div className='footer'>
            <img className='footer_logo' src = {logo}></img>
           <div className = "footer_info">
                <p className = "info_font info_adress">г. Москва, Цветной б-р, 40 <br/> 
                +7 495 771 21 11 <br/> 
                info@skan.ru</p>
                <p className = "info_font info_rights" >Copyright. 2022</p>
           </div>
        </div>
    );

}

export default Footer