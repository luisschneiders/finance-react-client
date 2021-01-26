/**
 * 
 * @param group // E.g. Expenses, Transactions
 * @param props // Props of the group that has the amount
 */
export const amountByGroup = (group: any, props: any) => {
  let value: number = 0;
  group.forEach((groupType: any) => {
    value += groupType[props];
  });
  return value.toFixed(2);
}
