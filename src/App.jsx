import { createBrowserRouter, RouterProvider } from 'react-router';
import PersonList from './components/Persons/PersonList';
import PersonCard from './components/Persons/PersonCard';
import { employees } from './data/EmployeeData';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Root from './pages/Root';
import About from './pages/About';
import AddEmployeeForm from './pages/AddEmployeeForm';
import Em from './pages/Em';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'add',
        element: <AddEmployeeForm />,
      },
      {
        path:'em',
        element:<Em/>,
      },
    
      {
        path: 'employees',
        element: <PersonList />,
      },
      {
        path: "themetoggle", 
        element: <ThemeToggle />,
      },
      
    ],
  },
]);

const App = () => (
  <>
    <RouterProvider router={router} />
  </>
);

export default App;

