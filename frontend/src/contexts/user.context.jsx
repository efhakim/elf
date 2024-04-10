import { useReducer, createContext, useCallback } from 'react'

export const UserContext = createContext({
    isLogged: false, 
    setCurrentUser: () => {},
    user: null, 
    clearUser: () => {}
})

const userReducer = (state, action) => {
    const {type, payload} = action

    switch(type) {
        case('LOG_USER'):
            return {
                user: payload, 
                isLogged: true
            }
        case('RESET'):
            return {
                user: null, 
                isLogged: false
            }
        default:
            return {
                ...state
            }
    }
}

export const UserProvider = ({children}) => {

    const [state, dispatch] = useReducer(userReducer, {
        user: null,
        isLogged: false,
    })

    const { user, isLogged } = state
    

    const setCurrentUser = (usr) => {
        dispatch({type: "LOG_USER", payload: usr})
        console.log(usr)
    }
    
    const clearUser = () => {
        dispatch({type: "RESET"})
        localStorage.removeItem("token")
    }

    return(
        <UserContext.Provider value={{isLogged, user, setCurrentUser, clearUser}}>{children}</UserContext.Provider>
    )
}