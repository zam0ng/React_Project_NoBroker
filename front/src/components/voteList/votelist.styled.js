import styled from 'styled-components'

export const BigImg = styled.img`
    width: 30%;
    height: 200px;
    text-align: center;
    /* display: flex;
    justify-content: center;
    align-items: center; */
`

export const Estate = styled.div`
    /* width: 300px; */
    width: 100%;
    /* height: 300px; */
    display: flex;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    /* background-color: orange; */
    cursor: pointer;
    margin: 8px;
    border: 2px solid gray;
    border-radius: 20px;
    overflow: hidden;

    position: relative;
`

export const EstateNum = styled.p`
    color : black;
    font-size: 26px;
    font-weight: bold;

    position: absolute;
    top: 15px;
    left: 15px;
    margin: 0;

`

export const Title = styled.p`
    font-weight: bold;
    font-size: 20px;
    margin-top: 0;
    /* margin-bottom: 6px; */
`


export const Road = styled.p`
    margin: 0;
`

export const ContentDiv = styled.div`
    /* width: 60%; */
    /* background-color: gray; */
    margin: auto;

    & p {
        text-align: left;
    }
`

export const VoteDate = styled.p`
    color: red;
    text-align: left;
`

export const List = styled.div`
    width: 1300px;
    /* width: 100%; */
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    & ${ContentDiv}:nth-child(3) {
        width : 35%;
        padding-left : 25px;
        /* padding-right : 30px; */
    }

    & ${ContentDiv}:nth-child(5) {
        width : 25%;
    }

    & ${ContentDiv}:nth-child(5) p {
        text-align: center;
        font-weight: bold;
    }
`

export const ListDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

export const ChartDiv = styled.div`
    width: 100%;
`

export const Chart = styled.div`
    width: 70%;
    background-color: blue;
    display: flex;
    margin: auto;
    border-radius: 4px;
    overflow: hidden;
`

export const Bar = styled.div`
    width: ${(props) => props.width || "1px"};
    height: 30px;
    background-color: ${(props)=>props.backgroundColor || "orange"};
`