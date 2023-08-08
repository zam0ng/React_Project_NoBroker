import { styled } from "styled-components";

export const FooterCotainer = styled.div`
    width: 100%;
    height: 350px;
    background-color:rgb(55, 55, 55);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`
export const FooterList = styled.div`
    width: 85%;
    height: 70px;
    color: rgb(170, 170, 170);
    font-size: small;
    border-bottom: 0.1px solid rgb(170, 170, 170);
    display: flex;
    align-items: center;

`
export const FooterInfo = styled.div`
    width: 85%;
    height: 140px;
    color: rgb(170, 170, 170);
    font-size: small;
    /* border: 1px solid white; */

    & p{
        text-align: left;
        line-height: 18px;
    }
`
export const QuestionBox = styled.div`
    width: 85%;
    height: 30px;
    /* border: 1px solid white; */
    display: flex;

`
export const QuestionBtn = styled.button`
    width: ${(props)=>props.width ||"50px"};
    border: none;
    height: 30px;
    margin-right: 10px;
    font-size: small;
    color : rgb(229, 229, 229);
    background-color: ${(props)=>props.bg || "rgb(81, 81, 81)" };

`
export const SinceAtagBox= styled.div`
    width: 85%;
    height: 50px;
    /* border: 1px solid white; */
    display: flex;
    justify-content: space-between;
    align-items: center;

    & p{
        color: rgb(170, 170, 170);
        font-size: small;
    }
    
`
export const IconDiv =styled.div`
    width: 240px;
    display: flex;
    justify-content: space-around;

`
export const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    /* border: 1px solid white; */
    background-size: contain;
    background-image: url(${(props)=>props.bgimg});
`