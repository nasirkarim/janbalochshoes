/**
 * Format a numeric amount to Pakistani Rupee format
 * Example: 4500 -> "Rs. 4,500"
 */
export const formatPrice = (amount) => {
  if (typeof amount !== 'number') {
    amount = Number(amount) || 0;
  }
  return `Rs. ${amount.toLocaleString('en-PK')}`;
};

export default formatPrice;
