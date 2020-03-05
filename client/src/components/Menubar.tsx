import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'

import { MenuItem, mainMenuItems, secondaryListItems } from './menubarItems'
import { MENUBAR_WIDTH } from '../config'
import {
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

interface Props {
  handleDrawerClose: any
  open: any
  title: string
}

interface MenuItemProps extends MenuItem {
  title: string
}

const useStyles = makeStyles(theme => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: MENUBAR_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  }
}))

const MenubarItem: React.FC<MenuItemProps> = ({ name, path, icon, title }) => {
  const history = useHistory()
  return (
    <ListItem
      button
      onClick={() => history.push(path)}
      selected={title === name}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  )
}

// SHOULD INCLUDE LISTITMES FILE DIRECTLY IN HERE
export const Menubar: React.FC<Props> = props => {
  const { handleDrawerClose, open, title } = props
  const classes = useStyles()
  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List style={{ padding: '0px' }}>
        {mainMenuItems.map(item => (
          <MenubarItem {...item} title={title} key={item.name} />
        ))}
      </List>
      <Divider />
      <List style={{ padding: '0px' }}>
        <ListSubheader inset>Reports</ListSubheader>
        {secondaryListItems.map(item => (
          <MenubarItem {...item} title={title} key={item.name} />
        ))}
      </List>
    </Drawer>
  )
}
