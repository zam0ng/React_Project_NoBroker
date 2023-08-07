import {styled,createGlobalStyle } from 'styled-components';

export const MainTitle = styled.div`
    width : 85%;
    height: 200px;
    line-height: 200px;
    font-size: 250%;
    font-weight: 600;
    border: 1px solid black;
`
export const Caution = styled.div`
    width: 85%;
    height: 200px;
    line-height: 50px;
    border: 1px solid black;
    display: flex;
    & ul{
        height: 100px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
}
    & li{
        height: 50px;
        color : gray;
        font-size: smaller;
    }
`
export const Bodyy = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const EstataInfoTitle = styled.div`
    width: 85%;
    height: 80px;
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    
    & div{
        font-weight: 600;
        font-size: large;
        margin-bottom: 10px;
    }
    /* & span{
        font-size: medium;
        font-weight: 600;
        color: #0055FF;
    } */
`
export const EssentialSpan = styled.span`
    font-size: smaller;
    font-weight: 600;
    color: #0055FF;
    margin-bottom: 10px;

`
export const WarningSpan = styled.span`
    font-size: smaller;
    font-weight: 600;
    color: red;
    cursor: pointer;
    margin-bottom: 10px;


    &:hover{
        border-bottom: 1px solid red;
    }

`
export const Modalbody = styled.div`
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.715);
    display: ${(props)=>props.display || "none"};
`
export const Modal = styled.div`
    position: absolute;
    width: 400px;
    height: 370px;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    
    & div{
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        margin-left: 10px;
    }
    & p{
        font-size: smaller;
        color: gray;
    }
    & button{
        width: 100px;
        height: 50px;
        font-weight: 600;
        background-color: white;
        border : 1px solid lightgray;
    
        &:hover{
            background-color: lightgray;
        }
    }
   

`

