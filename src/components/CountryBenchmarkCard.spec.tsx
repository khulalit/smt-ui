import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CountryBenchmarkCard } from './CountryBenchmarkCard';

describe('CountryBenchmarkCard', () => {
    const mockProps = {
        activeCountryMetric: {
            country: 'India',
            minSalary: 20000,
            maxSalary: 120000,
            avgSalary: 70000,
            headcount: 25,
            totalPayroll: 1750000,
        },
        totalEmployees: 100,
    };

    it('renders country benchmark heading', () => {
        render(<CountryBenchmarkCard {...mockProps} />);

        expect(screen.getByText(/country benchmark/i)).toBeInTheDocument();
    });

    it('renders average salary', () => {
        render(<CountryBenchmarkCard {...mockProps} />);

        expect(screen.getByText(/\$70,000/i)).toBeInTheDocument();
    });

    it('renders maximum salary', () => {
        render(<CountryBenchmarkCard {...mockProps} />);

        expect(screen.getByText(/\$120,000/i)).toBeInTheDocument();
    });

    it('renders minimum salary', () => {
        render(<CountryBenchmarkCard {...mockProps} />);

        expect(screen.getByText(/\$20,000/i)).toBeInTheDocument();
    });

    it('renders total payroll', () => {
        render(<CountryBenchmarkCard {...mockProps} />);

        expect(screen.getByText(/\$1,750,000/i)).toBeInTheDocument();
    });

    it('renders headcount correctly', () => {
        render(<CountryBenchmarkCard {...mockProps} />);

        expect(screen.getByText(/headcount:/i)).toBeInTheDocument();
        expect(screen.getByText('25')).toBeInTheDocument();
    });

    it('renders employee share percentage correctly', () => {
        render(<CountryBenchmarkCard {...mockProps} />);

        expect(screen.getByText(/share:/i)).toBeInTheDocument();
        expect(screen.getByText('25%')).toBeInTheDocument();
    });

    it('renders salary spread visualizer section', () => {
        render(<CountryBenchmarkCard {...mockProps} />);

        expect(
            screen.getByText(/salary spread visualizer/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                /bar represents minimum to maximum range/i
            )
        ).toBeInTheDocument();
    });

    it('renders USD label', () => {
        render(<CountryBenchmarkCard {...mockProps} />);

        expect(screen.getByText('USD')).toBeInTheDocument();
    });
});
