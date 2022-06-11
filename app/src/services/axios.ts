import * as express from 'express'
import * as next from 'next'
import axios from 'axios'
import { parseCookies } from 'nookies'
import { config } from 'process'

export function getApiClient (ctx?: Pick<next.NextPageContext, 'req'> | {
req: next.NextApiRequest | express.Request} | null | undefined
) {
  const { 'auth-token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3001'
  })

  api.interceptors.request.use(config => {
    console.log(config)
    return config
  })

  api.defaults.headers.post['Content-Type'] = 'application/json'
  api.defaults.headers.put['Content-Type'] = 'application/json'

  if (token) {
    api.defaults.headers['auth-token'] = token
  }

  return api
}

// API to use with Browser
export const api = getApiClient()

// API to use with SSR
// export const apiClient = getApiClient(ctx)
