import React from 'react'
import { Flex, useColorModeValue, Spacer, Heading, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { SITE_NAME } from '../../utils/config'
import { LinkComponent } from './LinkComponent'
import { ThemeSwitcher } from './ThemeSwitcher'

interface Props {
  className?: string
}

export function Header(props: Props) {
  const className = props.className ?? ''

  return (
    <Flex as="header" className={className} bg={useColorModeValue('gray.100', 'gray.900')} px={4} py={2} mb={8} alignItems="center">
      <LinkComponent href="/">
        <Heading as="h1" size="md">
          {SITE_NAME}
        </Heading>
      </LinkComponent>

      <LinkComponent href="/faucet">
        <Text as="p" size="sm" ml="2rem">
          Faucet
        </Text>
      </LinkComponent>

      <Spacer />

      <Flex alignItems="center" gap={4}>
        <ConnectButton />
        <ThemeSwitcher />
      </Flex>
    </Flex>
  )
}
