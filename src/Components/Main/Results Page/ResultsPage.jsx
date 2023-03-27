import React from 'react'
import ResultsPageStartInfo from './Results-page-start-info/ResultsPageStartInfo';
import ResultsPageReport from './Results-page-report/ResultsPageReport';
import ResultsPageDocuments from './Results-page-documents/ResultsPageDocuments';
import "./ResultsPage.css"
import { connect } from 'react-redux';
import { useNavigate} from "react-router-dom"



function ResultsPage(props){
    const navigate = useNavigate();
    const redirectFunc=()=>{
        navigate("/")
    }
    return(
        <>
        {props.isAuth? 
        <div className='results_page'>
            <ResultsPageStartInfo/>
            <ResultsPageReport/>
            <ResultsPageDocuments/>
        </div>: <p className="error" onChange={setTimeout(redirectFunc,2000)}>Вы не авторизованы. Сейчас вас перенаправит на главную...</p>}
        </>
    );   

}
const mapStateToProps = function(state) {
    return {
      isAuth: state.login.isAuth
    }
  }

export default connect(mapStateToProps)(ResultsPage)