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
    align-items: center;
    
    & div{
        font-weight: 600;
        font-size: large;
    }
    & span{
        font-size: medium;
        font-weight: 600;
        color: #0055FF;
    }
`