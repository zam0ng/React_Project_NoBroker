import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`

export const Myaccount = styled.div`
    width: 40%;
    height: 100%;
    /* border: 1px solid; */
    display: flex;
    flex-wrap: wrap;

    & h3{
        width: 100%;
        height: 50px;
        /* border: 1px solid; */
        line-height: 50px;
    }
`

export const DepositWithdraw = styled.div`
    width: 60%;
    height: 100%;
    border-left: 1px solid lightgray;

    & h4{
        display: flex;
        justify-content: center;
        line-height: 50px;
    }
`

export const Coincontainer = styled.div`
    width: 100%;
    height: 340px;
    /* border: 1px solid; */
    display: flex;
        & h4{
            width: 40%;
            height: 25px;
            border-bottom : 3px solid orange
        }
`
export const CoinlistDiv = styled.div`
        width: 50%;
        height: 100%;
        /* border: 1px solid; */
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
`
export const Coinlist = styled.div`
    width: 100%;
    height: 310px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    

    & div{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid lightgray;
        border-collapse: collapse;
        text-align: center;
        line-height: 50px;
    }

`
export const SecondCoinlist = styled(Coinlist)`

    width: 95%;
    height: 310px;
    & div{
        text-align: right;
        padding-right: 10px;
    }
`
export const TabDiv = styled.div`
    width: 30%;
    height: 50px;
    /* border-bottom: 1px solid black; */
    border-bottom: 3px solid ${(props)=>props.isActive ? "orange" : "black"};
    color : ${(props)=>props.isActive ? "orange" : "black"};
    border-collapse: collapse;
`