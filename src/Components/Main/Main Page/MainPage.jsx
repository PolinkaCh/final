import React from 'react'
import MainPageStartInfo from './Main-page-start-info/MainPageStartInfo';
import MainPageWhyWe from './Main-page-why-we/MainPageWhyWe';
import MainPageRates from './Main-page-rates/MainPageRates';


function MainPage(){
    return(
        <>
        <MainPageStartInfo/>
        <MainPageWhyWe/>
        <MainPageRates/>
        </>
    );

}

export default MainPage