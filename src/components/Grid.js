import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import Generation from "./Generation";
import produce from "immer";
const MainDiv = styled.div`
  button {
    box-shadow: 0px 10px 14px -7px #276873;
    background: linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
    background-color: #599bb3;
    border-radius: 8px;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 20px;
    font-weight: bold;
    padding: 8px 16px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #3d768a;
  }
`;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const Grid = () => {
  const [numRows, setNumRows] = useState(25);
  const [numCols, setNumCols] = useState(25);
  const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  };
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [running, setRunning] = useState(false);
  const [genCount, setGenCount] = useState(0);
  const [speed, setSpeed] = useState(100);
  const [size, setSize] = useState(true);
  const [gridSpace, setGridSpace] = useState(true);
  const [sizeButton, setSizeButton] = useState(true);
  const runningRef = useRef(running);
  runningRef.current = running;
  const generationCount = 0;
  const generationCountRef = useRef(generationCount);
  generationCountRef.current = generationCount;

  const changeSpeed = (e) => {
    if (!running) {
      setSpeed(e.target.value);
    }
  };
  const changeSize = (e) => {
    if (!running) {
      size ? setSize(false) : setSize(true);
    }
  };
  const changeSizeButton = (e) => {
    if (!running) {
      sizeButton ? setSizeButton(false) : setSizeButton(true);
    }
  };
  const changeGridSpace = (e) => {
    if (!running) {
      gridSpace ? setGridSpace(false) : setGridSpace(true);
    }
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGenCount((genCount) => (genCount += 1));
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, speed);
  }, [speed, numRows, numCols]);

  return (
    <>
      <Generation genCount={genCount} />
      <MainDiv>
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? "Stop" : "Start"}
        </button>
        <button
          onClick={() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
              rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.5 ? 1 : 0))
              );
            }

            setGrid(rows);
          }}
        >
          Random
        </button>
        <button
          onClick={() => {
            setGrid(generateEmptyGrid());
            setGenCount(0);
            setSpeed(100);
          }}
        >
          Clear
        </button>
        <button
          onClick={() => {
            changeSize();
            changeGridSpace();
            changeSizeButton();
          }}
        >
          {sizeButton ? "Increase Grid Size" : "Decrease Grid Size"}
        </button>
      </MainDiv>
      <form>
        <label style={{ fontFamily: "Holtwood One SC", paddingBottom: 20 }}>
          Speed in Milliseconds :<span> </span>
          <input
            type="text"
            value={speed}
            onChange={changeSpeed}
            style={{ marginBottom: 10, marginTop: 10 }}
          />
        </label>
      </form>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridSpace
            ? `repeat(${numCols},  20px)`
            : `repeat(${numCols},  40px)`,
          paddingBottom: 300,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: size ? 20 : 40,
                height: size ? 20 : 40,
                backgroundColor: grid[i][k] ? "yellow" : undefined,
                border: "solid 1px green",
                pointerEvents: running ? "none" : "auto",
              }}
            />
          ))
        )}
      </div>
    </>
  );
};
export default Grid;
