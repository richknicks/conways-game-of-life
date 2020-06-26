import React from "react";
import styled from "styled-components";
const MainDiv = styled.div`
  background-color: #c1091f;
  width: 500px;
  line-height: 3rem;
  justify-content: center;
  height: 1200px;
  h3 {
    font-family: "Holtwood One SC", serif;
  }
  p {
    font-family: "Holtwood One SC", serif;
    color: #ffa500;
  }
`;
const Rules = () => {
  return (
    <MainDiv>
      <h3>Rules of the Game:</h3>
      <p>
        1. Any live cell with fewer than 2 live neighbors dies, as if by
        underpopulation.
      </p>
      <p>
        2. Any live cell with 2 or 3 live neighbors lives on to the next
        generation.
      </p>
      <p>
        3. Any live cell with more than 3 live neighbors dies, as if by
        overpopulation.
      </p>
      <p>
        4. Any dead cell with exactly 3 live neighbors becomes a live cell, as
        if by reproduction.
      </p>
    </MainDiv>
  );
};
export default Rules;
