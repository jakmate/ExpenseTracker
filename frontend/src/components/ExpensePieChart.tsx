import { PieChart } from './PieChart';

export const ExpensePieChart = () => (
  <PieChart
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
