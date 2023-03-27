import React from "react";
import "./resultspageTable.css"
import Report from "../report.json"
import uniqid from "uniqid"
import Loading from "../../static-result-page/loading.svg"
import { connect } from 'react-redux';
import "../../../Main.css"

function ResultsTable (props){
    return (<div className="table">
        <table>
            {window.innerWidth>800?
            <>
            <colgroup style = {{backgroundColor: "#029491"}}/>
            <colgroup style = {{span:"8"}} />         
              <tr> 
                    <td className="features">Период</td>
                    {props.start ? "":
                    props.hists.data[0].data.map ((report,index) => {
                        const date = new Date(report.date)
                        return (
                            <td className={props.startnum < props.end ? props.startnum < index && index < props.end ? "active": "not-active":props.startnum < index || index < props.end ? "active": "not-active"} index = {index} key = {uniqid()}>{`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}</td>
                    )})}           
              </tr>
              <tr className="features-center">  
                    <td className="features">Всего</td>
                    {props.start?
                    <div className="loader">
                      <img className="loading" src= {Loading}></img>
                      <p>Загружаем данные</p>
                    </div>: 
                    props.error ? props.errorMessage :
                    props.hists.data[0].data.map ((report,index) => {
                        return (
                            <td className={props.startnum < props.end ? props.startnum < index && index < props.end ? "active": "not-active":props.startnum < index || index < props.end ? "active": "not-active"} index = {index} key = {uniqid()}>{report.value}</td>
                    )})
                   
                    }
              </tr>
              <tr>
                    <td className="features">Риски</td>
                    {props.start ? "":
                    props.hists.data[1].data.map ((report,index) => {
                        return (
                            <td className={props.startnum < props.end ? props.startnum < index && index < props.end ? "active": "not-active":props.startnum < index || index < props.end ? "active": "not-active"} index = {index}  key = {uniqid()}>{report.value}</td>
                    )})}
              </tr>
            </>:
            <>
              <tr>
                <td className="features">Период</td>
                <td className="features">Всего</td>
                <td className="features">Риски</td>
              </tr>
            </>
}   
        </table>
        </div>)
} 
const mapStateToProps = function(state) {
    return {
      start: state.search.searchStart,
      hists: state.search.histograms,
      error: state.search.error,
      errorMessage: state.search.errorMessage
    }
  }

export default connect(mapStateToProps)(ResultsTable)