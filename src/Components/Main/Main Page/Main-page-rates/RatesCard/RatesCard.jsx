import React from "react";
import Button from "../../../Button";
import './RatesCard.css'
import Ticks from "./static-rates-card/tick.svg"
import uniqid from "uniqid"


function RatesCard(props){
    const {card, active} = props
    return(
            <div className="RatesCard_description" style = {{boxShadow: active ? "0px 0px 20px #FFB64F": "0px 0px 20px rgba(0, 0, 0, 0.2);" }}>
                <div className="RatesCard_description_header"
                style={{backgroundColor: 
                        card.title === "Beginner" ? "#FFB64F" :
                        card.title === "Pro" ? "#7CE3E1" :
                        "#000000"
                }}>
                    <div className="header_info"
                    style={{color: 
                        card.title === "Business" ? "white": "black"}}>
                        <p className="header_info_title">{card.title}</p>
                        <p className="header_info_titleDescr">{card.titleDescription}</p>
                    </div>
                    <img className="header_info_pic"  alt = "" aria-hidden="true" src={card.picture}></img>
                </div>
                <div className="RatesCard_description_main">
                    <div className="main_price">
                        {active ? <div className="active_rate">Текущий тариф</div>: ""}
                        <div className="main_price_number">
                            <div className="newPrice">{card.price}</div>
                            <div className="oldPrice">{card.oldPrice}</div>
                        </div>
                        <div className="main_price_description">
                            {card.priceDescription}         
                        </div>
                    </div>
                    <div className="main_features">
                        <p className="main_features_header">В тариф входит:</p>
                        {card.features.map(feature => {
                        return (
                        <div className="main_features_title" key = {uniqid()} >
                            <img src={Ticks}  alt = "" aria-hidden="true"></img>
                            <div className="main_features_items">{feature}</div>
                        </div>)
                        })}
                    </div>
                    <Button className='btn-rates' title = {active ? "Перейти в личный кабинет" :"Подробнее" } />
             </div>
            </div>
            
    )
}
export default RatesCard