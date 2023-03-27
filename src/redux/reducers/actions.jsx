import axios from 'axios'

export const signInSuccess = (data) => {
    return {
        type: "SIGN_IN_SUCCESS",
        payload:data
    }
}

export const signInFailure = (error) => {
    return {
        type: "SIGN_IN_FAILURE",
        payload:error
    }
}

export const signInRequest = () => {
    return (dispatch, getState) => {
        const {login} = getState()
        const userData = {
            login: login.login,
            password: login.password
        }
      axios
        .post('https://gateway.scan-interfax.ru/api/v1/account/login', userData) 
        .then((response) => { 
            if (response.data.accessToken){
                localStorage.setItem ('user', JSON.stringify(response.data));
                dispatch(signInSuccess(response.data))
              }
         })
        .catch((error) => { 
            dispatch(signInFailure(error.message))
          });
    }}

export const setLogIn = (log) => {
    return {
        type: "LOGIN",
        log
    }
}
export const setPassword = (pass) => {
    return {
        type: "PASSWORD",
        pass
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    return {
        type: "LOGOUT"
    }
}
export const getInfoSuccess = (data) => {
    return {
        type: "GET_INFO_SUCCESS",
        payload:data
    }
}

export const getInfoFailure = (error) => {
    return {
        type: "GET_INFO_FAILURE",
        payload:error
    }
}
export const getInfoEnd = (val) => {
    return {
        type: "GET_INFO_END",
        payload:val
    }
}
export const getAccountInfo = () => {
    return (dispatch, getState) => {
      //let user = JSON.parse(localStorage.user)
      //const token = user.accessToken
      const {login} = getState()
      const token = login.token
      axios
        .get('https://gateway.scan-interfax.ru/api/v1/account/info', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            dispatch(getInfoSuccess(response.data))
            dispatch(getInfoEnd(false))
        })
        .catch((error) => { 
            dispatch(getInfoFailure(error.message))
         });
    }
}
export const setSearch = (id, value) => {   
    return {
        type: "SEARCH",
        id, value
    }
}
export const setDisabled = (dis) => {   
    return {
        type: "DISABLED",
        dis
    }
}


export const setSearchVal = (id, value) => {   
    return (dispatch, getState) => {
        dispatch(setSearch(id, value))
        const {search} = getState() 
        if ((search.inn !=='') && (search.number_docs!=='') && (search.rangeStart!=='') && (search.rangeEnd!=='')){
            const disabled = !search.disabled
            dispatch(setDisabled(disabled))
        }
    } 
}
export const setSearchCheckboxes = (id,val) => {  
    return (dispatch, getState) => {
        const {search} = getState() 
        switch (id){
            case "mention": 
                val = !search.mention 
            break;
            case "role": 
                val = !search.role 
            break;
            case "risks": 
                val = !search.risks 
            break;
            case "technews": 
                val = !search.technews 
            break;
            case "shedule": 
                val = !search.shedule 
            break;
            case "news": 
                val = !search.news 
            break;
            default: 
                val = !search.completeness}
            dispatch(setSearch(id, val))

        }
    }


export const histogramSearchEnd = (val) => {
    return {
        type: "HISTSEARCHSTART",
        val
    }
}

export const searchStart = () => {
    return (dispatch, getState) => {
        const {search, login} = getState();
        const searchData = {
            "issueDateInterval": {
              "startDate": search.rangeStart,
              "endDate": search.rangeEnd
            },
            "searchContext": {
              "targetSearchEntitiesContext": {
                "targetSearchEntities": [
                  {
                    "type": "company",
                    "sparkId": null,
                    "entityId": null,
                    "inn": search.inn,
                    "maxFullness": search.completeness,
                    "inBusinessNews": search.mention
                  }
                ],
                "onlyMainRole": search.role,
                "tonality": "any",
                "onlyWithRiskFactors": search.risks,
                "riskFactors": {
                  "and": [],
                  "or": [],
                  "not": []
                },
                "themes": {
                  "and": [],
                  "or": [],
                  "not": []
                }
              },
              "themesFilter": {
                "and": [],
                "or": [],
                "not": []
              }
            },
            "searchArea": {
              "includedSources": [],
              "excludedSources": [],
              "includedSourceGroups": [],
              "excludedSourceGroups": []
            },
            "attributeFilters": {
              "excludeTechNews": search.technews,
              "excludeAnnouncements": search.shedule,
              "excludeDigests": search.news
            },
            "similarMode": "duplicates",
            "limit": search.number_docs,
            "sortType": "sourceInfluence",
            "sortDirectionType": "desc",
            "intervalType": "month",
            "histogramTypes": [
              "totalDocuments",
              "riskFactors"
            ]
          }
          
        axios
        .post('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', searchData, {
            headers: {
                'Authorization': `Bearer ${login.token}`
            }
        
        })
        .then((response) => {
            dispatch(histogramSuccess(response.data))
            console.log (response.data)
        })
        .catch((error) => { 
            dispatch(histogramFailure(error.message))
         });
         dispatch(searchDocs(searchData))
    }
}
export const searchDocs = (searchData) => {
    return (dispatch, getState) => {
        const {login} = getState();
        axios
        .post('https://gateway.scan-interfax.ru/api/v1/objectsearch', searchData, {
            headers: {
                'Authorization': `Bearer ${login.token}`
            }     
        })
        .then((response) => {
            dispatch(searchSuccess(response.data))
            dispatch(getDocs(response.data))
        })
        .catch((error) => { 
            dispatch(searchFailure(error.message))
         });

}}
export const getDocs = () => {
    return (dispatch, getState) => {
        const {search, login} = getState();
          const ids = search.searchDocs.items.map(item => item.encodedId)
          console.log (ids)
          const docsData = {
            "ids": ids
          }
          axios
          .post('https://gateway.scan-interfax.ru/api/v1/documents', docsData, {
              headers: {
                  'Authorization': `Bearer ${login.token}`
              }
          
          })
          .then((response) => {
              dispatch(getDocsSuccess(response.data))
              dispatch(histogramSearchEnd(!search.searchStart))
              console.log (response.data)
          })
          .catch((error) => { 
              dispatch(getDocsFailure(error.message))
           });
}}

export const histogramSuccess = (data) => {
    return {
        type: "HISTOGRAM_SUCCESS",
        payload:data
    }
}

export const histogramFailure = (error) => {
    return {
        type: "HISTOGRAM_FAILURE",
        payload:error
    }
}
export const searchSuccess = (data) => {
    return {
        type: "SEARCH_SUCCESS",
        payload:data
    }
}

export const searchFailure = (error) => {
    return {
        type: "SEARCH_FAILURE",
        payload:error
    }
}
export const getDocsSuccess = (data) => {
    return {
        type: "GET_DOCS_SUCCESS",
        payload:data
    }
}

export const getDocsFailure = (error) => {
    return {
        type: "GET_DOCS_FAILURE",
        payload:error
    }
}


