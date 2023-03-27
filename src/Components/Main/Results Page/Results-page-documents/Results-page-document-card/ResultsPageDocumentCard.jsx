import React from "react";
import "./ResultsPageDocumentCard.css"

function DocumentCard (props){  
    const {document} = props
    const date = new Date(document.ok.issueDate)
    date.toDateString ()
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(document.ok.content.markup, "text/xml");
    const list=[]

    const scanNode = xmlDoc.querySelector("scandoc")
    const sentenceNode = scanNode.querySelectorAll("sentence")
    sentenceNode.forEach((sentenceNode)=>{
        if (sentenceNode.querySelector("entity")){
            const entityNode = sentenceNode.querySelectorAll("entity")
            entityNode.forEach((entityNode)=> {
                list.push({
                    entity: entityNode.textContent  
                })
            })
        }
    })
    // //const entitysNode = entityNode.querySelector("entity")
    // const result={
    //     sentence: sentenceNode.textContent,
    //     entity: entityNode.textContent,
    //     //entitys: entitysNode.textContent
    // }

    var xmlArray = Array.from(xmlDoc.getElementsByTagName('sentence'))
    console.log (`ghjknm ${list}`)
    return (
        <div className={`document ${props.index < props.num ? "active": "non-active"}`}index= {props.index}>
            <div>
                <div className="document_dateInfo">
                    <div className="document_dateInfo_item">{date.toLocaleString()}</div>
                    <div className="document_dateInfo_item"><a href={document.ok.url}>{document.ok.source.name}</a></div>
                </div>
                <h1 className="document_header">{document.ok.title.text}</h1>
                <div className="document_label">{document.ok.attributes.isTechNews? "технические новости": document.ok.attributes.isAnnouncement ? "анонсы и события":"сводки новостей" }</div>
            </div>
            <img className="document_img" src="https://t-l.ru/i/n/034/339034/tn_339034_2ceb9ae39730348.jpg"></img>
            <div className="document_text">{xmlArray.map(item => item.textContent)}
            </div>
            <div className="document_end">
                <button className="document_button"><a href={document.ok.url}>Читать в источнике</a></button>
                <p className="document_end_paragraph">{document.ok.attributes.wordCount} слов</p>
            </div>
        </div>
    )
}
export default DocumentCard