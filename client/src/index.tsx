import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { ApolloProvider } from '@apollo/react-hooks'
import jwtDecode from 'jwt-decode'
import { getAccessToken, setAccessToken } from './accessToken'
import { App } from './App'

const cache = new InMemoryCache()

const link = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
})

const authLink = setContext((_, { headers }) => {
  const accessToken = getAccessToken()
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `bearer ${accessToken}` : ''
    }
  }
})

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return true
    }
    //check if token is valid and not expired
    try {
      const { exp } = jwtDecode(accessToken)
      if (Date.now() >= exp * 1000) {
        return false
      } else {
        return true
      }
    } catch (err) {
      console.log(err)
      return false
    }
  },
  fetchAccessToken: () => {
    return fetch('http://localhost:4000/refresh-token', {
      credentials: 'include',
      method: 'POST'
    })
  },
  handleFetch: accessToken => {
    setAccessToken(accessToken)
  },
  handleError: err => {
    console.warn('Your refresh token is invalid. Try to relogin')
    console.error(err)
  }
})

const client = new ApolloClient({
  cache: cache,
  link: ApolloLink.from([tokenRefreshLink, authLink, link])
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
