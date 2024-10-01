import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { config1, config2, config3 } from '../../types/puzzle';
import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import ConfigPage from '@/components/ConfigPage';

// Use Vitest's mock function (vi.mock)
vi.mock('../../assets/images/config1.jpg', () => '/images/config1.jpg');
vi.mock('../../assets/images/config2.jpg', () => '/images/config2.jpg');
vi.mock('../../assets/images/config3.jpg', () => '/images/config3.jpg');

describe('ConfigPage', () => {
  it('should render the title and configuration images', () => {
    render(<ConfigPage onSelectConfig={vi.fn()} />);

    // Check if the title is rendered
    expect(screen.getByText('Select Configuration')).toBeInTheDocument();

    // Check if all configuration images and labels are rendered
    expect(screen.getByAltText('Config 1')).toBeInTheDocument();
    expect(screen.getByAltText('Config 2')).toBeInTheDocument();
    expect(screen.getByAltText('Config 3')).toBeInTheDocument();

    expect(screen.getByText('Configuration 1')).toBeInTheDocument();
    expect(screen.getByText('Configuration 2')).toBeInTheDocument();
    expect(screen.getByText('Configuration 3')).toBeInTheDocument();
  });

  it('should call onSelectConfig with correct config when image is clicked', () => {
    const mockOnSelectConfig = vi.fn();
    render(<ConfigPage onSelectConfig={mockOnSelectConfig} />);

    // Simulate clicking on the first configuration image
    fireEvent.click(screen.getByAltText('Config 1'));
    expect(mockOnSelectConfig).toHaveBeenCalledWith(config1);

    // Simulate clicking on the second configuration image
    fireEvent.click(screen.getByAltText('Config 2'));
    expect(mockOnSelectConfig).toHaveBeenCalledWith(config2);

    // Simulate clicking on the third configuration image
    fireEvent.click(screen.getByAltText('Config 3'));
    expect(mockOnSelectConfig).toHaveBeenCalledWith(config3);
  });
});
