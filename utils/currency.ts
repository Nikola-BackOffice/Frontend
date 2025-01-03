export function formatCurrency(amount: number | string): string {
  return `$${Number(amount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}