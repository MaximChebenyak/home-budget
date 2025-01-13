import { formatCurrency } from '../helpers';
import { formateDateToLocaleString } from '../helpers';

const ExpenseItem = ({ expense }) => {
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formateDateToLocaleString(expense.createdAt)}</td>
    </>
  );
};
export default ExpenseItem;
