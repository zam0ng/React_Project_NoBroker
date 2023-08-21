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
        /* margin-top: 10px; */
    }

    & li ${DetailTitle} {
        width : 30%;
        padding-left: 20px;
        display: flex;
        justify-content: baseline;
        font-size:21px;
        margin-top: 16px;
        margin-bottom: 16px;
    }

    & li ${DetailContent} {
        width: 70%;
        display: flex;
        justify-content: baseline;
        font-size: 20px;
        margin-top: 16px;
        margin-bottom: 16px;
    }
`

export const H1 = styled.h1`
    display: flex;
    padding-left: 20px;
    justify-content: start;
    margin-top: -20px;
`
