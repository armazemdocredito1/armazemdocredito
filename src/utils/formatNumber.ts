export const formatNumber = new Intl.NumberFormat('pt-BR', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format

export const formatInteger = new Intl.NumberFormat('pt-BR', {
  style: 'decimal',
  maximumFractionDigits: 0,
}).format

