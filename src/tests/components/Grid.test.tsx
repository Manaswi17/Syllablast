import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it, vi} from 'vitest';
import Grid from '@/components/Grid';

describe('Grid', () => {
  const mockModel = {
    grid: [
      ['syll1', 'syll2', 'syll3', 'syll4'],
      ['syll5', 'syll6', 'syll7', 'syll8'],
      ['syll9', 'syll10', 'syll11', 'syll12'],
      ['syll13', 'syll14', 'syll15', 'syll16'],
    ],
    isCorrectPosition: (row: number, col: number) => (row === 0 && col === 2) || row === col, // Adjusted logic
  };

  it('should render the grid based on the model', () => {
    render(<Grid model={mockModel} selectedCells={[]} onSyllableSelect={vi.fn()} />);

    // Check if all syllables are rendered
    mockModel.grid.forEach((row, rowIndex) => {
      row.forEach((syllable, colIndex) => {
        expect(screen.getByText(syllable)).toBeInTheDocument();
      });
    });
  });

  it('should apply the correct background color for selected and correct position cells', () => {
    const selectedCells = [{ row: 0, col: 1 }, { row: 2, col: 2 }]; // Mock some selected cells
    render(<Grid model={mockModel} selectedCells={selectedCells} onSyllableSelect={vi.fn()} />);

    // Check that selected cells have the 'bg-yellow-400' class
    expect(screen.getByText('syll2')).toHaveClass('bg-yellow-400');

    // Check that a correct-position cell has the 'bg-green-500' class (adjusted to 'syll3')
    expect(screen.getByText('syll3')).toHaveClass('bg-green-500');

    // Check that other cells have the default 'bg-blue-500' class
    expect(screen.getByText('syll5')).toHaveClass('bg-blue-500');
  });

  it('should trigger onSyllableSelect when a syllable is clicked', () => {
    const mockOnSyllableSelect = vi.fn();
    render(<Grid model={mockModel} selectedCells={[]} onSyllableSelect={mockOnSyllableSelect} />);

    // Simulate clicking on a syllable button
    fireEvent.click(screen.getByText('syll1'));
    expect(mockOnSyllableSelect).toHaveBeenCalledWith(0, 0);

    fireEvent.click(screen.getByText('syll6'));
    expect(mockOnSyllableSelect).toHaveBeenCalledWith(1, 1);
  });
});
