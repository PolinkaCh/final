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
export const setAuth = (id, value) => {   
    return {
        type: "AUTH",
        id, value
    }
}
export const invalidLogin = (err) => {   
    return {
        type: "INVALIDLOGIN",
        err
    }
}
export const validateLogin = (log) => {   
    return (dispatch) => {
        if(log.includes (+7) || log.includes(8)){
            if (/[^0-9]/.test(log)){
            const error = "Введите корректные данные"
            dispatch (invalidLogin(error))}
            else {
                const error = false
                dispatch (invalidLogin(error))
            }
        }
    }
}
export const setAuthVal = (id, value)=> {
    return (dispatch, getState) => {
        dispatch(setAuth(id, value))
        const {login} = getState() 
        const log = login.login
         if (id = "login"){
            dispatch (validateLogin(log))}
        if ((login.password !=='') && (login.login!=='')){
            const disabled = false
            dispatch(setDisabled(disabled))
        } else {
            const disabled = true
            dispatch(setDisabled(disabled))
        }
}
}
export const authStart = () => {   
    return {
        type: "AUTHSTART"
    }
}
export const signInRequest = () => {
    return (dispatch, getState) => {
        dispatch (authStart())
        const {login,search} = getState()
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
                const disabled = !search.disabled
                dispatch(setDisabled(disabled))
              }
         })
        .catch((error) => { 
            console.log (error)
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
export const InvalidNum = (err) => {   
    return {
        type: "INVALIDNUM",
        err
    }
}
export const validateNum = (num) => {   
    return (dispatch) => {
        if (!num.length){
            const error = "Обязательное поле"
            dispatch(InvalidNum(error))      
        } else {
            const error = false
            dispatch(InvalidNum(error))
        }
        if (num > 1000 || num < 1){
            const error = "Введите корректные данные"
            dispatch(InvalidNum(error))      
        }
    }   
}
export const InvalidDates = (err) => {   
    return {
        type: "INVALIDDATES",
        err
    }
}
export const validateDates = (dateStart,dateEnd) => {   
    return (dispatch) => {
        if (!dateStart.length || !dateEnd.length){
            const error = "Обязательное поле"
            dispatch(InvalidDates(error))      
        } else {
            const error = false
            dispatch(InvalidDates(error))
        }
        if (dateEnd.length && dateStart > dateEnd){
            const error = "Введите корректные данные"
            dispatch(InvalidDates(error))      
        } else {
            const error = false
            dispatch(InvalidDates(error))
        }
    }   
}

export const setSearchVal = (id, value) => {   
    return (dispatch, getState) => {
        dispatch(setSearch(id, value))
        const {search} = getState() 
        const inn = search.inn
        const number = search.number_docs
        const dateStart = search.rangeStart
        const dateEnd = search.rangeEnd
        switch(id){
        case (id = "inn"):
            dispatch (validateInn(inn));
            break;
        case(id="number_docs"):        
            dispatch (validateNum(number));
            break;
        case(id="rangeStart"||"rangeEnd"):
            dispatch(validateDates(dateStart,dateEnd))
            break;
        } 

        if ((search.inn !=='') && (search.number_docs!=='') && (search.rangeStart!=='') && (search.rangeEnd!=='')){
            const disabled = false
            dispatch(setDisabled(disabled))
        }else {
            const disabled = true
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
export const innValidation =(result)=> {
    return {
        type: "INNVALID",
        result
    }
}
export const innValidError =(error,errorMessage)=> {
    return {
        type: "INNVALIDERROR",
        error,errorMessage
    }
}
export const validateInn =(inn)=> {
    return (dispatch) => {  
            let result = false;
            if (typeof inn === 'number') {
                inn = inn.toString();
            } else if (typeof inn !== 'string') {
                inn = '';
            }
            if (!inn.length) {
                const errorCode = 1;
                const errorMessage = 'Обязательное поле';
                dispatch (innValidError(errorCode,errorMessage))
            } else if (/[^0-9]/.test(inn)) {
                const errorCode = 2;
                const errorMessage = 'ИНН может состоять только из цифр';
                dispatch (innValidError(errorCode,errorMessage))
            } else if ([10, 12].indexOf(inn.length) === -1) {
                const errorCode = 3;
                const errorMessage = 'Введите корректные данные';
                dispatch (innValidError(errorCode,errorMessage))
            } else {
                var checkDigit = function (inn, coefficients) {
                    var n = 0;
                    for (var i in coefficients) {
                        n += coefficients[i] * inn[i];
                    }
                    return parseInt(n % 11 % 10);
                };
                switch (inn.length) {
                    case 10:
                        var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                        if (n10 === parseInt(inn[9])) {
                            result = true
                            const errorCode = false;
                            dispatch (innValidError(errorCode))
                        }
                        break;
                    case 12:
                        var n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                        var n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                        if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
                            result = true
                            const errorCode = false;
                            dispatch (innValidError(errorCode))
                        }
                        break;
                }
                if (!result) {
                    const errorCode = 4;
                    const errorMessage = 'Введите корректные данные';
                    dispatch (innValidError(errorCode,errorMessage))
                }
            }
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
            localStorage.setItem ('hists', JSON.stringify(response.data));
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
            localStorage.setItem ('docsNum', JSON.stringify(response.data));
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
              localStorage.setItem ('docs', JSON.stringify(response.data));
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


