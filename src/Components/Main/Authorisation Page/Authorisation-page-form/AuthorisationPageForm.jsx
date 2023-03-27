import React from "react";
import Button from "../../Button"
import AuthorisationButton from "./FormButton.jsx"
import "./AuthorisationPageForm.css"
import images from "./LoginButtons.json"
import "../../Main.css"
import uniqid from "uniqid"
import { connect } from 'react-redux';
import * as Actions from "../../../../redux/reducers/actions";
import { bindActionCreators } from "redux";
import {Link, useNavigate} from "react-router-dom"

function RegisterForm (props){
    const navigate = useNavigate();
    const {signInRequest, setLogIn,setPassword} = props.actions
    const {login, password} = props
    const signIn = (e) => {e.preventDefault (); navigate("/search");signInRequest()}
    const logInDisp = (e) => setLogIn(e.target.value)
    const passDisp = (e) => setPassword(e.target.value)
    return(
        <div className="RegisterForm">
            <div className="slider_switcher">
                <button className="slider_switcher_item">Войти</button>
                <button className="slider_switcher_item">Зарегистрироваться</button>
            </div>
            <form id="auth" >
                <fieldset className="fieldset">
                    <div className="form_login">
                        <p className="form_title"><label htmlFor="login">Логин или номер телефона:</label></p>
                        <input form="auth" className="form_input form_input_authorisation" id="login" onChange = {(e) => logInDisp(e)} value = {login}></input>
                    </div>
                    <div className="form_password">
                        <p className="form_title"><label htmlFor="password">Пароль:</label></p>
                        <input form="auth" type="password" className="form_input form_input_authorisation" id="password" onChange = {(e)=>passDisp(e)} value = {password}></input>
                    </div>
                </fieldset>
                <div className="form-buttons">
                    <Link to = "/"><div className="btn-login" form="auth"><Button func={(e)=>signIn(e)} title="Войти"/></div></Link>
                    <button className="btn-restore">Восстановить пароль</button>
                </div>
                <div className="form_login_through">
                    {images.images.map(image => {
                        return (
                        <AuthorisationButton key = {uniqid()} image = {image}/>)
                    })}
                </div>
            </form>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
     actions: bindActionCreators (Actions,dispatch)
    }
}

export default connect(null, mapDispatchToProps) (RegisterForm)