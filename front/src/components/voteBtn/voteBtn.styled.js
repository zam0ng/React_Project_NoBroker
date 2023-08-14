import styled from 'styled-components'

export const Btn = styled.div`
    width: 200px;
    height: 60px;
    border-radius: 10px;
    background-color: ${(props) => props.backgroundColor || "green"};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const BtnDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    & ${Btn}:nth-child(2) {
        margin-left: 20px;
    }
`

export const H1 = styled.h1`
    display: flex;
    justify-content: center;
`
