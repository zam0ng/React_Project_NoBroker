import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import NavHeader from "./components/navbar/NavHeader";
import Insert from "./components/insertPage/Insert";
import List from "./components/listPage/ListPage";
import { Detail } from "./components";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <NavHeader></NavHeader>
        <Routes>
          <Route path="/insert" element={<Insert />} />
          <Route path="/detail/:id" element={<Detail queryClient={queryClient} />} />
          <Route path="/list" element={<List />} />
      </Routes>

    </div>
    </QueryClientProvider>
  );
}

export default App;
