import { styled } from "styled-components";

export const Container = styled.div`
    width: 85%;
    height: 80px;
    border: 1px solid black;
    display: flex;
    & span{
        color : #0055FF;
    }
` 
export const Title = styled.div`
    width: 10%;
    height: 80px;
    border: 1px solid black;
    text-align: left;
    line-height: 80px;
    font-size: smaller;
    font-weight: 600;
    background-color: #fafafa;

`
export const MulterBox = styled.div`
    width: 90%;
    height: 80px;
    /* border: 1px solid red; */
    display: flex;
    align-items: center;

   
    
`