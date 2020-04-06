interface IDataState {
  activePortfolio: number | null
  activeTransaction: number | null
  activePosition: number | null
}

export const initialDataState: IDataState = {
  activePortfolio: null,
  activeTransaction: null,
  activePosition: null,
}

export const getInitialDataState = (): any => {
  return initialDataState
}

export const DataReducer = (
  state: IDataState,
  action: { type: string; payload?: any }
): IDataState => {
  switch (action.type) {
    case 'setActivePortfolio': {
      return { ...state, activePortfolio: action.payload }
    }
    case 'setActiveTransaction': {
      return { ...state, activeTransaction: action.payload }
    }
    case 'setActivePosition': {
      return { ...state, activePosition: action.payload }
    }

    // case 'setData': {
    //   const portfolios = action.payload.data?.portfolios
    //   const portfolioId =
    //     !state.activePortfolio && portfolios?.length
    //       ? portfolios.find((p: any) => p.favorite)?.id
    //       : state.activePortfolio
    //   return {
    //     ...state,
    //     ...action.payload.data,
    //     loading: action.payload.loading,
    //     activePortfolio: portfolioId,
    //   }
    // }
    default: {
      return { ...state }
    }
  }
}
