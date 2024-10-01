"use client";

import React, { useState, useEffect } from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import { Tooltip } from "@mui/material";
import { MoveController } from "../controllers/MoveController";
import { ResetController } from "../controllers/ResetController";
import { UndoController } from "../controllers/UndoController";
import { Model } from "../models/Model";
import ConfigPage from "./ConfigPage";
import Grid from "./Grid";


const App: React.FC = () => {
  const [config, setConfig] = useState<any | null>(null);
  const [model, setModel] = useState<Model | null>(null);
  const [initialConfig, setInitialConfig] = useState<any | null>(null);
  const [selectedCells, setSelectedCells] = useState<
    { row: number; col: number }[]
  >([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isVictory, setIsVictory] = useState(false);

  const [undoController, setUndoController] = useState<UndoController | null>(
    null
  );
  const [resetController, setResetController] =
    useState<ResetController | null>(null);
  const [moveController, setMoveController] = useState<MoveController | null>(
    null
  );

  useEffect(() => {
    if (model) {
      setUndoController(new UndoController(model));
      setResetController(new ResetController(model));
      setMoveController(new MoveController(model));
    }
  }, [model]);

  const handleSyllableSelect = (row: number, col: number) => {
    if (model && !isVictory) {
      model.selectCell(row, col);
      setSelectedCells([...model.selectedCells]);
    }
  };

  const startGame = (selectedConfig: any) => {
    const gameModel = new Model(selectedConfig);
    setModel(gameModel);
    setConfig(selectedConfig);
    setInitialConfig(selectedConfig);
    setSelectedCells([]);
    setScore(0);
    setMoves(0);
    setIsVictory(false);
  };

  const handleSwap = () => {
    if (
      !isVictory &&
      moveController &&
      selectedCells.length === 2 &&
      undoController
    ) {
      undoController.saveState(); 
      moveController.swapSelectedCells(); 

      setScore(model?.calculateScore() || 0);
      setSelectedCells([]);
      setMoves((prevMoves) => prevMoves + 1);

      if (model?.checkWin()) {
        setIsVictory(true); 
      }
    } else {
      alert("Please select exactly 2 cells to swap.");
    }
  };

  const handleUndo = () => {
    if (undoController && model) {
      undoController.undo();
      model.updateCorrectPositions(); 
      setScore(model.calculateScore()); 
      setMoves((prevMoves) => (prevMoves > 0 ? prevMoves - 1 : 0));
      setSelectedCells([]);
    }
  };

  const handleReset = () => {
    if (resetController) {
      resetController.reset();
      undoController?.clearHistory(); 
      setScore(0);
      setMoves(0);
      setSelectedCells([]);
      setIsVictory(false);
    }
  };

  return (
    <div className="App bg-blue-100 min-h-screen flex flex-col items-center justify-center py-10">
      <header className="text-3xl font-bold text-blue-800 mb-5">
        Syllablast Game
      </header>
      {!config ? (
        <ConfigPage onSelectConfig={startGame} />
      ) : (
        <>
          <button
            onClick={() => setConfig(null)}
            className="absolute top-0 left-0 m-4 p-2 bg-gray-300 hover:bg-gray-400 text-black rounded"
          >
            <Tooltip title="Back to Config">
              <ReplyIcon />
            </Tooltip>
          </button>
          <div>
            {model && (
              <Grid
                model={model}
                selectedCells={selectedCells}
                onSyllableSelect={handleSyllableSelect}
                data-testid="grid-element"
              />
            )}
            <div className="text-center mt-4">
              <div data-testid="score">Score: {score}</div>
              <div data-testid="moves">Moves: {moves}</div>
              {isVictory && (
                <div className="text-green-500 text-xl font-bold">
                  Congratulations! You've won the game!
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-center space-x-4">
             

              <button
                data-testid="undo-button"
                onClick={handleUndo}
                className={`font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${
                  undoController?.canUndo() && !isVictory
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!undoController?.canUndo() || isVictory}
              >
                Undo
              </button>
              <button
                data-testid="swap-button"
                onClick={handleSwap}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${
                  isVictory ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isVictory} 
              >
                Swap
              </button>
              <button
                data-testid="reset-button"
                onClick={handleReset}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Reset
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
