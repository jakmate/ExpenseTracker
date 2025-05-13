import { TransactionPieChart } from './TransactionPieChart';

export const ExpensePieChart = () => (
  <TransactionPieChart
    transactionType='expense'
    title='Expenses by Category'
    colors={[
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#4BC0C0',
      '#9966FF',
      '#FF9F40',
      '#E7E9ED',
      '#8C9EFF',
    ]}
  />
);
