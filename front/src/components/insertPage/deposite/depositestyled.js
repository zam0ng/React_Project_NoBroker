import { styled } from "styled-components";

export const Container = styled.div`
  width: 85%;
  height: 100px;
  /* border: 1px solid black; */
  border-bottom: 1px solid rgb(219 195 158);

  display: flex;
  align-items: center;

  & span {
    color: #168fff;
  }
`;
export const Title = styled.div`
  width: 140px;
  height: 100px;
  /* border: 1px solid black; */
  text-align: left;
  /* line-height: 80px; */
  /* font-size: smaller; */
  font-weight: 600;
  display: flex;
  align-items: center;
  font-weight: 600;
  padding-left: 10px;
  font-size: 17px;
  background-color: rgb(255, 229, 197);
`;
export const DepositBox = styled.div`
  width: 90%;
  height: 80px;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
`;
export const DivBox = styled.div`
  width: 210px;
  height: 80px;
  /* border: 1px solid blue; */
`;
export const Name = styled.div`
  width: 100px;
  height: 20px;
  /* border: 1px solid black; */
  font-size: smaller;
  font-weight: 600;
`;
export const Balance = styled.div`
  width: 200px;
  height: 50px;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: 10px;

  & input {
    width: 100px;
    height: 30px;
  }
`;
export const Hover = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  border-radius: 50%;
  margin-left: 10px;
  margin-top: 10px;
`;
export const SpeechBubble = styled.div`
  position: absolute;
  top: -40px;
  left: 20px;
  width: 170px;
  height: 65px;
  border: 1px solid black;
  border-radius: 0;
  margin-top: 10px;
  margin-left: 10px;
  display: none;
  background-color: black;
  color: white;
  font-size: small;
  border-radius: 10px;
  padding-top: 5px;
  ${Hover}:hover & {
    display: block;
  }
`;
