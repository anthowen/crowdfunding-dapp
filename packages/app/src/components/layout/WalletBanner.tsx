import React from 'react'
import { Text } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

interface Props {
  className?: string
}

export function WalletBanner(props: Props) {
  const { address } = useAccount();

  if (address) {
    return null;
  }

  return (
    <Text color="red.500" fontStyle={"italic"} as="p" my="4">
      Please connect your wallet first.
    </Text>
  )
}
