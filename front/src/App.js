import "./App.css";
import NavHeader from "./components/navbar/NavHeader";
import { Routes, Route, Navigate } from "react-router-dom";
import Insert from "./components/insertPage/Insert";

import { QueryClient, QueryClientProvider } from "react-query";
import { Detail } from "./components";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <NavHeader></NavHeader>
        <Routes>
          <Route path="/insert" element={<Insert />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
