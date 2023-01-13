export const toFixed = (value: string | number, decimals: number = 3) => {
  return (typeof value === 'string' ? parseFloat(value) : value).toFixed(decimals);
}
