import styled from "styled-components";
import { LoginBack } from "../../img";

export const LoginBox = styled.div`
  /* border: 1px solid; */
  width: 60%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  .loginTitle {
    font-size: 30px;
    font-weight: 600;
    font-family: "SBAggroB";
  }

  .LoginBtns {
    width: 380px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

export const Box = styled.div`
  width: 100%;
  height: 90vh;
  /* border: 1px solid; */
  /* position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${LoginBack});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  opacity: 0.7;
`;
