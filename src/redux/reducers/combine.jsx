import { combineReducers } from "redux";
import login from "./login";
import getInfo from "./getAccountInfo";
import search from "./search"

export default combineReducers ({
    login, getInfo, search
})