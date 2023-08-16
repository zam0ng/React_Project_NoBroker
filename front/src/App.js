import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";

import PAC_Map from 'components/PAC_Map'

import NavHeader from "components/navbar/NavHeader";

// import 'rc-slider/dist/rc-slider.css';


function App() {
  return (
    <div className="App">
  
      <NavHeader />

      <Routes>

          <Route path="/list" element={<PAC_Map/>}></Route>

      </Routes>

    </div>

  );
}

export default App;
