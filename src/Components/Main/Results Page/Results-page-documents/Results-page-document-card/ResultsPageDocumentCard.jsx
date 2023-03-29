import React from "react";
import "./ResultsPageDocumentCard.css"
import photo from "./static-documents/photo.jpg"

function DocumentCard (props){  
    const {document} = props
    const date = new Date(document.ok.issueDate)
    date.toDateString ()
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(document.ok.content.markup, "text/xml");
    const list=[]

    const scanNode = xmlDoc.querySelector("scandoc")
    const k = scanNode.textContent.toString().search(/img src=".*"/)
    const h = scanNode.textContent.toString().slice(k+9, -2)
    const sentenceNode = scanNode.querySelectorAll("sentence")
    sentenceNode.forEach((item)=>{
        if (item.childNodes){
            const n = list.push(Array.from(item.childNodes).map(item=>item.textContent.toString().replace(/<.*>*>/g,"")))
            return n    
        }
        else{
            return  
        }
    })
    
    console.log(scanNode)
    return (
        <div className={`document ${props.index < props.num ? "active": "non-active"}`}index= {props.index}>
            <div className="doc_header">
                <div className="document_dateInfo">
                    <div className="document_dateInfo_item">{date.toLocaleString()}</div>
                    <div className="document_dateInfo_item"><a href={document.ok.url}>{document.ok.source.name}</a></div>
                </div>
                <h1 className="document_header">{document.ok.title.text}</h1>
                <div className="document_label">{document.ok.attributes.isTechNews? "технические новости": document.ok.attributes.isAnnouncement ? "анонсы и события":"сводки новостей" }</div>
            </div>
            <div className="doc_body">
                <img className="document_img" src={k!== -1 ? h: require('./static-documents/photo.jpg')}></img>
                <div className="document_text">{list.map(item=> item)}
                </div>
                <div className="document_end">
                    <button className="document_button"><a href={document.ok.url}>Читать в источнике</a></button>
                    <p className="document_end_paragraph">{document.ok.attributes.wordCount} слов</p>
                </div>
            </div>
        </div>
    )
}
export default DocumentCard