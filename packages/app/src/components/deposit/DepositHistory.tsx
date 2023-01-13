import React from "react";
import {
  Table,
  TableCaption,
  TableContainer,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Link,
} from "@chakra-ui/react";
import { DepositEvent } from "../../types";
import { shortenHexString } from "../../utils/string";
import { formatEther } from "ethers/lib/utils.js";
import { useNetwork } from "wagmi";
import { DEFAULT_EXPLORER, getTokenLabel } from "../../utils/config";

interface Props {
  data: DepositEvent[];
}

function DepositHistory({ data = [] }: Props) {
  const { chain } = useNetwork();
  const explorerUrl = chain?.blockExplorers?.default.url || DEFAULT_EXPLORER;

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="gray">
        <TableCaption>{`Deposit history ${
          data.length === 0 ? " (No deposits yet) " : ""
        }`}</TableCaption>
        <Thead>
          <Tr>
            <Th>Transaction</Th>
            <Th isNumeric>Block #</Th>
            <Th>From</Th>
            <Th isNumeric>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(({ hash, blockNumber, account, token, amount }, idx) => (
            <Tr key={idx}>
              <Td>
                <Link
                  color="green.500"
                  href={`${explorerUrl}/tx/${hash}`}
                  isExternal
                >
                  {shortenHexString(hash, 8)}
                </Link>
              </Td>
              <Td isNumeric>
                <Link
                  color="green.500"
                  href={`${explorerUrl}/block/${blockNumber}`}
                  isExternal
                >
                  {blockNumber}
                </Link>
              </Td>
              <Td>
                <Link
                  color="green.500"
                  href={`${explorerUrl}/address/${account}`}
                  isExternal
                >
                  {shortenHexString(account)}
                </Link>
              </Td>
              <Td isNumeric>{`${formatEther(amount)} ${getTokenLabel(
                token
              )}`}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default DepositHistory;
