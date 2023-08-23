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
import { Logo, Logo2 } from "../../img";
import { useAuth } from "AuthContext";
const MainHeader = () => {
  const [isactive, setIsactive] = useState(false);
  const { isLoggedIn, isCertificate, isAdmin } = useAuth();
  const nav = useNavigate();
  function MenuOpen() {
    if (!isactive) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
    setIsactive(!isactive);
  }

  const userClick = () => {
    // axios로 isLogin받아오자
    nav("/login");
  };

  const LogoClick = () => {
    nav("/");
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
          <img src={Logo2} alt="" />
          <p>NOBROKER</p>
        </NavbarTitleName>

        <NavbarIcon>
          <div></div>
        </NavbarIcon>
      </NavbarTitle>

      <Bodyy>
        <Menu className="menu">
          <MenuListTitle>
            <div className="navtitle">
              <div>NoBroker</div>
              <span onClick={MenuOpen}></span>
            </div>
          </MenuListTitle>
          <MenuList>
            <Link to="/list">매물목록</Link>
            {isLoggedIn ? <Link to="/insert">매물등록</Link>:<></>}
            {isLoggedIn ? <Link to="/mypage">마이페이지</Link>:<></>}
            {isCertificate ? <Link to="/vote">투표목록</Link>:<></>}
            {isAdmin ? <Link to="/admin">관리자페이지</Link>:<></>}
          </MenuList>
          <p className="Copyright">Copyright 2023. NoBroker. <br/> All rights reserved.</p>
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
      <NavbarTitleName onClick={LogoClick}>
        <img src={Logo2} alt="" />
        <p>NOBROKER</p>
      </NavbarTitleName>

      <NavbarIcon onClick={userClick}>
        <div></div>
      </NavbarIcon>
    </NavbarTitle>
  );
};

export default MainHeader;
