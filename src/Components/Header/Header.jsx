import React, { useState } from 'react'
import RegistrationBar from './RegistrationBar/RegistrationBar';
import "./Header.css"
import {ReactComponent as LogoHeader} from './static-header/logo-header.svg';
import {ReactComponent as FooterLogo} from "./../Footer/static-footer/logo-footer.svg"
import {Link} from "react-router-dom"
import "../../App.css"
import Menu from './HeaderMenu/Header-menu';
import Unregistered from './RegistrationBar/Unregistered/Unregistered';
import {ReactComponent as Sandwitch} from "./static-header/menu.svg"
import {ReactComponent as Cross} from "./static-header/cross.svg"
import { connect } from 'react-redux';

function Header(props){
    const [isOpen,newOpen] =useState(false)
    return(
        <div className ='header_full' style={{backgroundColor: isOpen ? "#029491": "white"}}>
             <Link to = "/">{isOpen ? <FooterLogo/>:<LogoHeader/>}</Link>
            <div className='header_menu'><Menu/></div> 
            <div className='register'><RegistrationBar/> </div>  
            <div className='sandwitch' onClick = {()=>newOpen (!isOpen)}>
                {isOpen ? <Cross/> : <Sandwitch/>}
                <div className='sandwitch_menu' style={{display: isOpen ? "flex":"none"}}>
                    <Menu/>
                    {props.isAuth ? "": <Unregistered/>}
                </div>
            </div>   
        </div>
    );
}
const mapStateToProps = function(state) {
    return {
      isAuth: state.login.isAuth
    }
  }

export default connect(mapStateToProps)(Header)