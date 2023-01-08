import { ThemingProps } from '@chakra-ui/react'
import { polygonMumbai } from '@wagmi/chains'

export const SITE_NAME = 'Crowdfunding DApp'
export const SITE_DESCRIPTION = 'Crowdfunding DApp where people can contribute with MATIC/ERC20 tokens'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const ETH_CHAINS = [polygonMumbai]

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password: process.env.SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
