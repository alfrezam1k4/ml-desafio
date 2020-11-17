const formatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 2,
});
export const moneyFormat = (money) =>
  formatter.format(money).replace(/\D00$/, '');

export default {
  moneyFormat,
};
