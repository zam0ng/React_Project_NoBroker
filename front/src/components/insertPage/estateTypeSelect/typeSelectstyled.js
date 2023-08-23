import { styled } from "styled-components";

export const Container = styled.div`
  width: 85%;
  height: 120px;
  /* border: 1px solid black; */
  border-bottom: 1px solid rgb(219 195 158);

  display: flex;
  & span {
    color: #168fff;
  }
`;
export const Title = styled.div`
  width: 140px;
  height: 120px;
  /* border: 1px solid black; */
  text-align: left;
  /* line-height: 100px; */
  display: flex;
  align-items: center;
  font-size: smaller;
  font-weight: 600;
  padding-left: 10px;
  font-size: 17px;
  background-color: rgb(255, 229, 197);
`;
export const SelectContainer = styled.div`
  width: 90%;
  height: 120px;
  /* border: 1px solid black; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  & img {
    width: 80px;
    height: 80px;
  }
`;

export const Select = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between
`;
export const Radio = styled.div``;
