import styled from "styled-components"

export const DetailTitle = styled.p`
    font-weight: bold;
    font-size: 18px;
`
export const DetailContent = styled.p`
    font-size: 20px;
`

export const DetailUl = styled.ul`
    list-style: none;
    padding-inline-start: 0px;

    & li {
        display: flex;
    }

    & li ${DetailTitle} {
        width : 30%;
        padding-left: 10%;
        display: flex;
        justify-content: baseline;
    }

    & li ${DetailContent} {
        width: 70%;
        display: flex;
        justify-content: baseline;
    }
`

export const H1 = styled.h1`
    display: flex;
    padding-left: 20px;
    justify-content: start;
`
