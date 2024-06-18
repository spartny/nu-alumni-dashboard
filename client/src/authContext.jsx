import { createContext, useReducer, useEffect, useState } from 'react'
import axios from 'axios';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user){
      axios.post(`${process.env.REACT_APP_SERVER_URL}/checkExpiry`, {'token': user.token})
      .then(result => {
        if (!result.expiry) {
          dispatch({ type: 'LOGIN', payload: user }) 
        }
      }).catch(err => console.log(err))
    }
    setLoading(false);
    
  }, [])
  
  console.log('AuthContext state:', state)

  
  return (
    <AuthContext.Provider value={{ ...state, dispatch, loading}}>
      { children }
    </AuthContext.Provider>
  )

}