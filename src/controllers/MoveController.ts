import { Model } from '../models/Model';

export class MoveController {
  model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  swapSelectedCells(): void {
    const selectedCells = this.model.selectedCells;

    if (selectedCells.length === 2) {
      const [first, second] = selectedCells;
      this.model.swapSyllables(first.row, first.col, second.row, second.col);
      this.model.clearSelection(); 
    } else {
      alert("Please select exactly 2 cells before swapping.");
    }
  }
}
