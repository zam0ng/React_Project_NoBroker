import styled from "styled-components";
import { userIcon_white } from "../../img";
export const NavbarTitle = styled.div`
  position: absolute;
  top: 10px;
  width: 100%;
  height: 10%;
  /* background-color: white; */
  color: black;
  /* border: 1px solid wheat; */
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;
export const NavbarTitleName = styled.div`
  height: 80px;
  width: 85%;
  /* border: 1px solid black; */
  line-height: 80px;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  & img {
    width: 80px;
  }
  & p {
    margin-left: 20px;
    /* font-size: 80px; */
    font-size: 50px;
    font-weight: 600;
    color: orange;
  }
`;
export const NavbarIcon = styled.div`
  width: 110px;
  height: 80px;
  /* border: 1px solid black; */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & div {
    width: 50px;
    height: 50px;
    background-image: url(${userIcon_white});
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

export const Hamburger = styled.div`
  margin-left: 20px;
  box-sizing: border-box;
  /* position: relative; */
  width: 50px;
  height: 45px;
  /* border: 1px solid white; */
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  & span {
    display: inline-block;
    box-sizing: border-box;
    /* position: absolute; */
    left: 0;
    width: 100%;
    height: 8px;
    background-color: #ffffff99;
    border-radius: 4px;
  }

  /* & span:nth-of-type(1) {
    top: 0;
  }
  & span:nth-of-type(2) {
    top: 15px;
  }
  & span:nth-of-type(3) {
    bottom: 0;
  } */
`;

export const Menu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background-color: #282828;
  transition: 3s;
`;

export const MenuListTitle = styled.div`
  & div {
    width: 200px;
    height: 50px;
    border: 1px solid gray;
    line-height: 50px;
    font-weight: 600;
    color: orange;
  }
  & span {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  & span:before,
  & span::after {
    position: absolute;
    top: 15px;
    left: 180px;
    content: "";
    height: 25px;
    width: 2px;
    background-color: black;
    transform: rotate(45deg);
  }
  & span::after {
    transform: rotate(-45deg);
  }
`;
export const MenuList = styled.div`
  width: 200px;
  height: 40px;
  line-height: 40px;

  border-top: none;
  border-right: 1px solid gray;
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
`;
export const Bodyy = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.705);
`;
