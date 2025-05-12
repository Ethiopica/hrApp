import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PersonList from './Persons/PersonList';
import PersonCard from './Persons/PersonCard';
import { employees } from './data/EmployeeData';
import './App.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Root from './pages/Root';
import About from './pages/About';
import AddEmployeeForm from './pages/AddEmployeeForm';
import Em from './pages/Em';
import Todos from './Todos/Todos';
import FetchExample from './Todos/FetchExample';


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
        path: 'todos',
        element: <Todos />,
      },
      {
        path: 'fetchexample',
        element: <FetchExample />,
      },
      {
        path: 'employees',
        element: <PersonList />,
      }
      
    ],
  },
]);

const App = () => (
  <>
    
    <RouterProvider router={router} />
   
  </>
  
);

export default App;

