import "./App.css";
import NavHeader from "./components/navbar/NavHeader";
import { Routes, Route, Navigate } from "react-router-dom";
import Insert from "./components/insertPage/Insert";

function App() {
  return (
    <div className="App">
      <NavHeader></NavHeader>
      <Routes>
        <Route path="/insert" element={<Insert />} />
      </Routes>
    </div>
  );
}

export default App;
