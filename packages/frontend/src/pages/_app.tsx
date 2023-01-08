import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import * as React from 'react'
import { WagmiConfig } from 'wagmi'

import { chains, client } from '../providers/wagmi'
import { useIsMounted } from '../hooks/useIsMounted'
import { SITE_NAME } from '../utils/config'
import { ChakraProvider } from '../providers/Chakra'
import { Layout } from '../components/layout'

function App({ Component, pageProps }: AppProps) {
  const mounted = useIsMounted();

  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <NextHead>
            <title>{SITE_NAME}</title>
          </NextHead>

          {mounted && (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}

export default App
