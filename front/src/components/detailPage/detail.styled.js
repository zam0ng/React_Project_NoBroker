import styled from "styled-components"

export const LeftDiv = styled.div`
    width: 600px;
    background-color: cadetblue;
`

export const RightDiv = styled.div`
    width : 200px;
    background-color: blueviolet;
    /* position: fixed; */
    position: absolute;
    /* top : 0; */
    right: 0;

    & .fixed {
        position: fixed;
        top : 0
    }
`

