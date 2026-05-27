import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CountrySelect } from './CountrySelect';

describe('CountrySelect', () => {
    const mockSetSelectedCountry = vi.fn();

    const mockCountryMetrics = [
        {
            country: 'India',
            minSalary: 20000,
            maxSalary: 120000,
            avgSalary: 70000,
            headcount: 25,
            totalPayroll: 1750000,
        },
        {
            country: 'USA',
            minSalary: 50000,
            maxSalary: 250000,
            avgSalary: 140000,
            headcount: 40,
            totalPayroll: 5600000,
        },
    ];

    it('renders select dropdown', () => {
        render(
            <CountrySelect
                selectedCountry="India"
                setSelectedCountry={mockSetSelectedCountry}
                countryMetrics={mockCountryMetrics}
            />
        );

        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders all country options', () => {
        render(
            <CountrySelect
                selectedCountry="India"
                setSelectedCountry={mockSetSelectedCountry}
                countryMetrics={mockCountryMetrics}
            />
        );

        expect(screen.getByRole('option', { name: 'India' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'USA' })).toBeInTheDocument();
    });

    it('shows selected country', () => {
        render(
            <CountrySelect
                selectedCountry="India"
                setSelectedCountry={mockSetSelectedCountry}
                countryMetrics={mockCountryMetrics}
            />
        );

        expect(screen.getByDisplayValue('India')).toBeInTheDocument();
    });

    it('calls setSelectedCountry on selection change', async () => {
        const user = userEvent.setup();

        render(
            <CountrySelect
                selectedCountry="India"
                setSelectedCountry={mockSetSelectedCountry}
                countryMetrics={mockCountryMetrics}
            />
        );

        const select = screen.getByRole('combobox');

        await user.selectOptions(select, 'USA');

        expect(mockSetSelectedCountry).toHaveBeenCalledTimes(1);
        expect(mockSetSelectedCountry).toHaveBeenCalledWith('USA');
    });

    it('renders svg icon', () => {
        const { container } = render(
            <CountrySelect
                selectedCountry="India"
                setSelectedCountry={mockSetSelectedCountry}
                countryMetrics={mockCountryMetrics}
            />
        );

        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders empty options gracefully', () => {
        render(
            <CountrySelect
                selectedCountry=""
                setSelectedCountry={mockSetSelectedCountry}
                countryMetrics={[]}
            />
        );

        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.queryAllByRole('option')).toHaveLength(0);
    });
});