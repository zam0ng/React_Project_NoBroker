import { styled } from "styled-components";

export const BigBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SignupBox = styled.div`
  font-family: "GmarketSansMedium";

  width: 100%;
  /* border: 3px solid salmon; */
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  #inputBtn,
  #inputBtn2 {
    width: 80px;
    height: 30px;
    background-color: white;
    border: 3px solid orange;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2em;
  }
`;

// 회원가입 최상단 메인 타이틀
export const SignupMainTitle = styled.div`
  font-size: 50px;
  font-weight: bold;
  margin: 40px;
  color: gray;
`;

// 회원가입 서브 타이틀
export const SignupSubTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin: 20px;
`;

// 유저 기본 정보를 담을 박스영역
export const UserInfoBox = styled.div`
  width: 100%;
  /* border: 1px solid chocolate; */
  margin-bottom: 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  .infobox {
    width: 80%;
    margin: 50px;
    border: 5px solid #ffca69;
    border-radius: 40px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .subtitle {
      font-size: 25px;
      font-weight: 600;
      margin-top: -40px;
      width: 120px;
      background-color: #fcfbf1;
    }
  }

  .adrbox {
    width: 100%;
    height: 150px;
    margin: 10px;
    /* border-bottom: 1px solid; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    .adrInput1 {
      width: 150px;
      height: 30px;
      margin-right: 30px;
    }
    .adrInput2 {
      width: 250px;
      height: 30px;
    }

    .adrbox2 {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      input {
        margin: 10px;
      }
    }
  }

  .userbox {
    width: 100%;
    height: 50px;
    margin: 20px;
    /* border-bottom: 1px solid; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
`;

export const UserInfoBox2 = styled.div`
  width: 95%;
  margin-bottom: 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 5px solid #ffca69;
  border-radius: 40px;

  .subtitle {
    font-size: 25px;
      font-weight: 600;
      margin-top: -20px;
      width: 200px;
      background-color: #fcfbf1;
  }
`;

// 유저 인풋의 라벨을 적을 영역
export const UserLabel = styled.div`
  width: 200px;
  font-weight: bold;
  /* border: 1px solid; */
  display: flex;
  justify-content: center;
  font-size: 18px;
`;

// 유저 정보를 적을 인풋영역
export const UserInput = styled.input`
  width: 300px;
  height: 30px;
  background-color: #fcfbf1;
  border: none;
  border-bottom: 2px solid;
`;

// 유저 정보를 적을 인풋영역
export const SealInput = styled.input`
  width: 300px;
  height: 30px;
  background-color: #fcfbf1;
`;

// 주민번호를 적을 인풋영역
export const SsnInput = styled.input`
  width: 130px;
  height: 30px;
  background-color: #fcfbf1;
  border: none;
  border-bottom: 2px solid;
`;

// 전화번호를 적을 인풋영역
export const NumInput = styled.input`
  width: 80px;
  height: 30px;
  background-color: #fcfbf1;
  border: none;
  border-bottom: 2px solid;
`;

// 사업자정보 입력 영역을 기입할 박스
export const BusinessBox = styled.div`
  width: 70%;
  height: 100px;
  border: 1px solid;

  .nobisbox,
  .imbisbox {
    display: none;
  }
  .nobisbox.pop,
  .imbisbox.pop {
    display: block;
  }
`;

// 사업자정보 입력 여부를 결정할 선택영역 박스
export const BusiSelectBoxs = styled.div`
  width: 70%;
  height: 200px;
  border: 1px solid red;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 50px;
`;

// 사업자정보 입력 여부를 결정할 각 선택영역 (입력, 안입력)
export const BusiSelectBox = styled.div`
  width: 30%;
  height: 150px;
  border: 1px solid green;
  cursor: pointer;
`;

export const UserAdd = styled.button`
  width: 100px;
  height: 50px;
  background-color: orange;
`;
