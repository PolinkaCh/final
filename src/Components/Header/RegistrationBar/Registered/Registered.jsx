import React, {useEffect} from 'react'
import "./Registered.css"
import { connect } from 'react-redux';
import * as Actions from "../../../../redux/reducers/actions";
import { bindActionCreators } from "redux";
import Avatar from "./static-Register/avatar.svg"
import Loading from "./static-Register/loader.svg"

function Registered(props){
    const {getAccountInfo, logout} = props.actions
    useEffect (()=>{
      getInfo ()
    }, []);

    const getInfo = () => getAccountInfo()
    const logoutRequest = (e) => {e.preventDefault ();logout()}
    return (    
        <div className='registeredUser'>
            <div className='infoCompany'>
            {props.end ? 
            <img className="loading"  src= {Loading}></img> :
                <p>Использовано компаний <span className='infoCompany_data infoCompany_count'>{props.count}</span> <br/>
                Лимит по компаниям <span className='infoCompany_data infoCompany_limit'>{props.limit}</span></p>
            }
            </div>
            <div className='avatarBlock'>
                <div className='avatarBlock_info'>
                    <div className='avatarBlock_name'>Алексей А. </div>
                    <div><button className='btn btn_registartion btn-logout' onClick = {(e)=>logoutRequest(e)}>Выйти</button></div>
                </div>
                <img src={Avatar} alt = ""></img>
            </div>
        </div>
    )
}

const mapDispatchToProps  = (dispatch) =>  {
    return {
        actions: bindActionCreators (Actions,dispatch)
     }
}
const mapStateToProps = function(state) {
    return {
      count: state.getInfo.count,
      limit: state.getInfo.limit,
      end: state.getInfo.searchInfo
    }
  }

export default connect(mapStateToProps, mapDispatchToProps) (Registered)