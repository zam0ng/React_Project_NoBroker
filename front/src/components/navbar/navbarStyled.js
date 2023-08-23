import styled from "styled-components";
import { userimg } from "../../img";
export const NavbarTitle = styled.div`
  /* position: absolute; */
  /* top: 10px; */
  margin-top: 10px;
  width: 100%;
  height: 100px;
  background-color: #fcfbf1;
  color: black;
  /* border: 1px solid black; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 40px;
  
`;
export const NavbarTitleName = styled.div`
  font-family: "SBAggroB";

  height: 80px;
  /* width: 85%; */
  /* border: 1px solid black; */
  line-height: 80px;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & img {
    width: 90px;
  }
  & p {
    margin-left: 20px;
    /* font-size: 80px; */
    font-size: 60px;
    font-weight: 300;
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
`;

export const NavLoginBtn = styled.div`
  font-family: "yg-jalnan";
  width: 100px;
  border: 4px solid orange;
  border-radius: 2em;
  background-size: cover;
  background-repeat: no-repeat;
  font-size: 20px;
  color: gray;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export const Hamburger = styled.div`
  margin-left: 20px;
  box-sizing: border-box;
  /* position: relative; */
  width: 50px;
  height: 45px;
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
    background-color: gray;
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
  width: 16%;
  height: 100%;
  background-color: white;
  transition: 3s;

  .Copyright {
    font-size: smaller;
    color: gray;
    line-height: 1.5;
  }
`;

export const MenuListTitle = styled.div`
  font-family: "SBAggroB";
  width: 100%;
  height: 15%;
  line-height: 50px;
  font-size: 30px;
  font-weight: 600;
  color: orange;
  display: flex;
  align-items: center;
  justify-content: center;
  & span {
    width: 60px;
    height: 60px;
    cursor: pointer;
  }
  & span:before,
  & span::after {
    position: absolute;
    top: 10px;
    right: 20px;
    content: "";
    height: 30px;
    width: 5px;
    border-radius: 2em;
    background-color: black;
    transform: rotate(45deg);
  }
  & span::after {
    transform: rotate(-45deg);
  }
`;
export const MenuList = styled.div`
  width: 100%;
  line-height: 60px;
  /* border: 1px solid white; */
  margin-top: 10px;
  height: 75%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  & a {
    margin-top: 20px;
    font-size: 25px;
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;
export const Bodyy = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.705);
  z-index: 10;
`;
