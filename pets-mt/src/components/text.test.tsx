import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Text from './text';

describe('Text Component', () => {
    it('should render with default variant', () => {
        render(
            <Text variant="default">
                Hello World
            </Text>
        );
        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('should render as h1 when as="h1"', () => {
        render(
            <Text as="h1" variant="blast">
                Title
            </Text>
        );
        const heading = screen.getByText('Title');
        expect(heading.tagName).toBe('H1');
    });

    it('should render as h2 when as="h2"', () => {
        render(
            <Text as="h2" variant="heading">
                Subtitle
            </Text>
        );
        const heading = screen.getByText('Subtitle');
        expect(heading.tagName).toBe('H2');
    });

    it('should render as span when as="span"', () => {
        render(
            <Text as="span" variant="muted">
                Secondary Text
            </Text>
        );
        const span = screen.getByText('Secondary Text');
        expect(span.tagName).toBe('SPAN');
    });

    it('should render as div by default', () => {
        render(
            <Text variant="default">
                Default Element
            </Text>
        );
        const element = screen.getByText('Default Element');
        expect(element.tagName).toBe('DIV');
    });

    it('should apply custom className', () => {
        render(
            <Text variant="default" className="custom-class">
                Custom Text
            </Text>
        );
        const element = screen.getByText('Custom Text');
        expect(element).toHaveClass('custom-class');
    });

    it('should render children correctly', () => {
        render(
            <Text variant="heading">
                Parent <span>Child</span>
            </Text>
        );
        expect(screen.getByText('Parent')).toBeInTheDocument();
        expect(screen.getByText('Child')).toBeInTheDocument();
    });

    it('should apply variant classes', () => {
        render(
            <Text variant="blast">
                Blast Text
            </Text>
        );
        const element = screen.getByText('Blast Text');
        expect(element).toHaveClass('text-3xl');
    });
});
