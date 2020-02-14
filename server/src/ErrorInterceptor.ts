import { MiddlewareFn } from 'type-graphql'
import { ApolloError } from 'apollo-server-express'

// Not sure if needed have to check error messages in production environment
export const ErrorInterceptor: MiddlewareFn<any> = async (_, next) => {
  try {
    return await next()
  } catch (err) {
    // hide errors from db like printing sql query
    // if (context) {
    //   console.log('in error interceptor', info)
    // }

    // Log the detailed error
    console.log(JSON.stringify(err, null, 2))

    // rethrow only the error message
    throw new ApolloError(err.message)
  }
}
