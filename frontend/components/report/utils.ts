export function formatCurrency(amount: number) {
  if (amount >= 1_000_000) {
    return `AED ${(amount / 1_000_000).toFixed(amount % 1_000_000 === 0 ? 0 : 1)}M/year`;
  }

  if (amount >= 1_000) {
    return `AED ${Math.round(amount / 1_000)}k/year`;
  }

  return `AED ${amount}/year`;
}
