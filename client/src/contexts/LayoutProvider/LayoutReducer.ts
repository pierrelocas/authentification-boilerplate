import { ILayoutState, intialLayoutState } from './'

export const LayoutReducer = (
  state: ILayoutState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case 'TOGGLE_MENU': {
      return { ...state, openMenuBar: !state.openMenuBar }
    }
    case 'TOGGLE_ACTION': {
      if (state.openActionBar)
        return {
          ...state,
          openActionBar: !state.openActionBar,
          actionSection: intialLayoutState.actionSection,
        }
      else {
        return { ...state, openActionBar: !state.openActionBar }
      }
    }
    case 'TOGGLE_ACTION_SECTION': {
      if (!action.payload) return { ...state }
      return {
        ...state,
        openActionBar: true,
        actionSection: {
          ...state.actionSection,
          [action.payload]: !(state.actionSection as any)[action.payload],
        },
      }
    }
    case 'setEditActionType': {
      return {
        ...state,
        openActionBar: true,
        actionSection: { ...state.actionSection, edit: true },
        editActionType: action.payload,
      }
    }
    case 'SET_TITLE': {
      return { ...state, title: action.payload }
    }
    case 'SET_PAGE': {
      return { ...state, page: action.payload }
    }
    default: {
      return { ...state }
    }
  }
}
