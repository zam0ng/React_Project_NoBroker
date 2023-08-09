import styled from "styled-components"


export const LeftDiv = styled.div`
    width: 80%;
    /* background-color: cadetblue; */
`

export const RightDiv = styled.div`
    width : 20%;
    background-color: aliceblue;
    position: absolute;
    right: 0;

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