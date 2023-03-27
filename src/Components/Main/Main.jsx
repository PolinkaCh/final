import React from 'react'
import MainPage from './Main Page/MainPage';
import AuthorisationPage from './Authorisation Page/AuthorisationPage';
import SearchPage from './Search Page/SearchPage';
import ResultsPage from './Results Page/ResultsPage';
import DevPage from './Dev Page/DevPage';
import {Route, Routes} from 'react-router-dom';

function Main(){
    return(
        < div className='full_main'>
         <Routes>
            <Route path = "/" element = {<MainPage/>}/>
            <Route path = "/authorisation" element = {<AuthorisationPage/>}/>
            <Route path = "/search" element = {<SearchPage/>}/>
            <Route path = "/search/results" element = {<ResultsPage/>}/>
            <Route path = "/development" element = {<DevPage/>}/>
         </Routes>
        </div>
    );

}

export default Main