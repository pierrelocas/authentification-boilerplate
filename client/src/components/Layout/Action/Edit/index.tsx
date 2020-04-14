import React, { useContext } from 'react'
import { EditPortfolio } from './EditPortfolio'
import { LayoutStateContext } from '../../../../contexts/LayoutProvider'

interface Props {}

export const EditAction: React.FC<Props> = () => {
  const context: any = useContext(LayoutStateContext)
  switch (context.page) {
    case 'portfolios':
      return <EditPortfolio />
    default:
      return <>No Edit Available for this content</>
  }
}
