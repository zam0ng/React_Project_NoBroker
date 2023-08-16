import styled from 'styled-components'


export const MapContainer = styled.div`
    width : 100%;
    height : 100vh;
`

export const FilterContainer = styled.div`
    
    position : relative;
    display : flex;
    align-items : center;
    height : 100%;
    margin-left : 30px;
    /* background-color : blue */
`

export const SearchContainer = styled.div`
    width : 380px;
    height: 100%;
    display : flex;
    align-items: center;
    flex-shrink : 0;

    border-right: 1px solid rgb(231, 231, 231);
    padding : 0 20px;
    /* background-color : blue; */
`

export const SubHeaderWrapper = styled.div `
    width : 100%;
    height : 64px;
    display : flex; 
    border-bottom: 1px solid rgb(205, 205, 205);
    /* background-color : #ecebeb; */
`

export const SearchBarContainer = styled.div`
    height: 36px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items : center;
    margin: 0px 8px;

    /* background: url(/static/media/icon-search.5023bf62.svg) left center / 16px 16px no-repeat transparent; */

    > input {
        outline : none;
        letter-spacing : -1px;
        font-weight : 500;
        font-size : 14px;
    }

    > input::placeholder {
        letter-spacing : -0.9px;
        font-weight : 500;
        font-size : 14px;
    }

`
