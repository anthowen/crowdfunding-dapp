import React from "react";
import {
  Box,
  Button,
  Card,
  Heading,
  Stack,
  Text,
  CardHeader,
  CardBody,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { constants } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { useAccount } from "wagmi";
import { Head } from "../components/layout/Head";
import useTokenBalances from "../hooks/useTokenBalances";
import { TOKEN_OPTIONS } from "../utils/config";
import useTokenMint from "../hooks/useTokenMint";
import { WalletBanner } from "../components/layout/WalletBanner";

const AMOUNT = parseEther("10000");

export default function Home() {
  const { address } = useAccount();
  const { tokenBalances } = useTokenBalances();
  const { mintUsdc, mintUsdt } = useTokenMint(AMOUNT);
  const handleUSDTMint = () => {
    mintUsdt?.();
  };

  const handleUSDCMint = () => {
    mintUsdc?.();
  };

  return (
    <>
      <Head />
      <main>
        <WalletBanner />
        <Heading as="h2" mb="6">
          Request USDT & USDC tokens
        </Heading>

        <Stack spacing={10}>
          <Card>
            <CardHeader>
              <Heading as="h4" size="md">
                Your current balance
              </Heading>
            </CardHeader>
            <CardBody>
              {TOKEN_OPTIONS.filter(
                (opt) => opt.value !== constants.AddressZero
              ).map((opt) => (
                <Text key={opt.value}>{`${opt.label}: ${formatEther(
                  tokenBalances[opt.value] || "0"
                )}`}</Text>
              ))}
            </CardBody>
          </Card>

          <HStack spacing={8}>
            <Button
              colorScheme="telegram"
              onClick={handleUSDTMint}
              disabled={!address}
            >
              Mint 10,000 USDT
            </Button>
            <Button
              colorScheme="telegram"
              onClick={handleUSDCMint}
              disabled={!address}
            >
              Mint 10,000 USDC
            </Button>
          </HStack>
        </Stack>
      </main>
    </>
  );
}
