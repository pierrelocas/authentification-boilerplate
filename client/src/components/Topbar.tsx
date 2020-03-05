import React, { useState, useContext } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import { MENUBAR_WIDTH } from '../config'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Divider,
  InputBase
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircle from '@material-ui/icons/AccountCircle'
import clsx from 'clsx'
import { useSignOutMutation } from '../generated/graphql'
import { setAccessToken } from '../accessToken'
import { useHistory } from 'react-router-dom'
import { NotificationContext } from '../NotificationContext'

interface Props {
  handleDrawerOpen: () => void
  title: string
  open: boolean
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: MENUBAR_WIDTH,
    width: `calc(100% - ${MENUBAR_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  },
  title: {
    flexGrow: 1
  },
  appBarSpacer: theme.mixins.toolbar
}))

export const Topbar: React.FC<Props> = props => {
  const { setNotification } = useContext(NotificationContext)
  const { handleDrawerOpen, title, open } = props
  const history = useHistory()
  const [logout, { client }] = useSignOutMutation({
    onError: err =>
      setNotification!({
        show: true,
        type: 'error',
        message: err.message.split(':')[1]
      }),
    update: () => {
      client!.resetStore()
    }
  })
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const anchorOpen = Boolean(anchorEl)

  function handleMenu(event: any) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    await logout()
    setAccessToken('')
    // Not sure if it is better to reset store in the update fn
    // try {
    //   await client!.resetStore()
    // } catch (err) {
    //   console.log(err)
    // }

    setNotification!({
      show: true,
      type: 'success',
      message: 'Logout successful!'
    })
    history.push('/')
  }

  return (
    <AppBar
      position='absolute'
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component='h1'
          variant='h6'
          color='inherit'
          noWrap
          className={classes.title}
        >
          {title}
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder='Search…'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <IconButton color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color='inherit' onClick={handleMenu}>
          <AccountCircle
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            color='inherit'
          />
        </IconButton>
        <Menu
          id='menu-appbar'
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={anchorOpen}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>Sign out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
