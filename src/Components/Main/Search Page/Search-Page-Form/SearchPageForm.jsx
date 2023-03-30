import React, { useState } from "react";
import "./SearchPageForm.css"
import Button from "../../Button"
import Checkboxes from "./Checkbox.json"
import "../../Main.css"
import uniqid from "uniqid"
import { connect } from 'react-redux';
import * as Actions from "../../../../redux/reducers/actions";
import { bindActionCreators } from "redux";
import {useNavigate, Link} from "react-router-dom"


function SearchForm (props){
    const navigate = useNavigate();
    const [checkedName,setCheckName] = useState([])
    const {searchStart, setSearchVal, setSearchCheckboxes} = props.actions
    const startSearch = (e) => {e.preventDefault ();navigate("results"); searchStart()}
    const setSearchReq = (e) => setSearchVal(e.target.id, e.target.value)
    const setSearchCheks = (e) =>{
        if (!checkedName.includes(e.target.id)){
            setCheckName([...checkedName, e.target.id ]);}
        else{
            let index = checkedName.indexOf(e.target.id)
            setCheckName([...checkedName.slice(0, index), ...checkedName.slice(index + 1)]);
        }
        setSearchCheckboxes(e.target.id)}
    let now = new Date().toISOString().split('T')[0]
    return (
        <div className="search_form">
            <form>
                <fieldset className="search_form_full">
                    <div className="search_form_labels">
                        <div className="search_form_item">
                            <label className="form_input_label" htmlFor="inn">ИНН компании<em>*</em></label><br/>
                            <input style={{boxShadow: props.errorMsg? "0px 0px 20px #FF5959": ""}} className="form_input form_input_search" placeholder="10 цифр" type="text" id="inn" required onChange = {(e) =>{setSearchReq(e)}}/>
                            <div className="error_msg" style={{visibity: props.error? "visible" : "hidden"}}>{props.error? <p>{props.errorMsg}</p> :" "}</div> 
                        </div>
                        <div>
                            <label className="form_input_label" htmlFor="ton">Тональность</label><br/>
                            <select className="form_input form_input_search" type="text" id="ton" onChange = {(e) => setSearchReq(e)}>
                                <option value="any">Любая</option>
                                <option value="positive">Позитивная</option>
                                <option value="negative">Негативная</option>
                            </select>
                        </div>
                        <div className="search_form_item">
                            <label className="form_input_label" htmlFor="number_docs">Количество документов в выдаче <em>*</em></label><br/>
                            <input style={{boxShadow: props.errorNum? "0px 0px 20px #FF5959": ""}} required className="form_input form_input_search" placeholder="от 1 до 1000" type="number" id="number_docs" min= "1" max="1000" onChange = {(e) => setSearchReq(e)}/>
                            <div className="error_msg" style={{visibity: props.errorNum? "visible" : "hidden"}}>{props.errorNum? <p>{props.errorNum}</p> :" "}</div>
                        </div>
                        <div className="search_form_item">
                            <label className="form_input_label" htmlFor="range">Диапазон поиска<em>*</em></label><br/>
                            <div className="range_input">
                                <input style={{boxShadow: props.errorDates? "0px 0px 20px #FF5959": ""}} required className="form_input form_input_search_date" max = {props.endDate ? props.endDate: now} placeholder="Дата начала" type="date" id="rangeStart" onChange = {(e) => setSearchReq(e)}/>
                                <input style={{boxShadow: props.errorDates? "0px 0px 20px #FF5959": ""}} required onChange = {(e)=>{setSearchReq (e)}} className="form_input form_input_search_date" min = {props.startDate ? props.startDate: ""} max = {now} placeholder="Дата конца" type="date" id="rangeEnd"/>         
                            </div>
                            <div className="error_msg" style={{visibity: props.errorDates? "visible" : "hidden"}}>{props.errorDates? <p>{props.errorDates}</p> :" "}</div>
                        </div>
                    </div>
                    <div className="search_form_second_column">
                        <div className="search_form_checkboxes">
                            {Checkboxes.map(checkbox => {
                                return(
                                <p key = {uniqid()}>
                                    <input type="checkbox" checked= {checkedName.includes(checkbox.name)? true: false} id={checkbox.name} name={checkbox.name} onChange = {(e)=>{setSearchCheks (e)}}/>
                                    <label className="form_input_label" htmlFor={checkbox.name}>{checkbox.text}</label>
                                </p>)
                            })}
                        </div>
                        <div className="search_form_btn">
                            <Link to = "/result"><div className="btn-search"><Button dis={props.search.disabled? true: false} title="Поиск" func = {(e)=>startSearch(e) }/></div></Link>
                            <p className="comment">* Обязательные к заполнению поля</p>
                        </div>
                    </div>
                
                </fieldset>
            </form>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators (Actions,dispatch)
    }
}
const mapStateToProps = function(state) {
    return {
        search: state.search,
        endDate: state.search.rangeEnd,
        startDate: state.search.rangeStart,
        error: state.search.error,
        errorMsg: state.search.errorMsg,
        errorNum: state.search.errorNum,
        errorDates: state.search.errorDates
    }
  }

export default connect(mapStateToProps, mapDispatchToProps) (SearchForm)