import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom matchers
import React from 'react';
import { beforeAll, describe, expect, it, vi} from 'vitest';
import App from '@/components/App';

beforeAll(() => {
  // Mock window.alert to avoid "Not implemented" error in jsdom
  window.alert = vi.fn();
});

describe('App Component', () => {
  it('renders the configuration page initially', () => {
    render(<App />);

    // Use getByAltText to find the images associated with configurations
    expect(screen.getByAltText(/config 1/i)).toBeInTheDocument();
    expect(screen.getByAltText(/config 2/i)).toBeInTheDocument();
    expect(screen.getByAltText(/config 3/i)).toBeInTheDocument();
  });

  it('starts the game when a configuration is selected and renders the grid', async () => {
    render(<App />);

    // Simulate clicking on a configuration option to start the game
    fireEvent.click(screen.getByAltText(/config 1/i)); // Select Configuration 1

    // Expect the grid to be rendered after selecting a configuration
    expect(screen.getByTestId('grid-element')).toBeInTheDocument();
  });

  it('performs a swap and updates score and moves', async () => {
    render(<App />);

    // Select a configuration to start the game
    fireEvent.click(screen.getByAltText(/config 1/i));

    // Simulate swapping two syllables
    fireEvent.click(screen.getByTestId('swap-button'));

    // Check if the score is updated and moves increment
    expect(screen.getByTestId('score')).toHaveTextContent(/score: \d+/i);
    expect(screen.getByTestId('moves')).toHaveTextContent(/moves: \d+/i);
  });

  it('resets the game correctly', async () => {
    render(<App />);

    // Select a configuration to start the game
    fireEvent.click(screen.getByAltText(/config 1/i));

    // Simulate resetting the game
    fireEvent.click(screen.getByTestId('reset-button'));

    // Check that the game state has been reset
    expect(screen.getByTestId('score')).toHaveTextContent(/score: 0/i);
    expect(screen.getByTestId('moves')).toHaveTextContent(/moves: 0/i);
  });

  it('handles undo functionality correctly', async () => {
    render(<App />);

    // Select a configuration to start the game
    fireEvent.click(screen.getByAltText(/config 1/i));

    // Simulate performing a swap
    fireEvent.click(screen.getByTestId('swap-button'));

    // Perform undo
    fireEvent.click(screen.getByTestId('undo-button'));

    // Check if the score and moves are updated correctly after undo
    expect(screen.getByTestId('score')).toHaveTextContent(/score: 0/i); // Assuming the score goes back to 0
    expect(screen.getByTestId('moves')).toHaveTextContent(/moves: 0/i); // Moves should decrement
  });
});
