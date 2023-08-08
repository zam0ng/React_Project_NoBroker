import { styled } from "styled-components";

export const Container = styled.div`
    width: 85%;
    height: 100px;
    /* border: 1px solid black; */
    border-bottom: 1px solid #eeeeee;

    display: flex;
    & span{
        color : #0055FF;
    }
` 
export const Title = styled.div`
    width: 10%;
    height: 100px;
    /* border: 1px solid black; */
    text-align: left;
    line-height: 100px;
    font-size: smaller;
    font-weight: 600;
    background-color: #fafafa;

`
export const SelectContainer = styled.div`
    width : 90%;
    height: 100px;
    /* border: 1px solid black; */
    display: flex;
    justify-content: space-around;
    align-items: center;
    & img{
        width: 80px;
        height: 80px;
    }
`
export const Radio = styled.div`
    
`