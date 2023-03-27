const state = {
  isAuth: localStorage.getItem("user") ? true: false,
  token: localStorage.getItem("user") ? JSON.parse(localStorage.user).accessToken: "",
}

function login(initialState = state, action){
    switch (action.type){
      case 'AUTH': 
        return {...initialState, 
          [action.id]: action.value
        }
      case 'INVALIDLOGIN': 
      return {...initialState, 
          errorLogin: action.err
      }
      case "SIGN_IN_SUCCESS":
        return {...initialState, 
          token: action.payload.accessToken,
          expire: action.payload.expire,
          isAuth: true,
          error: ""
        }
      case "SIGN_IN_FAILURE":
        return {...initialState, 
          error: action.payload}
      case 'LOGOUT': 
        return {...initialState,
          isAuth: false}
      default: 
      return initialState
    }
  }

export default login
