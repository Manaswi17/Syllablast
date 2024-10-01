import React from 'react';

interface GridProps {
  model: any;
  selectedCells: { row: number; col: number }[];
  onSyllableSelect: (row: number, col: number) => void;
}

const Grid: React.FC<GridProps> = ({ model, selectedCells, onSyllableSelect }) => {
  const isSelected = (row: number, col: number) => {
    return selectedCells.some((cell) => cell.row === row && cell.col === col);
  };
  const isCorrectPosition = (row: number, col: number) => {
    return model.isCorrectPosition(row, col); 
  };

  return (
    <div className="grid grid-cols-4 gap-4 mt-8" data-testid="grid-element">
      {model.grid.map((row: string[], rowIndex: number) =>
        row.map((syllable: string, colIndex: number) => {
          const selected = isSelected(rowIndex, colIndex);
          const correctPosition = isCorrectPosition(rowIndex, colIndex);

          return (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`w-16 h-16 font-bold rounded-lg flex items-center justify-center shadow-md transition-transform transform hover:scale-105
                ${correctPosition ? 'bg-green-500' : selected ? 'bg-yellow-400' : 'bg-blue-500'} 
                text-white`}
              onClick={() => onSyllableSelect(rowIndex, colIndex)}
            >
              {syllable}
            </button>
          );
        })
      )}
    </div>
  );
};

export default Grid;
