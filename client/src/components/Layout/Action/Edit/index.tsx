import React, { useContext } from 'react'
import { EditPortfolio } from './EditPortfolio'
import { GlobalStateContext } from '../../../../contexts/GlobalProvider'

interface Props {}

export const EditAction: React.FC<Props> = () => {
  const { page } = useContext(GlobalStateContext)
  switch (page) {
    case 'portfolios':
      return <EditPortfolio />
    default:
      return <>No Edit Available for this content</>
  }
}
