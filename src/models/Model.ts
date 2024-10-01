export class Model {
  grid: string[][];
  initialConfig: string[][];
  words: string[][] = []; 
  correctSyllablePositions: Set<string> = new Set(); 
  selectedCells: { row: number; col: number }[] = []; 
  moveCount: number = 0; 

  constructor(config: any) {
    this.grid = config.initial ? config.initial.map((row: string[]) => [...row]) : [[]]; 
    this.initialConfig = config.initial || [[]]; 
    this.words = config.words.map((word: string) => word.split(",")); 
    this.updateCorrectPositions(); 
  }

  // Method to select a cell
  selectCell(row: number, col: number): void {
    if (this.selectedCells.length < 2) {
      if (!this.selectedCells.some((cell) => cell.row === row && cell.col === col)) {
        this.selectedCells.push({ row, col });
      }
    } else {
      alert("Please select exactly 2 cells to swap.");
    }
  }

  // Update the correct syllable positions after each swap
  updateCorrectPositions(): void {
    this.correctSyllablePositions.clear();

    // Track the correct placement of each word, starting with the first column syllable
    for (const word of this.words) {
      for (let row = 0; row < this.grid.length; row++) {
        let isWordCorrect = true;

        // Ensure first syllable is in the correct column (column doesn't depend on row)
        for (let i = 0; i < word.length; i++) {
          let syllable = word[i];
          let correctCol = i; // Each word's syllables should be placed in consecutive columns starting from 0

          // Ensure the first syllable is placed in the correct column
          if (this.grid[row][correctCol] === syllable) {
            this.correctSyllablePositions.add(`${row}-${correctCol}`);
          } else {
            isWordCorrect = false;
            break; 
          }
        }
      }
    }
  }

  // Swap the selected cells' syllables
  swapSyllables(row1: number, col1: number, row2: number, col2: number): void {
    const temp = this.grid[row1][col1];
    this.grid[row1][col1] = this.grid[row2][col2];
    this.grid[row2][col2] = temp;
    this.moveCount++; 
    this.updateCorrectPositions(); 
    this.clearSelection(); 
  }

  // Method to check if the puzzle is solved
  checkWin(): boolean {
    return this.correctSyllablePositions.size === this.grid.length * this.grid[0].length;
  }

  // Calculate the current score based on correct syllable positions
  calculateScore(): number {
    return this.correctSyllablePositions.size;
  }

  // Clear selected cells after a swap
  clearSelection(): void {
    this.selectedCells = [];
  }

  // Check if a syllable is in the correct position
  isCorrectPosition(row: number, col: number): boolean {
    return this.correctSyllablePositions.has(`${row}-${col}`);
  }

  // Reset the grid to the initial configuration
  resetGrid(): void {
    this.grid = this.initialConfig.map((row) => [...row]);
    this.selectedCells = []; 
    this.moveCount = 0; 
    this.updateCorrectPositions(); 
  }

  // Restore the state from the undo controller
  restoreState(previousState: any): void {
    if (previousState) {
      this.grid = previousState.grid.map((row: string[]) => [...row]);
      this.correctSyllablePositions = new Set(previousState.correctSyllablePositions); 
      this.selectedCells = previousState.selectedCells ? [...previousState.selectedCells] : []; 
      this.moveCount = previousState.moveCount; 
    }
  }
}
