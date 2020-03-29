import React, { useContext } from 'react'
import { Container, Grid, makeStyles, Fab } from '@material-ui/core'
import { Portfolio } from '../components/Portfolio'
import {
  DataStateContext,
  LayoutDispatchContext,
  LayoutStateContext
} from '../contexts'
import AddIcon from '@material-ui/icons/Add'

interface Props {}

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}))

const Portfolios: React.FC<Props> = props => {
  const dataState: any = useContext(DataStateContext)
  const layoutDispatch: any = useContext(LayoutDispatchContext)
  const classes = useStyles()

  return (
    <Container maxWidth='lg' className={classes.container}>
      <Grid container spacing={3}>
        {dataState.portfolios.map((portfolio: any) => (
          <Grid item xs={12} md={4} lg={3} key={portfolio.id}>
            <Portfolio {...portfolio} />
          </Grid>
        ))}
        <Grid item>
          <Fab
            color='primary'
            aria-label='add'
            onClick={() =>
              layoutDispatch({ type: 'setEdit', payload: 'create' })
            }
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Portfolios
