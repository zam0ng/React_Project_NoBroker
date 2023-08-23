import { styled } from "styled-components";

export const Container = styled.div`
  width: 85%;
  height: 80px;
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
  height: 80px;
  /* border: 1px solid black; */
  text-align: left;
  line-height: 80px;
  /* font-size: smaller; */
  font-weight: 600;
  display: flex;
  align-items: center;
  font-weight: 600;
  padding-left: 10px;
  font-size: 17px;
  background-color: rgb(255, 229, 197);
`;
export const BuiltBox = styled.div`
  width: 90%;
  height: 80px;
  /* border: 1px solid black; */
  display: flex;
  align-items: center;

  & input {
    width: 10%;
    height: 30px;
    /* border: none; */
    padding-left: 10px;
    margin-left: 10px;
  }
`;
