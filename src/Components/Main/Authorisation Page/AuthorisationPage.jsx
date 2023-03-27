import React from 'react'
import "./AuthorisationPage.css"
import {ReactComponent as Characters} from "./static-Authorisation-Page/Characters.svg"
import {ReactComponent as Lock} from "./static-Authorisation-Page/lock.svg"
import RegisterForm from "./Authorisation-page-form/AuthorisationPageForm.jsx"
import './../Main.css'

function AuthorisationPage(){
    return(
        <div className='authorisation'>
            <div className='authorisation_header'>
                <h1 className='header authorisation_header_item'>Для оформления подписки <br/>
                    на тариф, необходимо<br/> авторизоваться.</h1>
                <div className='authorisation_header_pic'><Characters/></div>
            </div>
            <div className='authorisation_form'>
                <div className='authorisation_form_lock'><Lock/></div>
                <div className='authorisation_form_register'><RegisterForm/></div>     
            </div>
        </div>
    );

}

export default AuthorisationPage