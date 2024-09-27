export const formatterWithCents = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatterWithoutCents = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});