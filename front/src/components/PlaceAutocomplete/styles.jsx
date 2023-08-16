
import styled from 'styled-components';

export const InputWrapper = styled.div`
    background-color : white;
    /* background-color : yellow; */
    /* height : 100vh; */
    width : 100%;
    border-radius: 10px;
    height: 2.5rem;
    padding: 0 15px;
    box-shadow: 1px 1px 8px #ddd;
    display : flex;
    align-items : center;

    > input {
        /* ✅ 아 여기를 투명으로 하네?  */
        background-color : transparent;

        border : none;
        height : 100%;
        font-size : 1.25rem;
        width : 100%;
        margin-left : 10px
    }

    /* input 창 클릭하면, 테두리선 없는 것✅ */
    > input:focus {
        outline : none;
    }

    /* Wrapper 아래에 있는 search-icon 태그를 꾸밈  */
    #search-icon {
        color : royalblue
    }
`;

