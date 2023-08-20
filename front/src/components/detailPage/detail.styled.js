import styled from "styled-components"


export const LeftDiv = styled.div`
    width : ${(props) => props.width || "60%"};
    min-height : ${(props) => props.height || "65vh"};
    margin: 20px;
`

export const VcDivider = styled.div`
    width : 1px;
    height: 60vh;
    margin: auto 0;
    background-color: gray;
`

export const RightDiv = styled.div`
    width : 30%;
    height: 76vh;
    border-radius: 20px;
    position: absolute;
    right: 0;
    margin: 20px;
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
    display: flex;

    & ${LeftDiv} {
        height: 55vh;
    }

    & ${VoteDiv} {
        width: 40%;
        height: 55vh;
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