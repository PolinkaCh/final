const state = {
  isAuth: localStorage.getItem("user") ? true: false,
  token: localStorage.getItem("user") ? JSON.parse(localStorage.user).accessToken: "",
}

function login(initialState = state, action){
    switch (action.type){
      case 'LOGIN': 
        return {...initialState, 
          login: action.log
        }
      case 'PASSWORD': 
        return {...initialState, 
          password: action.pass
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
