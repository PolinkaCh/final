import React from 'react'
import Registered from './Registered/Registered'
import Unregistered from './Unregistered/Unregistered'
import "./RegistrationBar.css"
import { connect } from 'react-redux';

function RegistrationBar(props){
    return (
        <div className='registration'>
            {props.isAuth ? 
            <div className='reg'><Registered/></div>:
            <div className='unreg'><Unregistered/></div>}
        </div>
    );
}
const mapStateToProps = function(state) {
    return {
      isAuth: state.login.isAuth
    }
  }


export default connect(mapStateToProps) (RegistrationBar)