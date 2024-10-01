import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UndoController } from '../../controllers/UndoController';
import { Model } from '../../models/Model';

describe('UndoController', () => {
  let model: Model;
  let controller: UndoController;

  beforeEach(() => {
    // Mock the Model
    model = {
      grid: [['syll1', 'syll2'], ['syll3', 'syll4']],
      correctSyllablePositions: new Set([0, 1]),
      selectedCells: [{ row: 0, col: 1 }],
      moveCount: 5,
      restoreState: vi.fn(),
      updateCorrectPositions: vi.fn(),
      clearSelection: vi.fn(),
    } as unknown as Model;

    controller = new UndoController(model);
  });

  it('should save the current state of the model', () => {
    // Act: Call saveState
    controller.saveState();

    // Assert: Check if the history has the current model state saved
    expect(controller['history']).toHaveLength(1);
    const savedState = controller['history'][0];
    expect(savedState.grid).toEqual([['syll1', 'syll2'], ['syll3', 'syll4']]);
    expect(savedState.correctSyllablePositions).toEqual(new Set([0, 1]));
    expect(savedState.selectedCells).toEqual([{ row: 0, col: 1 }]);
    expect(savedState.moveCount).toBe(5);
  });

  it('should undo the last move and restore the previous state', () => {
    // Arrange: Save the current state
    controller.saveState();

    // Modify the model to simulate a new state
    model.grid = [['syll5', 'syll6'], ['syll7', 'syll8']];
    model.moveCount = 6;

    // Act: Call undo
    controller.undo();

    // Assert: Check if the model's restoreState was called with the previous state
    expect(model.restoreState).toHaveBeenCalledWith({
      grid: [['syll1', 'syll2'], ['syll3', 'syll4']],
      correctSyllablePositions: new Set([0, 1]),
      selectedCells: [{ row: 0, col: 1 }],
      moveCount: 5,
    });
    expect(model.updateCorrectPositions).toHaveBeenCalled();
    expect(model.clearSelection).toHaveBeenCalled();
  });

  it('should not undo if there is no history', () => {
    // Mock alert
    window.alert = vi.fn();

    // Act: Call undo with no history
    controller.undo();

    // Assert: Alert should be triggered
    expect(window.alert).toHaveBeenCalledWith('No moves to undo.');
  });

  it('should clear the history', () => {
    // Arrange: Save state and ensure history is not empty
    controller.saveState();
    expect(controller['history']).toHaveLength(1);

    // Act: Clear history
    controller.clearHistory();

    // Assert: History should be empty
    expect(controller['history']).toHaveLength(0);
  });

  it('should return true if undo is available', () => {
    // Arrange: Save state
    controller.saveState();

    // Act & Assert: canUndo should return true
    expect(controller.canUndo()).toBe(true);
  });

  it('should return false if undo is not available', () => {
    // Act & Assert: canUndo should return false with no history
    expect(controller.canUndo()).toBe(false);
  });
});
