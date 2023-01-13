import {
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { BigNumber, constants } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import React from "react";
import { useSWRConfig } from "swr";
import { Address } from "wagmi";
import useTokenAllowance from "../../hooks/useTokenAllowance";
import useTokenApprove from "../../hooks/useTokenApprove";
import useTokenBalances from "../../hooks/useTokenBalances";
import useTokenDeposit from "../../hooks/useTokenDeposit";
import { TOKEN_OPTIONS } from "../../utils/config";
import { toFixed } from "../../utils/number";

interface Props {}

function DepositToken({}: Props) {
  const [token, setToken] = React.useState<Address>(TOKEN_OPTIONS[0].value);
  const [amount, setAmount] = React.useState("");

  const { mutate } = useSWRConfig();
  const { tokenBalances } = useTokenBalances();
  const { allowances } = useTokenAllowance();

  const balance = tokenBalances[token];
  const amountWei = parseEther(amount || "0");
  const enoughAllowance =
    token === constants.AddressZero || allowances[token]?.gte(amountWei);

  const {
    approve,
    isLoading: approveLoading,
    isSuccess: approveSuccess,
    error: approveError,
  } = useTokenApprove(token, amountWei);
  const {
    deposit,
    isLoading: depositLoading,
    isSuccess: depositSucces,
    error: depositError,
  } = useTokenDeposit(token, amountWei, enoughAllowance || approveSuccess);

  const handleTokenSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToken(e.target.value as Address);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleMaxClick = () => {
    if (balance) {
      setAmount(formatEther(balance.toString()));
    }
  };

  const handleDepositClick = () => {
    deposit?.();
  };

  const handleApproveClick = () => {
    approve?.();
  };

  React.useEffect(() => {
    if (depositSucces) {
      setTimeout(() => {
        mutate("deposit");
      }, 1000);
    }
  }, [mutate, depositSucces]);

  return (
    <HStack alignItems={"flex-start"} spacing={8}>
      <Stack>
        <InputGroup size="lg">
          <Input
            pr="7.5rem"
            type="number"
            placeholder="Amount"
            onChange={handleInputChange}
            value={amount}
            isInvalid={balance && amountWei.gt(balance)}
          />
          <InputRightElement width={"7rem"} pr="0.1rem">
            <Select
              size="md"
              defaultChecked
              value={token}
              onChange={handleTokenSelectChange}
            >
              {TOKEN_OPTIONS.map((opt) => (
                <option value={opt.value} key={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </InputRightElement>
        </InputGroup>
        <Flex direction="row-reverse" alignItems={"center"}>
          <Button
            size="sm"
            variant="ghost"
            colorScheme={"telegram"}
            onClick={handleMaxClick}
          >
            Max
          </Button>
          <Text as="span" ml="0.5rem">
            Balance: {balance ? toFixed(formatEther(balance.toString())) : "0"}
          </Text>
        </Flex>
      </Stack>

      {!amount || enoughAllowance || approveSuccess ? (
        <Button
          colorScheme="telegram"
          onClick={handleDepositClick}
          disabled={!deposit}
          isLoading={depositLoading}
        >
          Deposit
        </Button>
      ) : (
        <Button
          colorScheme="telegram"
          onClick={handleApproveClick}
          disabled={!approve}
          isLoading={approveLoading}
        >
          Approve
        </Button>
      )}
    </HStack>
  );
}

export default DepositToken;
