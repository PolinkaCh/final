import React, { useState } from 'react'
import {ReactComponent as Picture} from "./static-main-page-why-we/human2.svg" 
import RightArrow from "./static-main-page-why-we/arrow-right.svg"
import LeftArrow from "./static-main-page-why-we/arrow-left.svg"
import "./MainPageWhyWe.css"
import uniqid from 'uniqid';
import Items from './slider.json'
import WhyWeCard from './WhyWeSlider/WhyWeCard';
import '../../Main.css'

function MainPageWhyWe(){
    const [num, setNum] = useState(0)
    const handleClick = (e) => {
        const windowInnerWidth = window.innerWidth
        if (e.target.className === "slider-left") { 
            console.log (windowInnerWidth)
            windowInnerWidth < 800 ?
            setNum(num === 0 ? Items.Items.length-1: num-1):
            setNum(num === 0 ? Items.Items.length-3: num-1)
        } else {
            windowInnerWidth < 800 ?
            setNum(num === Items.Items.length - 1 ? 0: num+1):
            setNum(num === Items.Items.length - 3 ? 0: num+1)
        }
    }
    return(
        <div className='whyWe'>
        <h1 className='header whyWe_header'>почему именно мы</h1>
        <div className='whyWe_slider'>
            <button className='btn-slider' onClick= {handleClick}><img className='slider-left' src= {LeftArrow}></img></button>
            <div className='fullCards'>
                {Items.Items.map((item, index) => {
                    return(
                            <WhyWeCard key = {uniqid()} item = {item} index = {index} num = {num}/>
                    )
                })}
            </div>
            <button className='btn-slider' onClick= {handleClick}><img className='slider-right' src={RightArrow}></img></button>
        </div>
        <div className='whyWe_picture'>
            <Picture />
        </div>
        </div>
    );

}

export default MainPageWhyWe