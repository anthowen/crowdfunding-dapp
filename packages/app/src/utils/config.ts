import { ThemingProps } from '@chakra-ui/react'
import { polygonMumbai } from '@wagmi/chains'
import { constants } from 'ethers'
import { Address } from 'wagmi'
import { TokenLabel } from '../types'
import { usdcContract, usdtContract } from './contracts'

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

export const TOKEN_OPTIONS: Array<{value: Address, label: TokenLabel}> = [
  {
    value: constants.AddressZero,
    label: "MATIC",
  },
  {
    value: usdcContract.address,
    label: "USDC",
  },
  {
    value: usdtContract.address,
    label: "USDT",
  },
];

export const getTokenLabel = (address: string) => TOKEN_OPTIONS.find(opt => opt.value === address)?.label;