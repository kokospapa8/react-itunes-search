import React from "react";
import styled from "styled-components";

const StyledHeder = styled.header`
  background-color: #282c34;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: yellow;
  padding: 20px;
`;

const StyledHeaderText = styled.h2`
  margin: 0;
`;

const Header = (props) => {
  return (
    <StyledHeder>
      <StyledHeaderText>{props.text}</StyledHeaderText>
    </StyledHeder>
  );
};

export default Header;
