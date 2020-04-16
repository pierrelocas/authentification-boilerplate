import { PortfoliosQuery } from '../../generated/graphql'

export const PortfoliosReducer = (
  state: PortfoliosQuery,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    default:
      return state
  }
}
