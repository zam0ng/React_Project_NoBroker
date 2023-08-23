import React from "react";
import {
  Bodyy,
  NavbarTitle,
  Hamburger,
  NavbarTitleName,
  MenuListTitle,
  Menu,
  MenuList,
  NavbarIcon,NavLoginBtn
} from "./navbarStyled";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo, Logo2 } from "../../img";
import { useAuth } from "../../AuthContext";
import { useEffect } from "react";

const NavHeader = () => {
  const nav = useNavigate();
  const [isactive, setIsactive] = useState(false);
  const { isLoggedIn, isCertificate, isAdmin, logout } = useAuth();

  const LogoutClick = () => {
    logout();
  };

  const LoginClick = () => {
    nav("/login");
  };

  const LogoClick = () => {
    nav("/");
  };

  function MenuOpen() {
    setIsactive(!isactive);
  }

  useEffect(() => {
    if (isactive) {
      document.body.style.overflowY = "hidden";
      window.scrollTo(0,0);
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [isactive])

  return isactive ? (
    <>
      <NavbarTitle>
        <Hamburger onClick={MenuOpen}>
          <span></span>
          <span></span>
          <span></span>
        </Hamburger>
        <NavbarTitleName>
          <img src={Logo2} alt="logo" />
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
            <Link to="/list">매물목록</Link>
            {isLoggedIn ? <Link to="/insert">매물등록</Link>:<></>}
            {isLoggedIn ? <Link to="/mypage">마이페이지</Link>:<></>}
            {isCertificate ? <Link to="/vote">투표목록</Link>:<></>}
            {isAdmin ?<Link to="/admin">관리자페이지</Link>:<></>}
          </MenuList>
          <p className="Copyright">Copyright 2023. NoBroker. <br/> All rights reserved.</p>
        </Menu>
      </Bodyy>
    </>
  ) : (
    <NavbarTitle>
      <Hamburger onClick={MenuOpen}>
        <span></span>
        <span></span>
        <span></span>
      </Hamburger>
      <NavbarTitleName onClick={LogoClick}>
        <img src={Logo2} alt="logo" />
        <p>NOBROKER</p>
      </NavbarTitleName>
      <NavbarIcon>
        {isLoggedIn ? (
          <NavLoginBtn id="Logout" onClick={LogoutClick}>
            Logout
          </NavLoginBtn>
        ) : (
          <NavLoginBtn id="Login" onClick={LoginClick}>
            Login
          </NavLoginBtn>
        )}
      </NavbarIcon>
    </NavbarTitle>
  );
};

export default NavHeader;
