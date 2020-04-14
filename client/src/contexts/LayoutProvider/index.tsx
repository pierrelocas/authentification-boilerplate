import React, { createContext, useReducer, useEffect } from 'react'
import { LayoutReducer } from './LayoutReducer'

interface Props {
  children?: any
}

type TEdit = 'create' | 'update' | 'none'

interface IActionSection {
  portfolio: boolean
  edit: boolean
  transaction: boolean
  setting: boolean
}

export interface ILayoutState {
  openMenuBar: boolean
  openActionBar: boolean
  actionSection: IActionSection
  // page: string
  // title: string
  editActionType: TEdit
}

export const intialLayoutState: ILayoutState = {
  openMenuBar: false,
  openActionBar: false,
  actionSection: {
    portfolio: false,
    edit: false,
    transaction: false,
    setting: false
  },
  // page: '',
  // title: '',
  editActionType: 'create'
}

export const LayoutStateContext: any = createContext(intialLayoutState)

export const LayoutProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(LayoutReducer, intialLayoutState)
  // useEffect(() => {
  //   setPage(page)
  //   setTitle(title)
  // }, [page, title])

  // function setPage(page: string) {
  //   dispatch({ type: 'SET_PAGE', payload: page })
  // }

  // function setTitle(title: string) {
  //   dispatch({ type: 'SET_TITLE', payload: title })
  // }

  function toggleMenu() {
    dispatch({ type: 'TOGGLE_MENU' })
  }

  function toggleAction() {
    dispatch({ type: 'TOGGLE_ACTION' })
  }

  function toggleActionSection(section: string) {
    dispatch({ type: 'TOGGLE_ACTION_SECTION', payload: section })
  }

  return (
    <LayoutStateContext.Provider
      value={{
        ...state,
        toggleMenu,
        toggleAction,
        toggleActionSection
      }}
    >
      {children}
    </LayoutStateContext.Provider>
  )
}
