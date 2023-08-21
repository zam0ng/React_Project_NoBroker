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
} from "./navbarStyled";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo, Logo2 } from "../../img";
import { useAuth } from "../../AuthContext";

const NavHeader = () => {
  const nav = useNavigate();
  const [isactive, setIsactive] = useState(false);
  const { isLoggedIn, logout } = useAuth();

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
            <Link to="/insert">매물 등록</Link>
          </MenuList>
          <MenuList>
            <Link to="/list">매물 목록</Link>
          </MenuList>
          <MenuList></MenuList>
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
          <div id="Logout" onClick={LogoutClick}>
            Logout
          </div>
        ) : (
          <div id="Login" onClick={LoginClick}>
            Login
          </div>
        )}
      </NavbarIcon>
    </NavbarTitle>
  );
};

export default NavHeader;
