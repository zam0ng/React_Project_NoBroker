import React, { useEffect, useState } from "react";
import NavHeader from "../navbar/NavHeader";
import AddressInsert from "./AddressInsert";
import { useMutation, useQuery } from "react-query";
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
import axios from "../../Axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const nav = useNavigate();

  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const [userName, setUserName] = useState("");
  const [userSsn, setUserSsn] = useState("");
  const [userNum, setUserNum] = useState("");
  const [userAdr, setUserAdr] = useState("");
  // false - 일반유저, true - 사업자유저
  const [userRole, setUserRole] = useState(false);
  const [userSeal, setUserSeal] = useState("");
  const [userLicense, setUserLicense] = useState("");
  const [Check, setCheck] = useState(false);

  useEffect(() => {
    console.log("🙆‍♂️아이디", userID);
    console.log("🙆‍♂️패스워드", userPW);
    console.log("🙆‍♂️유저이름", userName);
    console.log("🙆‍♂️주민번호", userSsn);
    console.log("🙆‍♂️전화번호", userNum);
    console.log("🙆‍♂️주소", userAdr);
    console.log("🙆‍♂️인감", userSeal);
    console.log("🙆‍♂️사업자여부", userRole);
    console.log("🙆‍♂️사업자등록증", userLicense);
    console.log("🙆‍♂️체크여부", Check);
  }, [
    userID,
    userPW,
    userName,
    userSsn,
    userNum,
    userAdr,
    userRole,
    userSeal,
    userLicense,
    Check,
  ]);

  const signupMutation = useMutation(async () => {
    // // 반환받은 값이 성공이면 로그인 페이지로 이동
    // // const data = new FormData();
    // // data.append("user_id", userID);
    // // data.append("password", userPW);
    // // data.append("user_name", userName);
    // // data.append("ssn", userSsn);
    // // data.append("phone", userNum);
    // // data.append("address", userAdr);
    // // data.append("role", userRole);
    // // data.append("seal_img", userSeal);
    // // data.append("certificate_img", userLicense);

    // console.log("@@@@@@@@@@@@@@", userSeal);
    // console.log("@@@@@@@@@@@@@@", userSeal);

    // const res = await axios.post(
    //   "/signup/useradd",
    //   {
    //     user_id: userID,
    //     password: userPW,
    //     user_name: userName,
    //     ssn: userSsn,
    //     phone: userNum,
    //     address: userAdr,
    //     role: userRole,
    //     seal_img: userSeal,
    //     certificate_img: userLicense,
    //   },
    //   {
    //     "Content-Type": "multipart/form-data",
    //     withCredentials: true,
    //   }
    // );

    const formData = new FormData();
    formData.append("user_id", userID);
    formData.append("password", userPW);
    formData.append("user_name", userName);
    formData.append("ssn", userSsn);
    formData.append("phone", userNum);
    formData.append("address", userAdr);
    formData.append("role", userRole);
    formData.append("seal_img", userSeal);
    formData.append("certificate_img", userLicense);

    const res = await axios.post("/signup/useradd", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    console.log("서버에서 받아온 값", res);
    setUserID("");
    setUserPW("");
    setUserName("");
    setUserSsn("");
    setUserNum("");
    setUserAdr("");
    setUserRole(false);
    setUserSeal("");
    setUserLicense("");
    setCheck(false);

    nav("/login");
  });

  //getUser: 해당 쿼리를 식별할 수 있는 키
  const { data: userlist, err1 } = useQuery("getUser", async () => {
    const data = await axios.get("/signup");
    return data.data.user;
  });
  if (err1) {
    return (
      <div>사이트를 불러오는 중 오류가 발생했습니다.(err: get.userlist)</div>
    );
  }

  //----- 정규식 ---------------------------------------
  const isID = (value) => {
    // console.log("아이디");
    // 3자 이상 16자 이하, 영어 또는 숫자로 구성
    const idregx = /^(?=.*[a-z0-9])[a-z0-9]{3,16}$/;
    return idregx.test(value);
  };
  const isPW = (value) => {
    // console.log("pw");
    //6자 이상 16자 이하, 영어와 숫자, 특수문자의 조합으로 구성
    const pwregx = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/;
    return pwregx.test(value);
  };
  const isSSN = (value) => {
    //6자 이상 16자 이하, 영어와 숫자, 특수문자의 조합으로 구성
    const ssnregx =
      /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/;
    return ssnregx.test(value);
  };
  const isNum = (value) => {
    // console.log("아이디");
    const numregx = /^(01[016789])-(\d{3,4})-(\d{4})$/;
    return numregx.test(value);
  };

  const UserIdChange = (e) => {
    let text = document.getElementById("IDtext");
    if (isID(e.target.value) == true) {
      text.innerHTML = "사용 가능한 아이디 입니다.";
      text.style.color = "blue";
      // 🙋🙋🙋 중복확인 하세요 🙋🙋🙋
      const sameID = userlist.filter((el) => {
        return el.user_id == e.target.value;
      });
      if (sameID.length != 0) {
        text.innerHTML = "중복된 아이디 입니다.";
        text.style.color = "red";
        setUserID("");
      } else {
        text.innerHTML = "사용 가능한 아이디 입니다.";
        text.style.color = "blue";
        setUserID(e.target.value);
      }
    } else {
      text.innerHTML = "사용 불가한 아이디 입니다.";
      text.style.color = "red";
      setUserID("");
    }
  };

  const UserPWChange = (e) => {
    const pw1 = document.getElementById("pass1").value;
    const pw2 = document.getElementById("pass2").value;
    let pwtext1 = document.getElementById("PWtext1");
    let pwtext2 = document.getElementById("PWtext2");

    // ❗️❗️❗️❗️ 선 조건은 정규식에 부합해야 한다. ❗️❗️❗️❗️
    if (e.target.id == "pass1") {
      if (isPW(pw1) == true) {
        pwtext1.innerHTML = "사용 가능한 패스워드 입니다.";
        pwtext1.style.color = "blue";
      } else {
        pwtext1.innerHTML = "사용 불가한 패스워드 입니다.";
        pwtext1.style.color = "red";
      }
    } else if (e.target.id == "pass2") {
      if (pw1 == pw2) {
        pwtext2.innerHTML = "패스워드가 일치합니다.";
        pwtext2.style.color = "blue";
        setUserPW(pw1);
      } else {
        pwtext2.innerHTML = "패스워드가 일치하지 않습니다.";
        pwtext2.style.color = "red";
        setUserPW("");
      }
    }
  };

  const SsnChange = () => {
    const ssn1 = document.getElementById("ssn1").value;
    const ssn2 = document.getElementById("ssn2").value;

    // console.log(ssn1, ssn2);

    if (ssn1.length == 6 && ssn2.length == 7) {
      // console.log("자릿수 맞아요");
      let ssnstr = `${ssn1}-${ssn2}`;
      if (isSSN(ssnstr)) {
        setUserSsn(ssnstr);
      } else {
        setUserSsn("");
      }
    } else if (ssn1.length >= 7) {
      alert("6자리까지 입력 가능합니다.");
      setUserSsn("");
    } else if (ssn2.length >= 8) {
      alert("7자리까지 입력 가능합니다.");
      setUserSsn("");
    } else {
      setUserSsn("");
    }
    // ❗️❗️❗️❗️ 주민번호 자릿수 맞지 않는데 등록이면 회원가입 버튼 누를때 걸러주자 ❗️❗️❗️❗️
  };

  const NumChange = () => {
    const num1 = document.getElementById("num1").value;
    const num2 = document.getElementById("num2").value;
    const num3 = document.getElementById("num3").value;
    let usernum = `${num1}-${num2}-${num3}`;
    if (isNum(usernum) == true) {
      setUserNum(usernum);
    } else {
      setUserNum("");
    }
  };

  // ------- 사업자 회원 선택 함수 ----------------------
  const BisClick = (e) => {
    const selec = e.target.id;
    const box1 = document.querySelector(".nobisbox");
    const box2 = document.querySelector(".imbisbox");
    if (selec == "nobis") {
      box1.classList.add("pop");
      box2.classList.remove("pop");
      setUserRole(false);
    } else if (selec == "imbis") {
      box1.classList.remove("pop");
      box2.classList.add("pop");
      setUserRole(true);
    }
  };

  const SignupAdd = () => {
    //회원가입 시 아이디, 패스워드, 이름, 주민번호, 전화번호, 주소, 인감사진이 등록되어 있어야만 한다.
    if (
      userID != "" &&
      userPW != "" &&
      userName != "" &&
      userSsn != "" &&
      userNum != "" &&
      userAdr != "" &&
      userSeal != ""
    ) {
      // 사업자 회원이 아닐 경우, 체크 박스 여부 확인 후 가입
      if (userRole == false) {
        if (Check == true) {
          console.log("🙆‍♂️ 일반회원으로 가입하세요");
          signupMutation.mutate();
          // 여기에 axios.post 진행
        } else {
          alert("개인정보 제공에 동의해주세요!");
        }
      }
      // 사업자 회원일 경우, 공인중개사 서류 확인, 체크박스 확인 후 가입
      else {
        if (userLicense != "") {
          if (Check == true) {
            console.log("🙆‍♂️ 사업자회원으로 가입하세요");
            signupMutation.mutate();
            // 여기에 axios.post 진행
          } else {
            alert("개인정보 제공에 동의해주세요!");
          }
        } else {
          alert("자격증이 등록되지 않았습니다. 다시 한 번 확인 해주세요!");
        }
      }
    } else if (userID == "") {
      alert("아이디가 입력되지 않았습니다. 다시 한 번 확인 해주세요!");
    } else if (userPW == "") {
      alert("패스워드가 입력되지 않았습니다. 다시 한 번 확인 해주세요!");
    } else if (userName == "") {
      alert("이름이 입력되지 않았습니다. 다시 한 번 확인 해주세요!");
    } else if (userSsn == "") {
      alert("주민등록번호가 입력되지 않았습니다. 다시 한 번 확인 해주세요!");
    } else if (userNum == "") {
      alert("전화번호가 입력되지 않았습니다. 다시 한 번 확인 해주세요!");
    } else if (userAdr == "") {
      alert("주소가 입력되지 않았습니다. 다시 한 번 확인 해주세요!");
    } else if (userSeal == "") {
      alert("인감도장이 등록되지 않았습니다. 다시 한 번 확인 해주세요!");
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
      {/* 로그인 페이지로 넘어갈 수 있는 영역 만들기 */}
      <div>
        <div>이미 계정이 있으신가요?</div>
        <div>로그인하기</div>
      </div>
      <SignupSubTitle>유저정보</SignupSubTitle>
      <UserInfoBox>
        <div className="infobox">
          <div>계정정보</div>
          <div className="userbox">
            <UserLabel>유저 ID</UserLabel>
            <UserInput onChange={UserIdChange}></UserInput>
            <p id="IDtext"></p>
          </div>
          <div className="userbox">
            <UserLabel>유저 PW</UserLabel>
            <UserInput
              id="pass1"
              type="password"
              onChange={UserPWChange}
            ></UserInput>
            <p id="PWtext1"></p>
          </div>
          <div className="userbox">
            <UserLabel>PW 확인</UserLabel>
            <UserInput
              id="pass2"
              type="password"
              onChange={UserPWChange}
            ></UserInput>
            <p id="PWtext2"></p>
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
              <NumInput id="num1" onChange={NumChange} /> -{" "}
              <NumInput id="num2" onChange={NumChange} /> -{" "}
              <NumInput id="num3" onChange={NumChange} />
            </div>
          </div>
          <div className="adrbox">
            <UserLabel>주소</UserLabel>
            <AddressInsert adr={setUserAdr}></AddressInsert>
          </div>
          <div className="userbox">
            <UserLabel>인감사진</UserLabel>
            <UserInput
              type="file"
              onChange={(e) => {
                setUserSeal(e.target.files[0]);
              }}
            ></UserInput>
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
          <div className="nobisbox">
            <div>
              <span>일반 회원</span>으로 가입 시 매물을 등록하고 판매하실 수
              있습니다! NoBroker에서 즐거운 거래되세요!
            </div>
          </div>
          <div className="imbisbox">
            <div>
              <span>공인 중개사</span>회원으로 가입 시, 등록된 매물의 진위여부를
              투표하고 받을 수 있는 보상을 받을 수 있습니다!
            </div>
            <div>
              자격증 사진 첨부
              <input
                type="file"
                onChange={(e) => {
                  setUserLicense(e.target.files[0]);
                }}
              ></input>
            </div>
          </div>
        </BusinessBox>
      </UserInfoBox>
      <div>
        <input
          type="checkbox"
          id="check"
          onClick={(e) => setCheck(e.target.checked)}
        ></input>
        <span>개인 정보 제공 동의</span>
        <div>
          입력하신 정보를 다시 한 번 확인해주세요! 잘못된 정보를 기입하여 발생한
          문제는 당사에서 책임지지 않습니다.
        </div>
      </div>
      <UserAdd onClick={SignupAdd}>회원가입</UserAdd>
    </SignupBox>
  );
};

export default Signup;
