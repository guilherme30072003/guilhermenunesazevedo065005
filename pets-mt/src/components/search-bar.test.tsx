import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './search-bar';

describe('SearchBar Component', () => {
    it('should render search input', () => {
        const mockOnSearchChange = vi.fn();
        render(
            <SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />
        );

        const input = screen.getByPlaceholderText('Pesquise um pet');
        expect(input).toBeInTheDocument();
    });

    it('should display current search term', () => {
        const mockOnSearchChange = vi.fn();
        render(
            <SearchBar searchTerm="Fluffy" onSearchChange={mockOnSearchChange} />
        );

        const input = screen.getByDisplayValue('Fluffy');
        expect(input).toBeInTheDocument();
    });

    it('should call onSearchChange when input changes', () => {
        const mockOnSearchChange = vi.fn();
        render(
            <SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />
        );

        const input = screen.getByPlaceholderText('Pesquise um pet');
        fireEvent.change(input, { target: { value: 'Rex' } });

        expect(mockOnSearchChange).toHaveBeenCalledWith('Rex');
    });

    it('should have correct id and name attributes', () => {
        const mockOnSearchChange = vi.fn();
        render(
            <SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />
        );

        const input = screen.getByPlaceholderText('Pesquise um pet');
        expect(input).toHaveAttribute('id', 'search-pet');
        expect(input).toHaveAttribute('name', 'search-pet');
    });

    it('should be of type text', () => {
        const mockOnSearchChange = vi.fn();
        render(
            <SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />
        );

        const input = screen.getByPlaceholderText('Pesquise um pet') as HTMLInputElement;
        expect(input.type).toBe('text');
    });

    it('should handle multiple changes', () => {
        const mockOnSearchChange = vi.fn();
        render(
            <SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />
        );

        const input = screen.getByPlaceholderText('Pesquise um pet');

        fireEvent.change(input, { target: { value: 'F' } });
        fireEvent.change(input, { target: { value: 'Fl' } });
        fireEvent.change(input, { target: { value: 'Flu' } });

        expect(mockOnSearchChange).toHaveBeenCalledTimes(3);
        expect(mockOnSearchChange).toHaveBeenNthCalledWith(3, 'Flu');
    });
});
