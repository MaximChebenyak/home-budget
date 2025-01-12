//rrd imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//library imports
import { ToastContainer, toast } from 'react-toastify';

//layouts
import Main, { maindLoader } from './layouts/Main';

//routes
import Dashboard, { dashboadrAction, dashboardLoader } from './pages/Dashboard';
import Error from './pages/Error';

//actions
import { logoutAction } from './actions/logout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: maindLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboadrAction,
        errorElement: <Error />,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
  //or  --- path *
  /*   {
    path: '*',
    element: <Error />,
  }, */
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
