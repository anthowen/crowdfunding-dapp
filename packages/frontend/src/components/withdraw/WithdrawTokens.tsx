import {
  Button,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
  Icon,
  Box,
} from "@chakra-ui/react";
import { CheckCircleIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { formatEther } from "ethers/lib/utils.js";
import React from "react";
import useTokenBalances from "../../hooks/useTokenBalances";
import { TOKEN_OPTIONS } from "../../utils/config";
import { eventContract } from "../../utils/contracts";
import { Address } from "wagmi";
import useTokenWithdraw from "../../hooks/useTokenWithdraw";
import { BigNumber } from "ethers";
import { useSWRConfig } from "swr";

function WithdrawTokens() {
  const [token, setToken] = React.useState<Address>();
  const { tokenBalances } = useTokenBalances(eventContract.address);

  const { mutate } = useSWRConfig();
  const { withdraw, isLoading, isSuccess, error } = useTokenWithdraw(token);

  const handleWithdrawClick = () => {
    withdraw?.();
  };
  const handleTokenClick = (sel: Address) => {
    setToken(sel);
  };

  const hasBalance = !!token && tokenBalances[token]?.gt(BigNumber.from(0));

  React.useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        mutate("withdraw");
      }, 1000);
    }
  }, [mutate, isSuccess]);

  return (
    <HStack alignItems={"flex-start"} spacing={8}>
      <VStack alignItems={"flex-start"}>
        <Text>Select a token to withdraw:</Text>
        <List spacing={3}>
          {TOKEN_OPTIONS.map((opt) => (
            <ListItem key={opt.value}>
              <ListIcon
                as={token === opt.value ? CheckCircleIcon : NotAllowedIcon}
                color={token === opt.value ? "green.500" : "gray.500"}
              />

              <Box
                onClick={() => handleTokenClick(opt.value)}
                as="span"
                cursor={"pointer"}
              >
                {opt.label}:{" "}
                <Text as="span">
                  {formatEther(tokenBalances[opt.value] || "0")}
                </Text>
              </Box>
            </ListItem>
          ))}
        </List>
      </VStack>

      <Button
        colorScheme="telegram"
        onClick={handleWithdrawClick}
        disabled={!token || !hasBalance || !withdraw}
        isLoading={isLoading}
      >
        Withdraw
      </Button>
    </HStack>
  );
}

export default WithdrawTokens;
