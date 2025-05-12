import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Root = () => {
  return (
    <>
    <Header name="Elias B. Tekle" />
      <main>
      <Outlet />
      </main>
      <Footer year={2025} />
    </>
  );
};

export default Root;
    