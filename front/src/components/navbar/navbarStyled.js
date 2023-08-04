import styled from 'styled-components';
import {userimg} from '../../img'
export const NavbarTitle = styled.div`
    width: 100%;
    height: 80px;
    background-color: white;
    color : black;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    
`
export const NavbarTitleName = styled.div`
    height: 80px;
    width: 85%; 
    /* border: 1px solid black; */
    line-height: 80px;

`
export const NavbarIcon =styled.div`
    width: 110px;
    height: 80px;
    /* border: 1px solid black; */
    display: flex;
    align-items: center;
    justify-content: center;


    & div{
        width: 50px;
        height: 50px;
        background-image: url(${userimg});
        background-size: cover;
        background-repeat: no-repeat;
    }
`

export const Hamburger = styled.div`
    
    margin-left: 20px;
    box-sizing: border-box;
    position: relative;
    width: 35px;
    height: 33px;
    cursor: pointer;

    & span{
        display: inline-block;
        box-sizing: border-box;
        position: absolute;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: black;
        border-radius: 4px;
    }

    & span:nth-of-type(1){
        top: 0;
    }
    & span:nth-of-type(2){
        top: 15px;
    }
    & span:nth-of-type(3){
       bottom: 0;
    } 
`

export const Menu = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    background-color: white;
    transition: 3s;
`

export const MenuListTitle = styled.div`

    & div{
        width: 200px;
        height: 50px;
        border: 1px solid gray;
        line-height: 50px;
        font-weight: 600;
    }
    & span{
        width: 50px;
        height: 50px;
        cursor: pointer;
    }
    & span:before,
    & span::after{
        position: absolute;
        top: 15px;
        left: 180px;
        content: "";
        height: 25px;
        width: 2px;
        background-color: black;
        transform: rotate(45deg);
    }
    & span::after{
        transform: rotate(-45deg);

    }
`
export const MenuList = styled.div`
    width: 200px;
    height: 40px;
    line-height: 40px;
    
    border-top: none;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    border-left: 1px solid gray;


`
export const Bodyy = styled.div`
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.705);
;
`
