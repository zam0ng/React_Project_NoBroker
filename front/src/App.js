import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";

import List from "components/List";
import NavHeader from "components/navbar/NavHeader";

function App() {
  return (
    <div className="App">
  
      <NavHeader />

      <Routes>
        <Route path="/list" element={<List/>}></Route>

      </Routes>

    </div>

  );
}

export default App;
