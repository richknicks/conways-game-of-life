import React from "react";
import About from "./components/About";
import Grid from "./components/Grid";
import Rules from "./components/Rules";

import { Route, Link, Switch } from "react-router-dom";
import styled from "styled-components";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #c1091f;

  h1 {
    font-family: "Holtwood One SC", serif;
  }
`;

const App = () => {
  return (
    <MainDiv>
      <div>
        <Link
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "1.5rem",
            paddingRight: 10,
          }}
          to="/about"
        >
          About
        </Link>
        <Link
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "1.5rem",
            paddingRight: 10,
          }}
          to="/rules"
        >
          Rules
        </Link>
        <Link
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "1.5rem",
            paddingRight: 10,
          }}
          to="/game"
        >
          Game
        </Link>
      </div>
      <h1>Welcome to John Conway's Game of Life </h1>
      <Switch>
        <Route path="/about" component={About} />

        <Route path="/rules" component={Rules} />

        <Route path="/game" component={Grid} />
      </Switch>
    </MainDiv>
  );
};

export default App;
