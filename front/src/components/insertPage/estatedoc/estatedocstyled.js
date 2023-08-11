import { styled } from "styled-components";

export const Container = styled.div`
    width: 85%;
    height: 80px;
    /* border: 1px solid black; */
    border-bottom: 1px solid #eeeeee;

    display: flex;
    & span{
        color : #0055FF;
    }
` 
export const Title = styled.div`
    width: 10%;
    height: 80px;
    /* border: 1px solid black; */
    text-align: left;
    line-height: 80px;
    font-size: smaller;
    font-weight: 600;
    background-color: #fafafa;

`

export const DocBox = styled.div`
    width: 90%;
    height: 80px;
    /* border: 1px solid black; */
    display: flex;
    align-items: center;
   
    & input{
        width: 50%;
        height: 30px;
        /* border: none; */
        padding-left: 10px;
        margin-left: 10px;
    }
    
`