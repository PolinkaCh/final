import React,{ useEffect }  from 'react'
import "./SearchPage.css"
import {ReactComponent as Document} from "./static-Search-Page/Document.svg"
import {ReactComponent as Folders} from "./static-Search-Page/Folders.svg"
import {ReactComponent as Human} from "./static-Search-Page/Human3.svg" 
import SearchForm from "./Search-Page-Form/SearchPageForm.jsx"
import "../Main.css"
import { connect } from 'react-redux';
import {useNavigate} from "react-router-dom"

function SearchPage(props){
    const navigate = useNavigate();
    return(
        <>
        <div className='search'>
            <div className='search_info'>
                <div className='search_info_header'>
                    <h1 className='header search_info_header_one'>Найдите необходимые данные в пару кликов.</h1>
                    <h2 className='subheader search_info_subheader'>Задайте параметры поиска.<br/>
                    Чем больше заполните, тем точнее поиск</h2>
                </div>
                <div className='search_info_form'>
                    <SearchForm/>
                </div>
            </div>
            <div className='search_pictures'>
                <div className='search_pictures_item'><Document/></div>
                <div className='search_pictures_item'><Folders/></div>
                <div className='search_pictures_item'><Human/></div>
            </div> 
        </div> 
        </>
    );

}
const mapStateToProps = function(state) {
    return {
      isAuth: state.login.isAuth
    }
  }

export default connect(mapStateToProps)(SearchPage)