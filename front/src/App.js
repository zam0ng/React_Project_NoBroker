import "./App.css";
import NavHeader from "./components/navbar/NavHeader";
import { Routes, Route, Navigate } from "react-router-dom";

// import NavHeader from "./components/navbar/NavHeader";
import { Detail } from "./components";
import Insert from "./components/insertPage/Insert";
import Main from "./components/MainPage/Main";
import Login from "./components/LoginPage/Login";
import Signup from "./components/SignupPage/Signup";
import Mypage from "./components/myPage/Mypage";
import Vote from "./components/votePage/Vote";
import Admin from "components/Admin";

import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import PAC_Map from "components/PAC_Map";

// import 'rc-slider/dist/rc-slider.css';

import { useAuth } from "./AuthContext";

const queryClient = new QueryClient();

function App() {
  const { isLoggedIn, isCertificate } = useAuth();

  return (

    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/* <NavHeader></NavHeader> */}
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/login" element={isLoggedIn ? <Main /> : <Login />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/insert"
            element={
              isLoggedIn ? <Insert queryClient={queryClient} /> : <Login />
            }
          />
          <Route
            path="/detail/:id"
            element={<Detail queryClient={queryClient} />}
          />
          <Route path="/list" element={<PAC_Map queryClient={queryClient}/>}></Route>
          {/* <Route path="/vote" element={<Vote />} /> */}
          {/* <Route path="/vote/:id" element={<Detail queryClient={queryClient} vote={true} />} />
          /> */}
          <Route
            path="/mypage"
            element={isLoggedIn ? <Mypage queryClient={queryClient} /> : <Login />}
          />
          <Route path="/admin" element={<Admin />} />

          {/* 업자 회원만 접근 가능 */}
          <Route
            path="/vote"
            element={isLoggedIn && isCertificate ? <Vote /> : <Login />}
          />
          <Route
            path="/vote/:id"
            element={
              isLoggedIn && isCertificate ? (
                <Detail
                  queryClient={queryClient}
                  vote={true}
                  path="/vote/:id"
                />
              ) : (
                <Login />
              )
            }
          />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
