import React from "react";
import "./resultspageTable.css"
import Report from "../report.json"
import uniqid from "uniqid"
import Loading from "../../static-result-page/loading.svg"
import { connect } from 'react-redux';
import "../../../Main.css"

function ResultsTable (props){
    const windowInnerWidth = window.innerWidth
    console.log(props.errorMessage)
    return (
    <div className="table">
      {windowInnerWidth > 800?
        <table>
            <colgroup style = {{backgroundColor: "#029491"}}/>
            <colgroup style = {{span:"8"}} />         
              <tr> 
                    <td className="features">Период</td>
                    {props.start ? "":
                    !props.hists.data.length ? '' :
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
                    !props.hists.data.length ? <div className="error_table">{props.errorMessage}</div> :
                    props.hists.data[0].data.map ((report,index) => {
                        return (
                            <td className={props.startnum < props.end ? props.startnum < index && index < props.end ? "active": "not-active":props.startnum < index || index < props.end ? "active": "not-active"} index = {index} key = {uniqid()}>{report.value}</td>
                    )})
                   
                    }
              </tr>
              <tr>
                    <td className="features">Риски</td>
                    {props.start ? "":
                    !props.hists.data.length ? '' :
                    props.hists.data[1].data.map ((report,index) => {
                        return (
                            <td className={props.startnum < props.end ? props.startnum < index && index < props.end ? "active": "not-active":props.startnum < index || index < props.end ? "active": "not-active"} index = {index}  key = {uniqid()}>{report.value}</td>
                    )})}
              </tr>
          </table>
            :
          <table>  
            <thead style = {{backgroundColor: "#029491"}}>
              <tr>
                <th className="features">Период</th>
                <th className="features">Всего</th>
                <th className="features">Риски</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              {props.start ? "":
                !props.hists.data.length  ? "" :
                    props.hists.data[0].data.map ((report,index) => {
                        const date = new Date(report.date)
                        return (
                            <td className={props.startnum+1 === index ? "active": "not-active"} index = {index} key = {uniqid()}>{`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}</td>
              )})}  
              {props.start?  
                    <div className="loader">
                      <img className="loading" src= {Loading}></img>
                    </div>: 
                    !props.hists.data.length ? <div>{props.errorMessage}</div> :
                    props.hists.data[0].data.map ((report,index) => {
                        return (
                            <td className= {props.startnum+1 === index ? "active": "not-active"} index = {index} key = {uniqid()}>{report.value}</td>
              )})}
              {props.start ? "":
                 !props.hists.data.length ? "" :
                    props.hists.data[1].data.map ((report,index) => {
                        return (
                            <td className={props.startnum+1 === index ? "active": "not-active"} index = {index}  key = {uniqid()}>{report.value}</td>
              )})}
              </tr>
            </tbody>
          </table>           
}   

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