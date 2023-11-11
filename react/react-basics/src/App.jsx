import "./App.css";
import ListEmployee from "./components/ListEmployee";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employee from "./components/Employee";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ListEmployee />}></Route>
          <Route path="/employees" element={<ListEmployee />}></Route>
          <Route path="/add-employee" element={<Employee />}></Route>
          <Route path="/edit-employee/:id" element={<Employee />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
