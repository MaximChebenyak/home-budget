//rdd imports
import { useLoaderData } from 'react-router-dom';

//helpers
import { createBudget, createExpense, fetchData, wait } from '../helpers';

//components
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';

//library
import { toast } from 'react-toastify';

//loader
export function dashboardLoader() {
  const userName = fetchData('userName');
  const budgets = fetchData('budgets');
  return { userName, budgets };
}

//action
export async function dashboadrAction({ request }) {
  await wait();
  const data = await request.formData();
  /*  const userName = data.get('userName');
  console.log(userName); */
  const { _action, ...values } = Object.fromEntries(data);
  console.log(_action);

  //new user submition
  if (_action === 'newUser') {
    /*  console.log(formData); */
    try {
      localStorage.setItem('userName', JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (error) {
      throw new Error('There was a problem creating your account.');
    }
  }

  if (_action === 'createBudget') {
    try {
      //create budget
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success('Budget Created!');
    } catch (error) {
      throw new Error('There was a problem creating your budget.');
    }
  }

  if (_action === 'createExpense') {
    try {
      //create expense
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });

      return toast.success(`Expense ${values.newExpense}  Created!`);
    } catch (error) {
      throw new Error('There was a problem creating your expense.');
    }
  }
}

const Dashboard = () => {
  const { userName, budgets } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {/*  {budgets ? () : ()} */}
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom</p>
                <p>Create a budget to get started</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};
export default Dashboard;
