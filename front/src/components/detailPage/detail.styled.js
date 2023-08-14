import styled from "styled-components"


export const LeftDiv = styled.div`
    width: 60%;
    margin: 20px;
    /* background-color: cadetblue; */
`

export const RightDiv = styled.div`
    width : 30%;
    height: 80vh;
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


export const DivList = styled.div`
    width: 100%;
    display: flex;
    & ${LeftDiv} {
        /* background-color: aquamarine; */
    }
`


export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: rgba(0,0,0,0.3);
    margin-top: 20px;
    margin-bottom: 20px;
`