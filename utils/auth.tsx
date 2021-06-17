import React, { useState, useEffect, useContext, createContext } from 'react'

import firebaseClient from '../firebaseClient'
import firebase from 'firebase/app'
import 'firebase/auth'

const authContext = createContext({})

export function ProvideAuth({children}: {children: any}) {
  const auth: any = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState<any | null>(null)

  const signin = (email: string, password: string) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user)
        return response.user
      })
  }

  const signup = (email: string, password: string) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user)
        return response.user
      })
  }

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false)
      })
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(false)
      }
    })
    return () => unsubscribe()
  }, [])

  return {
    userId: user && user.id,
    signin,
    signup,
    signout,
  }

}
