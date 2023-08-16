import React from "react";
import NavHeader from "../navbar/NavHeader";
import {
  SignupMainTitle,
  UserInfoBox,
  UserInput,
  UserLabel,
  SignupSubTitle,
} from "./SignupStyled";

const Signup = () => {
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
    <>
      <NavHeader />
      <SignupMainTitle>회원가입</SignupMainTitle>
      <div>
        <SignupSubTitle>유저정보</SignupSubTitle>
        <UserInfoBox>
          <div>
            <div>
              <UserLabel>유저 ID</UserLabel>
              <UserInput></UserInput>
            </div>
            <div>
              <UserLabel>유저 PW</UserLabel>
              <UserInput></UserInput>
            </div>
            <div>
              <UserLabel>PW 확인</UserLabel>
              <UserInput></UserInput>
            </div>
          </div>
          <div>
            <div>
              <UserLabel>이름</UserLabel>
              <UserInput></UserInput>
            </div>
            <div>
              <UserLabel>주민번호</UserLabel>
              <UserInput></UserInput>
            </div>
            <div>
              <UserLabel>전화번호</UserLabel>
              <UserInput></UserInput>
            </div>
            <div>
              <UserLabel>주소</UserLabel>
              {/*  */}
            </div>
            <div>
              <UserLabel>인감사진</UserLabel>
              <UserInput type="file"></UserInput>
            </div>
          </div>
        </UserInfoBox>
      </div>
    </>
  );
};

export default Signup;
