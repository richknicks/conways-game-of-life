import React from "react";
import styled from "styled-components";
const MainDiv = styled.div`
  background-color: #c1091f;
  width: 500px;
  line-height: 3rem;
  justify-content: center;
  height: 1200px;

  p {
    font-family: "Holtwood One SC", serif;
    color: #ffa500;
  }
`;
const About = () => {
  return (
    <MainDiv>
      <p>
        The Game of Life, also known simply as Life, is a cellular automaton
        devised by the British mathematician John Horton Conway in 1970.[1] It
        is a zero-player game, meaning that its evolution is determined by its
        initial state, requiring no further input. One interacts with the Game
        of Life by creating an initial configuration and observing how it
        evolves. It is Turing complete and can simulate a universal constructor
        or any other Turing machine.
      </p>
    </MainDiv>
  );
};
export default About;
