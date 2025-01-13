export const wait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 2000));

const generateRandomColor = () => {
  const existBudgetLength = fetchData('budgets')?.length ?? 0;
  return `${existBudgetLength * 34} 65% 50%`;
};

// local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

//create budget
export const createBudget = ({ name, amount }) => {
  const newitem = {
    id: crypto.randomUUID(),
    name: name,
    createAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData('budgets') ?? [];
  return localStorage.setItem(
    'budgets',
    JSON.stringify([...existingBudgets, newitem])
  );
};

//create Expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newitem = {
    id: crypto.randomUUID(),
    name: name,
    createAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpenses = fetchData('expenses') ?? [];
  return localStorage.setItem(
    'expenses',
    JSON.stringify([...existingExpenses, newitem])
  );
};

//delete item
export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};
