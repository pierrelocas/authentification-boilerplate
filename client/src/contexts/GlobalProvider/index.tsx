// contained active selection that affects multiple components. States that affects layout go in layoutProvider.
// data itself will be in another Provider
import React, { createContext, useReducer, useEffect } from 'react'
import { GlobalReducer } from './GlobalReducer'

interface Props {
  children?: any
  page: string
  title: string
}

// add page and title since they don't affect the layout... edit action
export interface IGlobalState {
  page: string
  title: string
  activePortfolio: number | null
  activeTransaction: number | null
  activePosition: number | null
  setActivePortfolio?: (portfolioId: number) => void
}

export const initialState: IGlobalState = {
  page: '',
  title: '',
  activePortfolio: null,
  activeTransaction: null,
  activePosition: null,
}

export const GlobalStateContext = createContext(initialState)

export const GlobalProvider: React.FC<Props> = ({ children, page, title }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState)

  useEffect(() => {
    setPage(page)
    setTitle(title)
  }, [page, title])

  // Actions
  function setPage(page: string) {
    dispatch({ type: 'SET_PAGE', payload: page })
  }

  function setTitle(title: string) {
    dispatch({ type: 'SET_TITLE', payload: title })
  }

  function setActivePortfolio(portfolioId: number) {
    dispatch({ type: 'SET_ACTIVE_PORTFOLIO', payload: portfolioId })
  }

  return (
    <GlobalStateContext.Provider value={{ ...state, setActivePortfolio }}>
      {children}
    </GlobalStateContext.Provider>
  )
}
