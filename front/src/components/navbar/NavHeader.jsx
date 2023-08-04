import React from 'react'
import {Bodyy,NavbarTitle,Hamburger,NavbarTitleName,MenuListTitle,Menu,MenuList,NavbarIcon} from './navbarStyled';
import { useState } from 'react';
import { Link } from "react-router-dom"

const NavHeader = () => {
  const [isactive,setIsactive] = useState(false);

  function MenuOpen (){
    setIsactive(!isactive);
  }
  return (
    isactive ?
    <>
    <NavbarTitle>
    <Hamburger onClick ={MenuOpen}>
        <span></span>
        <span></span>
        <span></span>
    </Hamburger>
    <NavbarTitleName>NoBroker</NavbarTitleName>

    <NavbarIcon>
      <div></div>
    </NavbarIcon>
  </NavbarTitle>

    <Bodyy>
    <Menu>
      <MenuListTitle>
        <div>NoBroker<span onClick={MenuOpen}></span></div>
        
      </MenuListTitle>
      <MenuList><Link to ='/insert'>매물 등록</Link></MenuList>

    </Menu>
    </Bodyy>
    </>
  :
  <NavbarTitle>
    <Hamburger onClick ={MenuOpen}>
        <span></span>
        <span></span>
        <span></span>
    </Hamburger>
    <NavbarTitleName>NoBroker</NavbarTitleName>

    <NavbarIcon>
      <div></div>
    </NavbarIcon>
  </NavbarTitle>

  )
}

export default NavHeader