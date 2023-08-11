import styled from "styled-components"

export const DetailTitle = styled.p`
    font-weight: bold;
    font-size: 16px;
`
export const DetailContent = styled.p`
    font-size: 18px;
`

export const DetailUl = styled.ul`
    list-style: none;
    padding-inline-start: 0px;

    & li {
        display: flex;
    }

    & li ${DetailTitle} {
        width : 30%;
    }

    & li ${DetailContent} {
        width: 70%;
    }
`

export const H1 = styled.h1`
    display: flex;
    padding-left: 20px;
    justify-content: start;
`