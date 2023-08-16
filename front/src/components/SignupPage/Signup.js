import React, { useEffect, useState } from "react";
import NavHeader from "../navbar/NavHeader";
import AddressInsert from "./AddressInsert";
import {
  SignupMainTitle,
  UserInfoBox,
  UserInput,
  UserLabel,
  SignupSubTitle,
  BusiSelectBox,
  BusiSelectBoxs,
  BusinessBox,
  SignupBox,
  SsnInput,
  NumInput,
  UserAdd,
} from "./SignupStyled";

const Signup = () => {
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const [userName, setUserName] = useState("");
  const [userSsn, setUserSsn] = useState("");
  const [userNum, setUserNum] = useState("");
  const [userAdr, setUserAdr] = useState("");
  // false - 일반유저, true - 사업자유저
  const [userRole, setUserRole] = useState(false);

  useEffect(() => {
    console.log("비번", userPW);
  }, [userID, userPW, userName, userSsn, userNum, userAdr, userRole]);

  // ❗️❗️❗️❗️ 정규식 추가해 ❗️❗️❗️❗️
  const UserIdChange = (e) => {
    console.log("현재 입력된 아이디 값", e.target.value);
  };

  const UserPWChange = (e) => {
    const pw1 = document.getElementById("pass1").value;
    const pw2 = document.getElementById("pass2").value;

    console.log("pw1", pw1);
    console.log("pw2", pw2);
    // ❗️❗️❗️❗️ 선 조건은 정규식에 부합해야 한다. ❗️❗️❗️❗️

    if (pw1 == pw2) {
      setUserPW(pw1);
    }
  };

  const SsnChange = () => {
    const ssn1 = document.getElementById("ssn1").value;
    const ssn2 = document.getElementById("ssn2").value;

    console.log(ssn1, ssn2);

    if(ssn1.length == 6 && ssn2.length == 7){
      console.log("자릿수 맞아요")
    }
    // ❗️❗️❗️❗️ 주민번호 자릿수 맞지 않는데 등록이면 회원가입 버튼 누를때 걸러주자 ❗️❗️❗️❗️
  };

  // ------- 사업자 회원 선택 함수 ----------------------
  const BisClick = (e) => {
    const selec = e.target.id;
    const box1 = document.querySelector(".nobisbox");
    const box2 = document.querySelector(".imbisbox");
    if (selec == "nobis") {
      box1.classList.add("pop");
      box2.classList.remove("pop");
    } else if (selec == "imbis") {
      box1.classList.remove("pop");
      box2.classList.add("pop");
    }
  };

  // 공인중개사 신청여부 - 탭으로 보여줄 컴포넌트 구분하기

  // 유저 정보
  // 유저 기본정보 입력
  // user_id : 아이디 (정규식)
  // password : 패스워드 (정규식)
  //        패스워드 확인 (입력된 패스워드와 확인)

  // user_name : 유저 이름
  // ssn : 유저 주민번호
  // phone : 유저 전화번호
  // address : 유저 주소
  // seal_img : 유저 인감 사진
  // ----------------------------------------------
  // 공인중개사 정보 - 여기서 탭으로 구분
  // role : 공인중개사 신청여부 (true / false)
  // ❗️❗️ 안내멘트 (최상단 또는 팝업) 가입 시 잘못 입력한 정보에 따라 계약에 문제가 발생하는 경우 당사는 책임을 지지 않으니 신중히 입력 바랍니다. ❗️❗️

  return (
    <SignupBox>
      <NavHeader />
      <SignupMainTitle>회원가입</SignupMainTitle>

      <SignupSubTitle>유저정보</SignupSubTitle>
      <UserInfoBox>
        <div className="infobox">
          <div>계정정보</div>
          <div className="userbox">
            <UserLabel>유저 ID</UserLabel>
            <UserInput onChange={UserIdChange}></UserInput>
          </div>
          <div className="userbox">
            <UserLabel>유저 PW</UserLabel>
            <UserInput
              id="pass1"
              type="password"
              onChange={UserPWChange}
            ></UserInput>
          </div>
          <div className="userbox">
            <UserLabel>PW 확인</UserLabel>
            <UserInput
              id="pass2"
              type="password"
              onChange={UserPWChange}
            ></UserInput>
          </div>
        </div>
        <div className="infobox">
          <div>유저정보</div>
          <div className="userbox">
            <UserLabel>이름</UserLabel>
            <UserInput
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            ></UserInput>
          </div>
          <div className="userbox">
            <UserLabel>주민번호</UserLabel>
            <div>
              <SsnInput id="ssn1" onChange={SsnChange} /> -{" "}
              <SsnInput id="ssn2" onChange={SsnChange} type="password" />
            </div>
          </div>
          <div className="userbox">
            <UserLabel>전화번호</UserLabel>
            <div>
              <NumInput /> - <NumInput /> - <NumInput />
            </div>
          </div>
          <div className="adrbox">
            <UserLabel>주소</UserLabel>
            <AddressInsert></AddressInsert>
          </div>
          <div className="userbox">
            <UserLabel>인감사진</UserLabel>
            <UserInput type="file"></UserInput>
          </div>
        </div>
      </UserInfoBox>
      <SignupSubTitle>공인중개사 회원</SignupSubTitle>
      <UserInfoBox>
        <BusiSelectBoxs>
          <BusiSelectBox id="nobis" onClick={BisClick}>
            <div>나는 일반회원 할래요</div>
          </BusiSelectBox>
          <BusiSelectBox id="imbis" onClick={BisClick}>
            <div>나는 업자다하하하하</div>
          </BusiSelectBox>
        </BusiSelectBoxs>
        {/* 선택한 것에 따라 이 안에서 보여지는 내용이 달라질 예정 */}
        <BusinessBox>
          <div className="nobisbox">나는 일반회원</div>
          <div className="imbisbox">
            나는 사업자회원
            <div>
              자격증 사진 첨부
              <input type="file"></input>
            </div>
          </div>
        </BusinessBox>
      </UserInfoBox>
      <UserAdd>회원가입</UserAdd>
    </SignupBox>
  );
};

export default Signup;
