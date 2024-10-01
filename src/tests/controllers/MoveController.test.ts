import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MoveController } from '../../controllers/MoveController';
import { Model } from '../../models/Model';

describe('MoveController', () => {
  let model: Model;
  let controller: MoveController;

  beforeEach(() => {
    // Mock the Model
    model = {
      selectedCells: [],
      swapSyllables: vi.fn(),
      clearSelection: vi.fn(),
    } as unknown as Model;

    controller = new MoveController(model);
  });

  it('should swap selected cells if exactly 2 cells are selected', () => {
    // Arrange: Set two selected cells
    model.selectedCells = [
      { row: 0, col: 1 },
      { row: 2, col: 3 },
    ];

    // Act: Call swapSelectedCells
    controller.swapSelectedCells();

    // Assert: swapSyllables and clearSelection should have been called
    expect(model.swapSyllables).toHaveBeenCalledWith(0, 1, 2, 3);
    expect(model.clearSelection).toHaveBeenCalled();
  });

  it('should not swap if less than 2 cells are selected', () => {
    // Arrange: Set only one selected cell
    model.selectedCells = [{ row: 0, col: 1 }];
    window.alert = vi.fn(); // Mock alert

    // Act: Call swapSelectedCells
    controller.swapSelectedCells();

    // Assert: swapSyllables and clearSelection should not be called, alert should be triggered
    expect(model.swapSyllables).not.toHaveBeenCalled();
    expect(model.clearSelection).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Please select exactly 2 cells before swapping.');
  });

  it('should not swap if more than 2 cells are selected', () => {
    // Arrange: Set more than two selected cells
    model.selectedCells = [
      { row: 0, col: 1 },
      { row: 2, col: 3 },
      { row: 1, col: 2 },
    ];
    window.alert = vi.fn(); // Mock alert

    // Act: Call swapSelectedCells
    controller.swapSelectedCells();

    // Assert: swapSyllables and clearSelection should not be called, alert should be triggered
    expect(model.swapSyllables).not.toHaveBeenCalled();
    expect(model.clearSelection).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Please select exactly 2 cells before swapping.');
  });
});
