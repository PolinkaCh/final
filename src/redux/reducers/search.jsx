const state= {
    inn: '',
    number_docs: '',
    rangeStart: '',
    rangeEnd: '',
    mention: false,
    role: false,
    risks: false,
    technews: false,
    shedule: false,
    news: false,
    completeness: false,
    searchStart: false,
    disabled: true
}

function search (initialState = state, action){
    switch (action.type){
        case 'SEARCH': 
        return {...initialState,
            [action.id]: action.value,
            searchStart: !state.searchStart
        } 
        case 'INNVALID': 
        return {...initialState,
            validINN: action.result
        } 
        case 'INNVALIDERROR': 
        return {...initialState,
            error: action.error,
            errorMessage: action.errorMessage
        } 
        case 'INVALIDNUM': 
        return {...initialState,
            errorNum: action.err
        } 
        case 'INVALIDDATES': 
        return {...initialState,
            errorDates: action.err
        } 
        case 'DISABLED': 
        return {...initialState,
            disabled: action.dis
        } 
        // case 'SEARCHCHECKBOX': 
        // return {...initialState,
        //     [action.id]: action.value
        // }
        case 'HISTSEARCHSTART': 
        return {...initialState,
            searchStart: action.val
        }
        case 'HISTOGRAM_SUCCESS': 
        return {...initialState,
            histograms: action.payload
        }
        case 'HISTOGRAM_FAILURE': 
        return {...initialState,
            error: action.payload,
            errorMessage: "Не удалось получить данные"
        }
        case 'SEARCH_SUCCESS': 
        return {...initialState,
            searchDocs: action.payload
        }
        case 'SEARCH_FAILURE': 
        return {...initialState,
            error: action.payload,
            errorMessage: "Не удалось получить данные"
        }
        case 'GET_DOCS_SUCCESS': 
        return {...initialState,
            Docs: action.payload
        }
        case 'GET_DOCS_FAILURE': 
        return {...initialState,
            error: action.payload,
            errorMessage: "Не удалось получить данные"
        }

        default:
            return initialState
    }
    }
export default search