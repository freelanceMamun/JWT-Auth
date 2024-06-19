import { createBrowserRouter, RouterProvider } from 'react-router-dom';
///  import all componets
import UserName from './components/userName';
import Password from './components/pasword';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNot from './components/PageNot';

// Root Routes

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserName></UserName>,
  },
  {
    path: '/register',
    element: <Register></Register>,
  },
  {
    path: '/password',
    element: <Password></Password>,
  },
  {
    path: '/Profile',
    element: <Profile></Profile>,
  },
  {
    path: '/Recovery',
    element: <Recovery></Recovery>,
  },
  {
    path: '/Reset',
    element: <Reset></Reset>,
  },
  {
    path: '/PageNot',
    element: <PageNot></PageNot>,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
