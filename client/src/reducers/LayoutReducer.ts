interface IActionSection {
  portfolio: boolean
  edit: boolean
  transaction: boolean
  setting: boolean
}

interface ILayoutState {
  openMenuBar: boolean
  openActionBar: boolean
  actionSection: IActionSection
}

export const intialLayoutState: ILayoutState = {
  openMenuBar: true,
  openActionBar: false,
  actionSection: {
    portfolio: false,
    edit: false,
    transaction: false,
    setting: false
  }
}

export const LayoutReducer = (
  state: ILayoutState,
  action: { type: string; payload?: string }
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
    default: {
      return { ...state }
    }
  }
}
