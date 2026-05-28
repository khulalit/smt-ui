// EmployeeTable.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { EmployeeTable } from './EmployeeTable';

const mockEmployees = [
    {
        id: '1',
        fullName: 'John Doe',
        email: 'john@example.com',
        jobTitle: 'Frontend Developer',
        department: 'Engineering',
        country: 'India',
        salary: 120000,
        hireDate: '2024-01-15',
    },
    {
        id: '2',
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        jobTitle: 'HR Manager',
        department: 'HR',
        country: 'USA',
        salary: 95000,
        hireDate: '2023-05-20',
    },
];

describe('EmployeeTable', () => {
    it('renders table headers', () => {
        render(
            <EmployeeTable
                employees={mockEmployees}
                onEditClick={vi.fn()}
                onDeleteClick={vi.fn()}
            />
        );

        expect(screen.getByText(/employee/i)).toBeInTheDocument();
        expect(screen.getByText(/job details/i)).toBeInTheDocument();
        expect(screen.getByText(/department/i)).toBeInTheDocument();
        expect(screen.getByText(/region/i)).toBeInTheDocument();
        expect(screen.getByText(/salary/i)).toBeInTheDocument();
        expect(screen.getByText(/actions/i)).toBeInTheDocument();
    });

    it('renders employee data correctly', () => {
        render(
            <EmployeeTable
                employees={mockEmployees}
                onEditClick={vi.fn()}
                onDeleteClick={vi.fn()}
            />
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
        expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
        expect(screen.getByText('Engineering')).toBeInTheDocument();
        expect(screen.getByText('India')).toBeInTheDocument();

        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });

    it('formats salary correctly', () => {
        render(
            <EmployeeTable
                employees={mockEmployees}
                onEditClick={vi.fn()}
                onDeleteClick={vi.fn()}
            />
        );

        expect(screen.getByText('$120,000')).toBeInTheDocument();
        expect(screen.getByText('$95,000')).toBeInTheDocument();
    });

    it('renders employee initials correctly', () => {
        render(
            <EmployeeTable
                employees={mockEmployees}
                onEditClick={vi.fn()}
                onDeleteClick={vi.fn()}
            />
        );

        expect(screen.getByText('JD')).toBeInTheDocument();
        expect(screen.getByText('JS')).toBeInTheDocument();
    });

    it('calls onEditClick when edit button is clicked', async () => {
        const user = userEvent.setup();
        const onEditClick = vi.fn();

        render(
            <EmployeeTable
                employees={mockEmployees}
                onEditClick={onEditClick}
                onDeleteClick={vi.fn()}
            />
        );

        const editButtons = screen.getAllByTitle(/edit employee/i);

        await user.click(editButtons[0]);

        expect(onEditClick).toHaveBeenCalledTimes(1);
        expect(onEditClick).toHaveBeenCalledWith(mockEmployees[0]);
    });

    it('calls onDeleteClick when delete button is clicked', async () => {
        const user = userEvent.setup();
        const onDeleteClick = vi.fn();

        render(
            <EmployeeTable
                employees={mockEmployees}
                onEditClick={vi.fn()}
                onDeleteClick={onDeleteClick}
            />
        );

        const deleteButtons = screen.getAllByTitle(/delete employee/i);

        await user.click(deleteButtons[0]);

        expect(onDeleteClick).toHaveBeenCalledTimes(1);
        expect(onDeleteClick).toHaveBeenCalledWith('1');
    });

    it('shows empty state when no employees are available', () => {
        render(
            <EmployeeTable
                employees={[]}
                onEditClick={vi.fn()}
                onDeleteClick={vi.fn()}
            />
        );

        expect(
            screen.getByText(/no employees found matching the filters/i)
        ).toBeInTheDocument();
    });
});