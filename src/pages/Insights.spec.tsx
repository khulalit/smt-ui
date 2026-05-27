// InsightsDashboard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { InsightsDashboard } from './Insights';
import { useInsights } from '../hooks/useInsights';

vi.mock('../hooks/useInsights', () => ({
  useInsights: vi.fn(),
}));

describe('InsightsDashboard', () => {
  const mockInsights = {
    global: {
      totalCount: 100,
      totalPayroll: 10000000,
      avgSalary: 100000,
    },
    byCountry: [
      {
        country: 'United States',
        minSalary: 50000,
        maxSalary: 200000,
        avgSalary: 120000,
        headcount: 60,
        totalPayroll: 7200000,
      },
      {
        country: 'India',
        minSalary: 10000,
        maxSalary: 80000,
        avgSalary: 40000,
        headcount: 40,
        totalPayroll: 1600000,
      },
    ],
    byJobTitle: [
      {
        jobTitle: 'Frontend Engineer',
        avgSalary: 120000,
        headcount: 20,
      },
      {
        jobTitle: 'Backend Engineer',
        avgSalary: 140000,
        headcount: 15,
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    (useInsights as any).mockReturnValue({
      data: null,
      isFetching: true,
      error: null,
    });

    render(<InsightsDashboard />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useInsights as any).mockReturnValue({
      data: null,
      isFetching: false,
      error: {
        message: 'Something went wrong',
      },
    });

    render(<InsightsDashboard />);

    expect(
      screen.getByText(/error: something went wrong/i)
    ).toBeInTheDocument();
  });

  it('renders no data state', () => {
    (useInsights as any).mockReturnValue({
      data: null,
      isFetching: false,
      error: null,
    });

    render(<InsightsDashboard />);

    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  it('renders dashboard heading', () => {
    (useInsights as any).mockReturnValue({
      data: mockInsights,
      isFetching: false,
      error: null,
    });

    render(<InsightsDashboard />);

    expect(
      screen.getByText(/salary insights dashboard/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /payroll analytics, country salary distributions/i
      )
    ).toBeInTheDocument();
  });

  it('renders global stats', () => {
    (useInsights as any).mockReturnValue({
      data: mockInsights,
      isFetching: false,
      error: null,
    });

    render(<InsightsDashboard />);

    expect(
      screen.getByText(/total global headcount/i)
    ).toBeInTheDocument();

    expect(screen.getByText('100')).toBeInTheDocument();

    expect(screen.getByText(/\$10,000,000/i)).toBeInTheDocument();
  });

  it('renders country select dropdown', () => {
    (useInsights as any).mockReturnValue({
      data: mockInsights,
      isFetching: false,
      error: null,
    });

    render(<InsightsDashboard />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders country benchmark card', () => {
    (useInsights as any).mockReturnValue({
      data: mockInsights,
      isFetching: false,
      error: null,
    });

    render(<InsightsDashboard />);

    expect(
      screen.getByText(/country benchmark/i)
    ).toBeInTheDocument();
  });

  it('renders job title table', () => {
    (useInsights as any).mockReturnValue({
      data: mockInsights,
      isFetching: false,
      error: null,
    });

    render(<InsightsDashboard />);

    expect(
      screen.getByText(/frontend engineer/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/backend engineer/i)
    ).toBeInTheDocument();
  });

  it('renders global regions comparison matrix', () => {
    (useInsights as any).mockReturnValue({
      data: mockInsights,
      isFetching: false,
      error: null,
    });

    render(<InsightsDashboard />);

    expect(
      screen.getByText(/global regions comparison matrix/i)
    ).toBeInTheDocument();

    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('India')).toBeInTheDocument();
  });

  it('changes selected country from dropdown', async () => {
    const user = userEvent.setup();

    (useInsights as any).mockReturnValue({
      data: mockInsights,
      isFetching: false,
      error: null,
    });

    render(<InsightsDashboard />);

    const select = screen.getByRole('combobox');

    await user.selectOptions(select, 'India');

    expect(
      (select as HTMLSelectElement).value
    ).toBe('India');
  });

  it('updates country benchmark values after country change', async () => {
    const user = userEvent.setup();

    (useInsights as any).mockReturnValue({
      data: mockInsights,
      isFetching: false,
      error: null,
    });

    render(<InsightsDashboard />);

    expect(screen.getByText('$120,000')).toBeInTheDocument();

    const select = screen.getByRole('combobox');

    await user.selectOptions(select, 'India');

    expect(screen.getByText('$40,000')).toBeInTheDocument();
  });

  it('handles empty country metrics gracefully', () => {
    (useInsights as any).mockReturnValue({
      data: {
        global: {
          totalCount: 0,
          totalPayroll: 0,
          avgSalary: 0,
        },
        byCountry: [],
        byJobTitle: [],
      },
      isFetching: false,
      error: null,
    });

    render(<InsightsDashboard />);

    expect(
      screen.getByText(/salary insights dashboard/i)
    ).toBeInTheDocument();
  });

  it('renders table rows for countries', () => {
    (useInsights as any).mockReturnValue({
      data: mockInsights,
      isFetching: false,
      error: null,
    });

    const { container } = render(<InsightsDashboard />);

    const rows = container.querySelectorAll('tbody tr');

    expect(rows.length).toBeGreaterThan(0);
  });

  it('renders all major sections', () => {
    (useInsights as any).mockReturnValue({
      data: mockInsights,
      isFetching: false,
      error: null,
    });

    render(<InsightsDashboard />);

    expect(
      screen.getByText(/country benchmark/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/global regions comparison matrix/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/job title/i)
    ).toBeInTheDocument();
  });
});