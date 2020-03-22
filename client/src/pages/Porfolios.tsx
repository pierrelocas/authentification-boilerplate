import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Container, Grid, makeStyles } from '@material-ui/core'
import { Portfolio } from '../components/Portfolio'
import { DataStateContext } from '../contexts'

interface Props {}

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}))

const Portfolios: React.FC<Props> = props => {
  const dataState: any = useContext(DataStateContext)
  const classes = useStyles()

  return (
    <Container maxWidth='lg' className={classes.container}>
      <Grid container spacing={3}>
        {dataState.portfolios.map((portfolio: any) => (
          <Grid item xs={12} md={4} lg={3} key={portfolio.id}>
            <Portfolio {...portfolio} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Portfolios
