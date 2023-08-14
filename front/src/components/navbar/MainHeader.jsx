import React from "react";
import {
  Bodyy,
  NavbarTitle,
  Hamburger,
  NavbarTitleName,
  MenuListTitle,
  Menu,
  MenuList,
  NavbarIcon,
} from "./MainNavbarStyled";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../img";
const MainHeader = () => {
  const [isactive, setIsactive] = useState(false);
  const nav = useNavigate();
  function MenuOpen() {
    setIsactive(!isactive);
  }

  const userClick = () => {
    console.log("크ㄹ릭");
    nav("/login");
  };
  return isactive ? (
    <>
      <NavbarTitle>
        <Hamburger onClick={MenuOpen}>
          <span></span>
          <span></span>
          <span></span>
        </Hamburger>

        <NavbarTitleName>
          <img src={Logo} alt="" />
          <p>NOBROKER</p>
        </NavbarTitleName>

        <NavbarIcon>
          <div></div>
        </NavbarIcon>
      </NavbarTitle>

      <Bodyy>
        <Menu>
          <MenuListTitle>
            <div>
              NoBroker<span onClick={MenuOpen}></span>
            </div>
          </MenuListTitle>
          <MenuList>
            <Link to="/insert">매물 등록</Link>
          </MenuList>
        </Menu>
      </Bodyy>
    </>
  ) : (
    // -------------- 이걸 수정해야함 -------------------
    <NavbarTitle>
      <Hamburger onClick={MenuOpen}>
        <span></span>
        <span></span>
        <span></span>
      </Hamburger>
      <NavbarTitleName>
        <img src={Logo} alt="" />
        <p>NOBROKER</p>
      </NavbarTitleName>

      <NavbarIcon onClick={userClick}>
        <div></div>
      </NavbarIcon>
    </NavbarTitle>
  );
};

export default MainHeader;
