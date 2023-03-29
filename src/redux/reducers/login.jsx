const state = {
  isAuth: localStorage.getItem("user") ? true: false,
  token: localStorage.getItem("user") ? JSON.parse(localStorage.user).accessToken: "",
  error: false
}

function login(initialState = state, action){
    switch (action.type){
      case 'AUTH': 
        return {...initialState, 
          [action.id]: action.value,
          error: false,
          errorMessage: false
        }
      case 'INVALIDLOGIN': 
      return {...initialState, 
          errorLogin: action.err
      }
      case 'AUTHSTART': 
      return {...initialState, 
          authStart: true
      }
      case "SIGN_IN_SUCCESS":
        return {...initialState, 
          token: action.payload.accessToken,
          expire: action.payload.expire,
          isAuth: true,
          error: false,
          authStart: false
        }
      case "SIGN_IN_FAILURE":
        return {...initialState, 
          error: action.payload,
          errorMessage: "Введите корректные данные"
        }
      case 'LOGOUT': 
        return {...initialState,
          isAuth: false}
      default: 
      return initialState
    }
  }

export default login
