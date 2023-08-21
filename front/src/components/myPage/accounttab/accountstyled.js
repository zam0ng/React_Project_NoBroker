import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`

export const Myaccount = styled.div`
    width: 40%;
    height: 67%;
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

export const TossBox = styled.div`
    width: 100%;
    height: 400px;
    /* border: solid 1px black; */

    

    & ul{
        height: 100px;
        line-height: 30px;
        /* border: 1px solid black; */
        list-style-type : circle;
        & li{
            width: 500px;
            font-size: small;
            text-align: left;
            margin-left: 20px;
        }
    }

    & button{
        border: none;
        width: 500px;
        height: 50px;
        color: white;
        font-weight: 600;
        background-color: ${props=>(props.disabled ? "lightgray" : "orange" )};
    }
    
`
export const DepositDiv = styled.div`
    
        height: 100px;
        display: flex;
        justify-content: space-evenly;
        /* border: 1px solid black; */
        align-items: center;

        & span{
        /* border:  1px solid black; */
        height: 50px;
        line-height: 50px;
        }

        & input{
            height: 50px;
            width: 300px;
            text-align: right;
            padding-right:10px;
       
            &::placeholder{
                text-align: right;
                padding-right: 5px;
            }
        }
    
`
export const WithdrawDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    
  

    & input{
            height: 50px;
            width: 300px;
            text-align: right;
            padding-right:10px;
       
            &::placeholder{
                text-align: right;
                padding-right: 5px;
            }
        }
`
export const Ablewithdraw = styled.div`
    width: 480px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    line-height: 50px;
`
export const WithdrawValue = styled.div`
    width: 480px;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`