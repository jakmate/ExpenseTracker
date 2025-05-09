import { PieChart } from './PieChart';

export const IncomePieChart = () => (
  <PieChart
    transactionType='income'
    title='Income by Category'
    colors={[
      '#4BC0C0',
      '#9966FF',
      '#FF9F40',
      '#36A2EB',
      '#FF6384',
      '#FFCE56',
      '#E7E9ED',
      '#8C9EFF',
    ]}
  />
);
