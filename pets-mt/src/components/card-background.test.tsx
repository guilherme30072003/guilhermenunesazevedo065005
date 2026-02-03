import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardBackground from './card-background';

describe('CardBackground Component', () => {
    it('should render children correctly', () => {
        render(
            <CardBackground>
                <div>Test Content</div>
            </CardBackground>
        );
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <CardBackground className="custom-bg">
                Content
            </CardBackground>
        );

        const element = container.querySelector('.custom-bg');
        expect(element).toBeInTheDocument();
    });

    it('should render with background styling', () => {
        const { container } = render(
            <CardBackground>
                Content
            </CardBackground>
        );

        const card = container.firstChild;
        expect(card).toHaveClass('bg-gray-800');
    });
});
