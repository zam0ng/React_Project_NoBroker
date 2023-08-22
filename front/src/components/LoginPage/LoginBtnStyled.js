import styled from "styled-components";

export const LoginBtn = styled.div`
  width: 100px;
  height: 30px;
  white-space: 30px;
  border: 3px solid orange;
  border-radius: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  background-color: white;
  font-family: 'GmarketSansMedium';

  &:hover{
    background-color: rgba(0,0,0,0.2);
  }
`;
