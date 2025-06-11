import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import PersonCard from "../components/Persons/PersonCard";
import PersonList from "../components/Persons/PersonList";
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

    
    