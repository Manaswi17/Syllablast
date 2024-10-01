import { Model } from '../models/Model';

export class UndoController {
  private model: Model;
  private history: any[] = []; 

  constructor(model: Model) {
    this.model = model;
  }

  saveState(): void {
    const currentState = {
      grid: this.model.grid.map(row => [...row]), 
      correctSyllablePositions: new Set(this.model.correctSyllablePositions), 
      selectedCells: [...this.model.selectedCells], 
      moveCount: this.model.moveCount 
    };
    this.history.push(currentState);
  }

  undo(): void {
    if (this.history.length > 0) {
      const previousState = this.history.pop();
      this.model.restoreState(previousState); 
      this.model.updateCorrectPositions(); 
      this.model.clearSelection(); 
    } else {
      alert('No moves to undo.');
    }
  }

  clearHistory(): void {
    this.history = [];
  }
  canUndo(): boolean {
    return this.history.length > 0;
  }
}
