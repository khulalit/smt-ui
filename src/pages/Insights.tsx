import React, { useState } from 'react';
import { useInsights } from '../hooks/useInsights';
import { GlobalStats } from '../components/GlobalStats';
import { CountrySelect } from '../components/CountrySelect';
import { CountryBenchmarkCard } from '../components/CountryBenchmarkCard';
import { JobTitleTable } from '../components/JobTitleTable';
import { formatCurrency } from '../utils/format';

export const InsightsDashboard: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<string>('United States');

    const { data: insights, isFetching, error } = useInsights();

    if (isFetching) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!insights) return <div>No data</div>;

    // Compute overall global stats
    const totalEmployees = insights.global?.totalCount;
    const totalPayroll = insights.global.totalPayroll;
    const averageGlobalSalary = insights.global.avgSalary;

    // Map API response to component-friendly structures
    const countryMetrics = insights.byCountry?.map((c) => ({
        country: c.country,
        minSalary: c.minSalary,
        maxSalary: c.maxSalary,
        avgSalary: c.avgSalary,
        headcount: c.headcount,
        totalPayroll: c.totalPayroll,
    })) ?? [];

    const activeCountryMetric =
        countryMetrics.find((m) => m.country === selectedCountry) ||
        countryMetrics[0] ||
        {
            country: selectedCountry,
            minSalary: 0,
            maxSalary: 0,
            avgSalary: 0,
            headcount: 0,
            totalPayroll: 0,
        };

    const jobMetrics = insights.byJobTitle.map((title) => ({
        jobTitle: title.jobTitle,
        avgSalary: title.avgSalary,
        headcount: title.headcount,
    })) || [];

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Salary Insights Dashboard
                    </h1>
                    <p className="mt-1.5 text-sm text-slate-500">
                        Payroll analytics, country salary distributions, and role benchmarking.
                    </p>
                </div>
                {/* Global Select Country */}
                <CountrySelect
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    countryMetrics={countryMetrics}
                />
            </div>

            {/* Global Quick Stats */}
            <GlobalStats
                totalEmployees={totalEmployees}
                totalPayroll={totalPayroll}
                averageGlobalSalary={averageGlobalSalary}
                selectedCountry={selectedCountry}
                countryHeadCount={activeCountryMetric.headcount}
            />

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Country Benchmarking Card */}
                <CountryBenchmarkCard
                    activeCountryMetric={activeCountryMetric}
                    totalEmployees={totalEmployees}
                />
                {/* Job Title Averages Card */}
                <JobTitleTable jobMetrics={jobMetrics} />
            </div>

            {/* Global Country Matrix */}
            <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
                <h3 className="mb-6 text-lg font-bold text-slate-900">Global Regions Comparison Matrix</h3>
                <div className="overflow-x-auto border border-slate-100 rounded-xl">
                    <table className="min-w-full divide-y divide-slate-100 text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-600">Country</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-600">Headcount</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-600">Min Salary</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-600">Average Salary</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-600">Max Salary</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-600">Total Annual Payroll</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {countryMetrics.map((metric) => (
                                <tr
                                    key={metric.country}
                                    className={`hover:bg-slate-50 transition-colors duration-150 cursor-pointer $${metric.country === selectedCountry ? 'bg-indigo-50/30' : ''
                                        }`}
                                    onClick={() => setSelectedCountry(metric.country)}
                                >
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-800 flex items-center gap-2">
                                        <span
                                            className={`inline-block h-2.5 w-2.5 rounded-full $${metric.country === selectedCountry ? 'bg-indigo-600' : 'bg-slate-300'
                                                }`}
                                        />
                                        {metric.country}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                                        {metric.headcount.toLocaleString()}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                                        {formatCurrency(metric.minSalary)}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-indigo-600">
                                        {formatCurrency(metric.avgSalary)}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                                        {formatCurrency(metric.maxSalary)}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                                        {formatCurrency(metric.totalPayroll)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
