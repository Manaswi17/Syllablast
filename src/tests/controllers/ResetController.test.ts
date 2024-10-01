import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ResetController } from '../../controllers/ResetController';
import { Model } from '../../models/Model';

describe('ResetController', () => {
  let model: Model;
  let controller: ResetController;

  beforeEach(() => {
    // Mock the Model
    model = {
      resetGrid: vi.fn(),
      clearSelection: vi.fn(),
    } as unknown as Model;

    controller = new ResetController(model);
  });

  it('should reset the grid and clear selected cells', () => {
    // Act: Call the reset method
    controller.reset();

    // Assert: Check if resetGrid and clearSelection were called
    expect(model.resetGrid).toHaveBeenCalled();
    expect(model.clearSelection).toHaveBeenCalled();
  });
});
