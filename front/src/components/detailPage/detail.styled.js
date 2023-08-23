import styled from "styled-components"


export const Div = styled.div`
    height: fit-content;
`

export const LeftDiv = styled.div`
    width : ${(props) => props.width || "60%"};
    /* min-height: 60vh; */
    /* max-height : ${(props) => props.height || "fit-content"}; */
    margin: 20px;
    margin-left: 50px;
`

export const VcDivider = styled.div`
    width : 1px;
    height: 60vh;
    margin: 26px 0;
    background-color: gray;
`

export const RightDiv = styled.div`
    width : 30%;
    max-width : 600px;
    min-height: auto;
    height: 650px;
    border-radius: 20px;
    position: absolute;
    right: 0;
    margin: 20px;
    background-color: white;
    box-shadow: 5px 5px 8px rgba(0,0,0,0.3), -5px 0px 8px rgba(0,0,0,0.3);

    &.fixed {
        position: fixed;
        top : 0;
    }
`

export const VoteDiv = styled.div`
    position: absolute;
    right: 0;
    margin: 20px;
`


export const DivList = styled.div`
    width: 100%;
    /* height: 100vh; */
    height: fit-content;
    display: flex;

    /* & ${LeftDiv} {
        height: 55vh;
    } */

    & ${VoteDiv} {
        width: 40%;
        min-height: fit-content;
        max-height: 55vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`


export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: rgba(0,0,0,0.3);
    margin-top: 20px;
    margin-bottom: 20px;
`