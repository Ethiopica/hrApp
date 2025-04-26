
import Header from "./Header";
import Footer from "./Footer";
import PersonList from "./PersonList";
import PersonCard from "./PersonCard";
import {employees} from "./EmployeeData";
import "./App.css"

const App = () => {
  return (
  <> 
  <Header name="HR App" />
  <main>
    <div className="boxes">
    {employees.map(employee => (
  <PersonList key={employees.id} {...employee}/>
    ))}
    <PersonCard />
   </div>
  </main>
  <Footer name="Copy right @ REACT25K"/>
 </>
  );
};
 
export default App;
