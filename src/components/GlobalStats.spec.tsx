// GlobalStats.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GlobalStats } from './GlobalStats';

describe('GlobalStats', () => {
    const mockProps = {
        totalEmployees: 1250,
        totalPayroll: 150000000,
        averageGlobalSalary: 120000,
    };

    it('renders total global headcount section', () => {
        render(<GlobalStats {...mockProps} />);

        expect(
            screen.getByText(/total global headcount/i)
        ).toBeInTheDocument();

        expect(screen.getByText('1,250')).toBeInTheDocument();
    });

    it('renders annualized payroll section', () => {
        render(<GlobalStats {...mockProps} />);

        expect(
            screen.getByText(/annualized payroll/i)
        ).toBeInTheDocument();

        expect(screen.getByText(/\$150,000,000/i)).toBeInTheDocument();
    });

    it('renders average global salary', () => {
        render(<GlobalStats {...mockProps} />);

        expect(
            screen.getByText(/avg global salary:/i)
        ).toBeInTheDocument();

        expect(screen.getByText(/\$120,000/i)).toBeInTheDocument();
    });

    it('renders active region focus section', () => {
        render(<GlobalStats {...mockProps} />);

        expect(
            screen.getByText(/active region focus/i)
        ).toBeInTheDocument();
    });

    it('renders active status text', () => {
        render(<GlobalStats {...mockProps} />);

        expect(screen.getByText(/active/i)).toBeInTheDocument();

        expect(
            screen.getByText(/across 10 global regions/i)
        ).toBeInTheDocument();
    });

    it('renders all three KPI cards', () => {
        const { container } = render(<GlobalStats {...mockProps} />);

        const cards = container.querySelectorAll('.rounded-2xl');

        expect(cards.length).toBeGreaterThanOrEqual(3);
    });

    it('renders svg icons', () => {
        const { container } = render(<GlobalStats {...mockProps} />);

        const icons = container.querySelectorAll('svg');

        expect(icons.length).toBe(3);
    });

    it('formats zero values correctly', () => {
        render(
            <GlobalStats
                totalEmployees={0}
                totalPayroll={0}
                averageGlobalSalary={0}
            />
        );

        expect(screen.getByText('0')).toBeInTheDocument();

        const currencyValues = screen.getAllByText('$0');
        expect(currencyValues.length).toBeGreaterThanOrEqual(2);
    });
});