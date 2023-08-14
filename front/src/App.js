import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import NavHeader from "./components/navbar/NavHeader";
import Insert from "./components/insertPage/Insert";
import List from "./components/listPage/ListPage";
import Main from "./components/MainPage/Main";
import Login from "./components/LoginPage/Login";
import Signup from "./components/SignupPage/Signup";
import { Detail } from "./components";

import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/* <NavHeader></NavHeader> */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/insert" element={<Insert />} />
          <Route
            path="/detail/:id"
            element={<Detail queryClient={queryClient} />}
          />
          <Route path="/list" element={<List />} />z
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
