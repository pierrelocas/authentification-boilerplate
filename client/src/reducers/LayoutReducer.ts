interface IActionSection {
  portfolio: boolean
  edit: boolean
  transaction: boolean
  setting: boolean
}

type TEdit = 'create' | 'update' | 'none'

interface ILayoutState {
  openMenuBar: boolean
  openActionBar: boolean
  actionSection: IActionSection
  page: string
  title: string
  edit: TEdit
}

export const intialLayoutState: ILayoutState = {
  openMenuBar: true,
  openActionBar: false,
  actionSection: {
    portfolio: false,
    edit: false,
    transaction: false,
    setting: false
  },
  page: '',
  title: '',
  edit: 'create'
}

export const LayoutReducer = (
  state: ILayoutState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case 'toggleMenuBar': {
      return { ...state, openMenuBar: !state.openMenuBar }
    }
    case 'toggleActionBar': {
      if (state.openActionBar)
        return {
          ...state,
          openActionBar: !state.openActionBar,
          actionSection: intialLayoutState.actionSection
        }
      else {
        return { ...state, openActionBar: !state.openActionBar }
      }
    }
    case 'toggleActionSection': {
      if (!action.payload) return { ...state }
      return {
        ...state,
        actionSection: {
          ...state.actionSection,
          [action.payload]: !(state.actionSection as any)[action.payload]
        }
      }
    }
    case 'setEdit': {
      return {
        ...state,
        openActionBar: true,
        actionSection: { ...state.actionSection, edit: true },
        edit: action.payload
      }
    }
    case 'setTitle': {
      return { ...state, title: action.payload }
    }
    case 'setPage': {
      return { ...state, page: action.payload }
    }
    default: {
      return { ...state }
    }
  }
}
