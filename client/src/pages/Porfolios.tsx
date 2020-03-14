import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Container, Grid, makeStyles } from '@material-ui/core'
import Portfolio from '../components/Portfolio'
import { DataContext, ActivePortfolioContext } from '../components/Layout'

interface Props {}

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}))

const Portfolios: React.FC<Props> = props => {
  const data: any = useContext(DataContext)
  const portfolioContext: any = useContext(ActivePortfolioContext)
  const classes = useStyles()
  console.log('data from context', data)
  console.log('portfolioIdContext', portfolioContext)
  return (
    <Container maxWidth='lg' className={classes.container}>
      <Grid container spacing={3}>
        {data.portfolios.map((portfolio: any) => (
          <Grid item xs={12} md={4} lg={3} key={portfolio.id}>
            <Portfolio
              {...portfolio}
              activePortfolio={portfolioContext.portfolioId}
              handlePortfolioChange={portfolioContext.setPortfolioId}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Portfolios
