import React from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAccount, useContractReads, useNetwork } from "wagmi";
import DepositToken from "../components/deposit/DepositToken";
import { Head } from "../components/layout/Head";
import { eventContract } from "../utils/contracts";
import History from "../components/History";
import WithdrawTokens from "../components/withdraw/WithdrawTokens";
import { WalletBanner } from "../components/layout/WalletBanner";

export default function Home() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...eventContract,
        functionName: "title",
      },
      {
        ...eventContract,
        functionName: "owner",
      },
    ],
  });
  const isOwner = data?.[1] === address;

  return (
    <>
      <Head />
      <main>
        <WalletBanner />
        <Heading as="h2" mb="6">
          {data?.[0] as string}
        </Heading>

        {address && !isOwner ? (
          <Text mb="4">
            If you are an owner of the{" "}
            <Link
              color="green.500"
              href={`${chain?.blockExplorers?.default.url}/address/${eventContract.address}`}
              isExternal
            >
              CrowdfundingEvent
            </Link>{" "}
            contract, and want to withdraw tokens, please switch to the owner
            wallet.
          </Text>
        ) : null}

        <Stack spacing={10}>
          <Card>
            <CardHeader>
              <Heading as="h4" size="md">
                {isOwner ? "Withdraw" : "Deposit"}
              </Heading>
            </CardHeader>
            <CardBody>
              {isOwner ? <WithdrawTokens /> : <DepositToken />}
            </CardBody>
          </Card>

          <Box>
            <Text as="p" mb="4" fontSize="xl">
              See past deposit/withdraw history below.
            </Text>
            <History />
          </Box>
        </Stack>
      </main>
    </>
  );
}
