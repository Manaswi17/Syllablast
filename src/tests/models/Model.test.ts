import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Model } from '../../models/Model';

describe('Model', () => {
  let model: Model;

  beforeEach(() => {
    const config = {
      initial: [
        ['syll1', 'syll2'],
        ['syll3', 'syll4'],
      ],
      words: ['syll1,syll2', 'syll3,syll4'],
    };

    model = new Model(config);
  });

  it('should initialize with the correct grid and words', () => {
    expect(model.grid).toEqual([
      ['syll1', 'syll2'],
      ['syll3', 'syll4'],
    ]);
    expect(model.words).toEqual([
      ['syll1', 'syll2'],
      ['syll3', 'syll4'],
    ]);
    expect(model.correctSyllablePositions.size).toBe(4); // All syllables in correct positions
  });

  it('should select a cell', () => {
    model.selectCell(0, 1);
    expect(model.selectedCells).toEqual([{ row: 0, col: 1 }]);
  });

  it('should not allow more than 2 cells to be selected', () => {
    window.alert = vi.fn(); // Mock alert

    model.selectCell(0, 0);
    model.selectCell(0, 1);
    model.selectCell(1, 0);
    expect(window.alert).toHaveBeenCalledWith('Please select exactly 2 cells to swap.');
    expect(model.selectedCells.length).toBe(2);
  });

  it('should swap the selected cells', () => {
    model.selectCell(0, 0);
    model.selectCell(1, 1);
    model.swapSyllables(0, 0, 1, 1);
    expect(model.grid).toEqual([
      ['syll4', 'syll2'],
      ['syll3', 'syll1'],
    ]);
    expect(model.moveCount).toBe(1);
  });

  it('should update correct syllable positions after a swap', () => {
    model.selectCell(0, 0);
    model.selectCell(1, 1);
    model.swapSyllables(0, 0, 1, 1);
    expect(model.correctSyllablePositions.size).toBe(1); // Expect 1 correct syllable after the swap
  });

  it('should clear the selected cells after a swap', () => {
    model.selectCell(0, 0);
    model.selectCell(1, 1);
    model.swapSyllables(0, 0, 1, 1);
    expect(model.selectedCells).toEqual([]);
  });

  it('should reset the grid to the initial configuration', () => {
    model.selectCell(0, 0);
    model.selectCell(1, 1);
    model.swapSyllables(0, 0, 1, 1);
    model.resetGrid();
    expect(model.grid).toEqual([
      ['syll1', 'syll2'],
      ['syll3', 'syll4'],
    ]);
    expect(model.moveCount).toBe(0);
    expect(model.selectedCells).toEqual([]);
  });

  it('should correctly calculate the score based on correct syllable positions', () => {
    model.selectCell(0, 0);
    model.selectCell(1, 1);
    model.swapSyllables(0, 0, 1, 1);
    expect(model.calculateScore()).toBe(1); // Expect 1 correct syllable after the swap
  });

  it('should check if the puzzle is solved', () => {
    expect(model.checkWin()).toBe(true); // Initially, the puzzle is solved
    model.selectCell(0, 0);
    model.selectCell(1, 1);
    model.swapSyllables(0, 0, 1, 1);
    expect(model.checkWin()).toBe(false); // After the swap, the puzzle is not solved
  });

  it('should restore the state from the previous state', () => {
    const previousState = {
      grid: [
        ['syll5', 'syll6'],
        ['syll7', 'syll8'],
      ],
      correctSyllablePositions: new Set(['0-0', '0-1']),
      selectedCells: [{ row: 0, col: 0 }],
      moveCount: 10,
    };

    model.restoreState(previousState);
    expect(model.grid).toEqual([
      ['syll5', 'syll6'],
      ['syll7', 'syll8'],
    ]);
    expect(model.correctSyllablePositions).toEqual(new Set(['0-0', '0-1']));
    expect(model.selectedCells).toEqual([{ row: 0, col: 0 }]);
    expect(model.moveCount).toBe(10);
  });
});
