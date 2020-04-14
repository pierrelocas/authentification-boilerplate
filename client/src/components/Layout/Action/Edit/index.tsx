import React, { useContext } from 'react'
import { EditPortfolio } from './EditPortfolio'
import { GlobalStateContext } from '../../../../contexts/GlobalProvider'

interface Props {}

export const EditAction: React.FC<Props> = () => {
  const globalContext: any = useContext(GlobalStateContext)
  switch (globalContext.page) {
    case 'portfolios':
      return <EditPortfolio />
    default:
      return <>No Edit Available for this content</>
  }
}
