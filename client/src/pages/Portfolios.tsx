import React, { useContext } from 'react'
import { Container, Grid, makeStyles, Fab } from '@material-ui/core'
import { Portfolio } from '../components/Portfolio'
import { DataStateContext } from '../contexts'
import AddIcon from '@material-ui/icons/Add'
import { PortfoliosContext } from '../contexts/PortfoliosProvider'

interface Props {}

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}))

const Portfolios: React.FC<Props> = props => {
  const context: any = useContext(PortfoliosContext)
  const classes = useStyles()

  console.log(context.portfolios)

  return (
    <Container maxWidth='lg' className={classes.container}>
      <Grid container spacing={3}>
        {context.portfolios.map((portfolio: any) => (
          <Grid item xs={12} md={4} lg={3} key={portfolio.id}>
            <Portfolio {...portfolio} />
          </Grid>
        ))}
        <Grid item>
          <Fab
            color='primary'
            aria-label='add'
            onClick={() => {
              console.log('create Portfolio')
              // layoutDispatch({ type: 'setEditActionType', payload: 'create' })
            }}
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Portfolios
