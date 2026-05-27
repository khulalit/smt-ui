import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { JobTitleTable } from './JobTitleTable';

describe('JobTitleTable', () => {
    const mockJobMetrics = [
        {
            jobTitle: 'Frontend Engineer',
            avgSalary: 120000,
            headcount: 20,
        },
        {
            jobTitle: 'Backend Engineer',
            avgSalary: 150000,
            headcount: 15,
        },
        {
            jobTitle: 'Product Manager',
            avgSalary: 100000,
            headcount: 10,
        },
    ];

    it('renders table headers', () => {
        render(<JobTitleTable jobMetrics={mockJobMetrics} />);

        expect(screen.getByText(/job title/i)).toBeInTheDocument();
        expect(screen.getByText(/avg annual salary/i)).toBeInTheDocument();
        expect(screen.getByText(/headcount/i)).toBeInTheDocument();
        expect(screen.getByText(/benchmark spread/i)).toBeInTheDocument();
    });

    it('renders all job titles', () => {
        render(<JobTitleTable jobMetrics={mockJobMetrics} />);

        expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
        expect(screen.getByText('Backend Engineer')).toBeInTheDocument();
        expect(screen.getByText('Product Manager')).toBeInTheDocument();
    });

    it('renders formatted salaries', () => {
        render(<JobTitleTable jobMetrics={mockJobMetrics} />);

        expect(screen.getByText('$120,000')).toBeInTheDocument();
        expect(screen.getByText('$150,000')).toBeInTheDocument();
        expect(screen.getByText('$100,000')).toBeInTheDocument();
    });

    it('renders headcount values', () => {
        render(<JobTitleTable jobMetrics={mockJobMetrics} />);

        expect(screen.getByText('20')).toBeInTheDocument();
        expect(screen.getByText('15')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('renders benchmark percentages correctly', () => {
        render(<JobTitleTable jobMetrics={mockJobMetrics} />);

        expect(screen.getByText('100%')).toBeInTheDocument();
        expect(screen.getByText('80%')).toBeInTheDocument();
        expect(screen.getByText('67%')).toBeInTheDocument();
    });

    it('renders progress bars', () => {
        const { container } = render(
            <JobTitleTable jobMetrics={mockJobMetrics} />
        );

        const progressBars = container.querySelectorAll('.bg-indigo-500');

        expect(progressBars.length).toBe(3);
    });

    it('applies correct width to progress bars', () => {
        const { container } = render(
            <JobTitleTable jobMetrics={mockJobMetrics} />
        );

        const progressBars = container.querySelectorAll(
            '.bg-indigo-500'
        ) as NodeListOf<HTMLElement>;

        expect(progressBars[0].style.width).toBe('80%');
        expect(progressBars[1].style.width).toBe('100%');
        expect(progressBars[2].style.width).toBe('66.66666666666666%');
    });

    it('renders empty state when no data is available', () => {
        render(<JobTitleTable jobMetrics={[]} />);

        expect(
            screen.getByText(/no job data available/i)
        ).toBeInTheDocument();
    });

    it('renders empty state when jobMetrics is undefined', () => {
        render(<JobTitleTable jobMetrics={undefined as any} />);

        expect(
            screen.getByText(/no job data available/i)
        ).toBeInTheDocument();
    });

    it('renders correct number of table rows', () => {
        const { container } = render(
            <JobTitleTable jobMetrics={mockJobMetrics} />
        );

        const rows = container.querySelectorAll('tbody tr');

        expect(rows.length).toBe(3);
    });

    it('renders table element', () => {
        render(<JobTitleTable jobMetrics={mockJobMetrics} />);

        expect(screen.getByRole('table')).toBeInTheDocument();
    });
});