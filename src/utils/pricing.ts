export type OrderSummary = {
  itemTotal: number;
  tax: number;
  total: number;
};

const toCents = (amount: number): number => Math.round(amount * 100);

export const parsePrice = (text: string): number => Number(text.replace(/[^0-9.]/g, ''));

export const formatPrice = (amount: number): string => `$${amount.toFixed(2)}`;

export const calculateOrderSummary = (prices: number[], taxRate: number): OrderSummary => {
  const itemTotalCents = prices.reduce((sum, price) => sum + toCents(price), 0);
  const taxCents = Math.round(itemTotalCents * taxRate);
  return {
    itemTotal: itemTotalCents / 100,
    tax: taxCents / 100,
    total: (itemTotalCents + taxCents) / 100,
  };
};
