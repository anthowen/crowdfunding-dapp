export type TokenLabel = "USDT" | "USDC" | "MATIC";

export interface BaseEvent {
  hash: string;
  blockNumber: number;
}

export interface DepositEvent extends BaseEvent {
  account: string;
  token: string;
  amount: string;
}

export interface DepositEvent extends BaseEvent {
  token: string;
  amount: string;
}
