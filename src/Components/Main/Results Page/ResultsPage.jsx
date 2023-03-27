import React from 'react'
import ResultsPageStartInfo from './Results-page-start-info/ResultsPageStartInfo';
import ResultsPageReport from './Results-page-report/ResultsPageReport';
import ResultsPageDocuments from './Results-page-documents/ResultsPageDocuments';
import "./ResultsPage.css"



function ResultsPage(){
    return(
        <div className='results_page'>
            <ResultsPageStartInfo/>
            <ResultsPageReport/>
            <ResultsPageDocuments/>
        </div>
    );   

}

export default ResultsPage