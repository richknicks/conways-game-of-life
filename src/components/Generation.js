import React from "react";
import styled from "styled-components";
const MainDiv = styled.div`
  h3 {
    font-family: "Holtwood One SC", serif;
  }
`;

function GenDisplay({ genCount }) {
  return (
    <MainDiv>
      <h3>{`Number of Generations: ${genCount}`}</h3>
    </MainDiv>
  );
}

export default GenDisplay;
