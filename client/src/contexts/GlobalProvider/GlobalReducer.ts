import { IGlobalState } from '.'

interface IAction {
  type: string
  payload?: any
}

export const GlobalReducer = (state: IGlobalState, action: IAction) => {
  switch (action.type) {
    case 'SET_TITLE': {
      return { ...state, title: action.payload }
    }
    case 'SET_PAGE': {
      return { ...state, page: action.payload }
    }
    case 'SET_ACTIVE_PORTFOLIO': {
      return { ...state, activePortfolio: action.payload }
    }
    default:
      return state
  }
}
