export const transactionTypeOptions = async () => {
  return [
    {
      value: 'C',
      description: 'Credit',
      selected: false
    },
    {
      value: 'D',
      description: 'Debit',
      selected: false
    },
    {
      value: 'T',
      description: 'Transfer',
      selected: false
    },
  ]
}
