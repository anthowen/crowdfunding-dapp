import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Spinner,
  Text,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import { BaseEvent, DepositEvent, WithdrawEvent } from "../types";
import DepositHistory from "./deposit/DepositHistory";
import WithdrawHistory from "./withdraw/WithdrawHistory";

const fetcher = (event: string) =>
  fetch(`/api/${event}`)
    .then((res) => res.json())
    .then((data) => {
      data.sort((a: BaseEvent, b: BaseEvent) => b.blockNumber - a.blockNumber);
      return data;
    });

function History() {
  const {
    data: deposits,
    error: depositError,
    isValidating: depositValidating,
  } = useSWR<DepositEvent[]>("deposit", fetcher);
  const {
    data: withdraws,
    error: withdrawError,
    isValidating: withdrawValidating,
  } = useSWR<WithdrawEvent[]>("withdraw", fetcher);

  return (
    <Tabs size="md" variant="enclosed">
      <TabList>
        <Tab>Deposit</Tab>
        <Tab>Withdraw</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {deposits && depositValidating ? (
            <Text as={Flex} alignItems="center">
              Updating deposits <Spinner size="sm" ml="2" />
            </Text>
          ) : null}

          {depositError ? (
            <Text>An error has occurred</Text>
          ) : !deposits ? (
            <Spinner />
          ) : (
            <DepositHistory data={deposits} />
          )}
        </TabPanel>
        <TabPanel>
          {withdraws && withdrawValidating ? (
            <Text as={Flex} alignItems="center">
              Updating withdraws <Spinner size="sm" ml="2" />
            </Text>
          ) : null}

          {withdrawError ? (
            <Text>An error has occurred</Text>
          ) : !withdraws ? (
            <Spinner />
          ) : (
            <WithdrawHistory data={withdraws} />
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default History;
