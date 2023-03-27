import React, { useState } from "react";
import './WhyWeCard.css'

function WhyWeCard({item, index, num}){
    return (
        <div className={`fullCard_slider ${index === num ? "active": 
                                             index === num+1 ? "active non_width": 
                                            index === num+2 ? "active non_width" :
                                            "not-active"}`} >
            <img src={item.picture}></img>
            <p className="fullCard_slider_text">{item.descr}</p>
        </div>
    )
}

export default WhyWeCard

