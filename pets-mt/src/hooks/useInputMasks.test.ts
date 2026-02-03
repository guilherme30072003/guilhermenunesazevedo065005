import { describe, it, expect } from 'vitest';
import { useInputMasks } from './useInputMasks';

describe('useInputMasks', () => {
    const { maskPhone, maskCPF } = useInputMasks();

    describe('maskPhone', () => {
        it('should return empty string for empty input', () => {
            expect(maskPhone('')).toBe('');
        });

        it('should format phone number with 10 digits (landline)', () => {
            const result = maskPhone('1140001234');
            expect(result).toBe('(11) 4000-1234');
        });

        it('should format phone number with 11 digits (mobile)', () => {
            const result = maskPhone('11999887766');
            expect(result).toBe('(11) 99988-7766');
        });

        it('should ignore non-digit characters', () => {
            const result = maskPhone('(11) 9998-87766');
            expect(result).toBe('(11) 99988-7766');
        });

        it('should handle partial input', () => {
            const result = maskPhone('119');
            expect(result).toBe('(11) 9');
        });
    });

    describe('maskCPF', () => {
        it('should return empty string for empty input', () => {
            expect(maskCPF('')).toBe('');
        });

        it('should format CPF correctly', () => {
            const result = maskCPF('12345678901');
            expect(result).toBe('123.456.789-01');
        });

        it('should ignore non-digit characters', () => {
            const result = maskCPF('123.456.789-01');
            expect(result).toBe('123.456.789-01');
        });

        it('should handle partial input', () => {
            const result = maskCPF('123');
            expect(result).toBe('123');
        });

        it('should handle 4 digits', () => {
            const result = maskCPF('1234');
            expect(result).toBe('123.4');
        });

        it('should handle 7 digits', () => {
            const result = maskCPF('1234567');
            expect(result).toBe('123.456.7');
        });
    });
});
