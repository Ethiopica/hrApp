import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PersonCard from "../Persons/PersonCard";
import PersonList from "../Persons/PersonList";
import { employees } from "../data/EmployeeData";

const Em = () => (
  <>
    <main>
      <div className="boxes">
        {employees.map((employee) => (
          <PersonList key={employee.id} {...employee} />
        ))}
        <PersonCard />
        <Outlet />
      </div>
    </main>
  </>
);

export default Em;

    
    