import React, { useContext } from 'react'
import { EditPortfolio } from './EditPortfolio'
import { LayoutStateContext } from '../../../../contexts'

interface Props {}

export const EditAction: React.FC<Props> = () => {
  const state: any = useContext(LayoutStateContext)
  switch (state.page) {
    case 'portfolios':
      return <EditPortfolio />
    default:
      return <>No Edit Available for this content</>
  }
}
