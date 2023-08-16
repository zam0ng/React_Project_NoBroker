import React from "react";
import NavHeader from "../navbar/NavHeader";
import { LoginBox } from "./LoginBoxStyled";
import { LoginBtn } from "./LoginBtnStyled";
import { LoginInput } from "./LoginInputStyled";
import { useNavigate } from "react-router-dom";
import axios from "../../Axios";

const Login = () => {
  const nav = useNavigate();
  const Signup = () => {
    console.log("회원가입 페이지 긔긔");
    nav("/signup");
  };

  const LoginClick = () => {
    const ID = document.getElementById("userID").value;
    const PW = document.getElementById("userPW").value;
    console.log("아이디 - ", ID, "   패스워드 - ", PW);
    axios
      .post(
        "/login",
        { ID, PW },
        { withCredentials: true }
      )
      .then((e) => {
        console.log("로그인 성공 목록으로", e.data.message);
        if (e.data.message == "로그인 완료") {
          nav("/list");
        } else if (e.data.message == "비밀번호 오류") {
          alert("패스워드를 확인해주세요!");
        } else {
          alert("가입된 계정이 아닙니다!");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("회원정보를 확인해주세요");
      });
  };

  return (
    <>
      <NavHeader />
      <div>Login</div>
      <LoginBox>
        <LoginInput id="userID" placeholder="아이디를 입력하세요."></LoginInput>
        <LoginInput
          id="userPW"
          placeholder="비밀번호를 입력하세요."
        ></LoginInput>
        <div className="LoginBtns">
          <LoginBtn onClick={Signup}>회원가입</LoginBtn>
          <LoginBtn onClick={LoginClick}>로그인</LoginBtn>
        </div>
      </LoginBox>
    </>
  );
};

export default Login;
