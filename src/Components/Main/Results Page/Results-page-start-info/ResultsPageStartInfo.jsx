import React from "react";
import {ReactComponent as Human} from  "./static-result-page-start-info/Human4.svg"
import "./ResultsPageStartInfo.css"
import "../../Main.css"

function ResultsPageStartInfo(){
    return (
        < div className="resulsPageStartInfo">
            <div className="results_startInfo">
                <h1 className="header results_startInfo_item ">Ищем. Скоро <br/> будут результаты</h1>
                <h2 className="subheader results_startInfo_item">Поиск может занять некоторое время, <br/> просим сохранять терпение.</h2>
            </div>
            <div className="results_startInfo_pic"><Human/></div>
        </div>
    )
}

export default ResultsPageStartInfo