// EmployeeFilters.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { EmployeeFilters } from './EmployeeFilters';

describe('EmployeeFilters', () => {
    const defaultProps = {
        setSearchTerm: vi.fn(),
        selectedDept: '',
        setSelectedDept: vi.fn(),
        selectedCountry: '',
        setSelectedCountry: vi.fn(),
        departments: ['Engineering', 'HR', 'Marketing'],
        countries: ['India', 'USA', 'Germany'],
    };

    it('renders all filter inputs', () => {
        render(<EmployeeFilters {...defaultProps} />);

        expect(
            screen.getByPlaceholderText(/search name, job title, email/i)
        ).toBeInTheDocument();

        expect(
            screen.getByRole('option', { name: /all departments/i })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('option', { name: /all regions/i })
        ).toBeInTheDocument();
    });

    it('calls setSearchTerm when typing in search input', async () => {
        const user = userEvent.setup();

        render(<EmployeeFilters {...defaultProps} />);

        const input = screen.getByPlaceholderText(
            /search name, job title, email/i
        );

        await user.type(input, 'Lalit');

        expect(defaultProps.setSearchTerm).toHaveBeenCalled();
        expect(defaultProps.setSearchTerm).toHaveBeenLastCalledWith('Lalit');
    });

    it('calls setSelectedDept when department changes', async () => {
        const user = userEvent.setup();

        render(<EmployeeFilters {...defaultProps} />);

        const selects = screen.getAllByRole('combobox');
        const departmentSelect = selects[0];

        await user.selectOptions(departmentSelect, 'Engineering');

        expect(defaultProps.setSelectedDept).toHaveBeenCalledWith(
            'Engineering'
        );
    });

    it('calls setSelectedCountry when country changes', async () => {
        const user = userEvent.setup();

        render(<EmployeeFilters {...defaultProps} />);

        const selects = screen.getAllByRole('combobox');
        const countrySelect = selects[1];

        await user.selectOptions(countrySelect, 'India');

        expect(defaultProps.setSelectedCountry).toHaveBeenCalledWith(
            'India'
        );
    });

    it('renders department options correctly', () => {
        render(<EmployeeFilters {...defaultProps} />);

        defaultProps.departments.forEach((dept) => {
            expect(
                screen.getByRole('option', { name: dept })
            ).toBeInTheDocument();
        });
    });

    it('renders country options correctly', () => {
        render(<EmployeeFilters {...defaultProps} />);

        defaultProps.countries.forEach((country) => {
            expect(
                screen.getByRole('option', { name: country })
            ).toBeInTheDocument();
        });
    });
});