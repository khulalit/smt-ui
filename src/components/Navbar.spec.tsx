import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Navbar } from './Navbar';
import { describe, expect, test } from 'vitest'

describe('Navbar component', () => {
    test('renders brand and navigation links', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        // Brand
        expect(screen.getByText('PayScale')).toBeInTheDocument();
        expect(screen.getByText('HR')).toBeInTheDocument();

        // Navigation links
        expect(screen.getByRole('link', { name: /Salary Insights/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Employee Directory/i })).toBeInTheDocument();

        // Profile name
        expect(screen.getByText('Sarah Jenkins')).toBeInTheDocument();
        expect(screen.getByText('HR Director')).toBeInTheDocument();
    });
});