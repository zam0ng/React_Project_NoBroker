import styled from 'styled-components'

export const VoteDiv = styled.div`
    width: 70%;
`

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
    justify-content: start;
`

export const Bar = styled.div`
    width: ${(props) => props.width};
    background-color: ${(props) => props.backgroundColor || "gray"};
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Text = styled.p`
    font-weight: bold;
    text-align: left;
    margin: 0;
`

export const Chart = styled.div`
    /* width: 66%; */
    display: flex;
    justify-content: center;
    margin: 10px auto;
    overflow: hidden;
    border-radius: 15px;

    /* & ${Bar}:nth-child(1) {
        border-radius: 10px 0 0 10px;
    }
    & ${Bar}:nth-child(2) {
        border-radius: 0 10px 10px 0;
    } */
`

export const VerChart = styled.div`
    /* width: 66%; */
    margin: 10px auto;
    overflow: hidden;

    & ${Bar} {
        border-radius: 0 10px 10px 0;
    }

    & ${Text}:nth-child(3) {
        margin-top : 10px;
    }
`

// export const ChartDiv = styled.div`

// `