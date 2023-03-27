import React from 'react'
import RatesCard from './RatesCard/RatesCard';
import cards from "./RatesCard/data.json"
import uniqid from 'uniqid';
import './MainPageRates.css'
import '../../Main.css'
import { connect } from 'react-redux';

function MainPageRates(props){
    return(
        <div className='rates'>
            <h1 className='header rates_header'>наши тарифы</h1>
            <div className='rate_cards'>
                {cards.cards.map(card => {
                return (
                    <RatesCard active = {props.isAuth} key = {uniqid()} card = {card}/>
                )
                })} 
            </div>
        </div>
    );

}
const mapStateToProps = function(state) {
    return {
      isAuth: state.login.isAuth
    }
  }

export default connect(mapStateToProps)(MainPageRates)