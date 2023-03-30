import React, { useState } from "react";
import "./ResultsPageReport.css"
import "../../Main.css"
import { connect } from 'react-redux';
import LeftArrow from "./static-result-page-report/left.svg"
import RightArrow from "./static-result-page-report/right.svg"
import ResultsTable from "./Results-page-table/ResultsPageTable";
import "./ResultsPageReport.css"
import Report from './report.json'


function ResultsPageReport (props){
    const [end, setEnd] = useState(props.hists.data.length ? props.hists.data[0].data.length: 7)
    const [startnum, setStart] = useState(-1)   
    const handleClick = (e) => {
        if (e.target.className === "slider-left") { 
            setStart(startnum === 0 ? props.hists.data[0].data.length - 1: startnum - 1)
            setEnd(end === 0 ? props.hists.data[0].data.length - 1 : end - 1)
        } else if (e.target.className === "slider-right") {
            setStart(startnum === props.hists.data[0].data.length-1 ? 0: startnum + 1)      
            setEnd(!props.hists.data[0].data.length ? 0: end === (props.hists.data[0].data.length-1) || end > (props.hists.data[0].data.length-1)? 0: end +1) 
        }
    }
    return (
        <div className="resultsPageReport">    
            <h1 className="header report_header">Общая сводка</h1>
            <p className="report_paragraph">Найдено {props.start ? "": !props.hists.data.length ? 0 :props.hists.data[0].data.map(item => item.value).reduce((sum, current) => sum + current, 0)} вариантов</p> 
            <div className="report_table">
                <button className='btn-slider' disable = {props.hists.data.length<7 ? true: false} onClick= {handleClick}><img className='slider-left' src = {LeftArrow}></img></button>
                    <ResultsTable end= {end} startnum= {startnum}/>
                <button className='btn-slider' disable = {props.hists.data.length<7 ? true: false} onClick= {handleClick}><img className='slider-right' src = {RightArrow}></img></button>
            </div>
        </div>
    )
    
}

const mapStateToProps = function(state) {
    return {
        start: state.search.searchStart,
        hists: state.search.histograms,
        errorMessage: state.search.errorMessage
    }
  }

export default connect(mapStateToProps)(ResultsPageReport)