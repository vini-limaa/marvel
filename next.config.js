const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
  const isLocalhost = phase === PHASE_DEVELOPMENT_SERVER
  const tzoffset = new Date().getTimezoneOffset() * 60000
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1)

  const env = {
    dateBuild: localISOTime,
    nextUrl: (() => {
      if (isLocalhost) return 'http://localhost:3000/api'
      return 'http://localhost:3000/movel/api'
    })(),
    marvelApi: (() => {
      if (isLocalhost) return 'http://localhost:3000'
      return 'http://localhost:3000'
    })(),
    // NODE_OPTIONS: (() => {
    //   '--inspect'
    // })()
  }


  const publicRuntimeConfig = {
    NEXTURL: env.nextUrl
  }

  const webpack = (config) => {
    
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: ['@svgr/webpack']
    })


    return config
  }

  const redirects = async () => {
    return [
      {
        source: '/',
        destination: '/characters',
        permanent: false
      }
    ]
  }


  return {
    env,
    publicRuntimeConfig,
    reactStrictMode: false,
    webpack,
    redirects
  }
}
