import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
// import PeopleIcon from '@material-ui/icons/People'
import PieChart from '@material-ui/icons/PieChart'
// import BarChartIcon from '@material-ui/icons/BarChart'
import Briefcase from 'mdi-material-ui/Briefcase'
import Wallet from 'mdi-material-ui/Wallet'
import Finance from 'mdi-material-ui/Finance'
import AccountSetting from 'mdi-material-ui/AccountSettings'
import LayersIcon from '@material-ui/icons/Layers'
import AssignmentIcon from '@material-ui/icons/Assignment'

export interface MenuItem {
  name: string
  path: string
  icon: JSX.Element
}

export const mainMenuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />
  },
  {
    name: 'Portfolios',
    path: '/portfolios',
    icon: <Briefcase />
  },
  {
    name: 'Positions',
    path: '/positions',
    icon: <Wallet />
  },
  {
    name: 'Transactions',
    path: '/transactions',
    icon: <ShoppingCartIcon />
  },
  {
    name: 'Statistics',
    path: '/statistics',
    icon: <PieChart />
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: <AccountSetting />
  },
  {
    name: 'Market',
    path: '/market',
    icon: <Finance />
  },
  {
    name: 'Integrations',
    path: '/integrations',
    icon: <LayersIcon />
  }
]

export const secondaryListItems: MenuItem[] = [
  {
    name: 'Current Month',
    path: '/',
    icon: <AssignmentIcon />
  },
  {
    name: 'Last Quarter',
    path: '/',
    icon: <AssignmentIcon />
  },
  {
    name: 'Yearly Report',
    path: '/',
    icon: <AssignmentIcon />
  }
]
