import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { EmployeeHeader } from './EmployeeHeader';

describe('EmployeeHeader', () => {
    it('renders heading and description', () => {
        render(<EmployeeHeader onAddClick={vi.fn()} />);

        expect(
            screen.getByRole('heading', {
                name: /employee directory/i,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                /manage your employee profile details, salaries, and region assignments/i
            )
        ).toBeInTheDocument();
    });

    it('renders add employee button', () => {
        render(<EmployeeHeader onAddClick={vi.fn()} />);

        expect(
            screen.getByRole('button', {
                name: /add employee/i,
            })
        ).toBeInTheDocument();
    });

    it('calls onAddClick when button is clicked', async () => {
        const user = userEvent.setup();
        const onAddClick = vi.fn();

        render(<EmployeeHeader onAddClick={onAddClick} />);

        const button = screen.getByRole('button', {
            name: /add employee/i,
        });

        await user.click(button);

        expect(onAddClick).toHaveBeenCalledTimes(1);
    });
});