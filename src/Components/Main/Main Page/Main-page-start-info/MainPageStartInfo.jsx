import React from 'react'
import Button from "../../Button.jsx"
import "./MainPageStartInfo.css"
import '../../Main.css'
import image from "./static-main-page-start-info/human1.svg"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

function MainPageStartInfo(props){
    return(
        <div className='mainPageStartInfo'>
            <div className='startInfo'>
                <h1 className='header startInfo_first'>сервис по поиску публикаций <br/> о компании <br/> по его ИНН</h1>
                <h2 className='subheader startInfo_second'>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</h2>       
                {props.isAuth ? <Link to="/search"><div className='startInfo_btn'><Button title = "Запросить данные"/></div></Link>: ""}
            </div>
            <img className='startInfo_picture' src={image}></img>
        </div>
    );

}
const mapStateToProps = function(state) {
    return {
      isAuth: state.login.isAuth 
    }
  }

export default connect(mapStateToProps)(MainPageStartInfo)