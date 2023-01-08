import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { SITE_DESCRIPTION } from '../../utils/config'

interface Props {
  className?: string
}

export function Footer(props: Props) {
  const className = props.className ?? ''

  return (
    <Flex as="footer" className={className} flexDirection="column" justifyContent="center" alignItems="center" my={8}>
      <Text>{SITE_DESCRIPTION}</Text>

      <Flex color="gray.500" gap={2} alignItems="center" mt={2}>
      </Flex>
    </Flex>
  )
}
