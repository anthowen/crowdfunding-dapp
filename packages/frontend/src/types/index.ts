export type TokenLabel = 'USDT' | 'USDC' | 'MATIC';

export type DepositEvent = {
  hash: string;
  blockNumber: number;
  account: string;
  token: string;
  amount: string;
};

export type WithdrawEvent = {
  hash: string;
  blockNumber: number;
  token: string;
  amount: string;
};
