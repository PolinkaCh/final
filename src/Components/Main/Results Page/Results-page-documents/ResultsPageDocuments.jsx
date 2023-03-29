import React from "react";
import "./ResultsPageDocuments.css"
import "../../Main.css"
import DocumentCard from "./Results-page-document-card/ResultsPageDocumentCard";
import Documents from "./Results-page-document-card/documents.json"
import Button from "../../Button"
import uniqid from "uniqid"
import { connect } from 'react-redux';
import { useState } from "react";
import Loading from "./../static-result-page/loading.svg"

function ResultsPageDocuments (props) {
    const [num, setnum] =useState(2)
    const [dis, disappear] = useState("active")
    const handleClick = () => {
        setnum(num + 2)
        if (num > props.docs.length || num === props.docs.length) {
            disappear("non-active")
        }
    }
    return (
    <>
        <h1 className="header resultsPageDocuments_header">Список документов</h1>
        <div className="docs">
            {props.start?
            <img className="loading"  src= {Loading}></img>
            : 
            <>
            <div className="resultsPageDocuments_docs">
            {props.docs.map((document,index) => {
                return (
                    <DocumentCard key = {uniqid()} index= {index} num ={num} document = {document}/>
                )
            })}
            </div>
            <div className={`btn-docs ${dis}`}>
                <Button func = {handleClick} title="Показать больше"/>
            </div>
            </>
            }
        </div>
    </>)
}
const mapStateToProps = function(state) {
    return {
      start: state.search.searchStart,
      docs: state.search.Docs
    }
  }

export default connect(mapStateToProps) (ResultsPageDocuments)