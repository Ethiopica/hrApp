
import Header from './Header';
import Footer from './Footer';
import Person from './Person';
import './App.css'

const App = () => {
  return (<div> 
  <Header name="HR App" />
  <main>
  <Person name="Elias" title="CEO" salary="50000" phone="0403232573" email="eliobais@gmail.com" animal="Not Fox"/>
  </main>
  <Footer name="Copy right @ REACT25K"/>
  </div>
  );
};
 
export default App
