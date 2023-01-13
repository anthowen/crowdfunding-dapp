import { getAddress, hexStripZeros } from "ethers/lib/utils";

export const checksumAddress = (address: string) => {
  return getAddress(address.toLowerCase());
};

export const convertFromHexString = (hexString: string) => {
  let strippped = hexStripZeros(hexString);
  const len = strippped.length;

  if (len < 42) {
    const missing = 42 - len;
    strippped = '0x' + '0'.repeat(missing) + strippped.slice(2);
  }

  return checksumAddress(strippped);
};

export const shortenHexString = (address: string, amount = 4) => {
  return address.slice(0, amount) + "..." + address.slice(-amount);
};
