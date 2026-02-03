import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup após cada teste
afterEach(() => {
    cleanup();
});

// Mock de console para evitar spam nos testes
global.console = {
    ...console,
    error: vi.fn(),
    warn: vi.fn(),
};
