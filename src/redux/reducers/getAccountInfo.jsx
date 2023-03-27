function getInfo (initialState= {searchInfo: true}, action){
    switch (action.type){
      case 'GET_INFO_SUCCESS': 
        return {...initialState,
          count: action.payload.eventFiltersInfo.usedCompanyCount,
          limit: action.payload.eventFiltersInfo.companyLimit,
        }
      case 'GET_INFO_FAILURE': 
        return {...initialState,
          error: action.payload}
      case 'GET_INFO_END': 
        return {...initialState,
          searchInfo: action.payload}
      default:
        return initialState
}
}
export default getInfo
