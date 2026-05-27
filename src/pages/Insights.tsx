import React, { useState } from 'react';
import { Globe, TrendingUp, DollarSign, Users, Award, BarChart } from 'lucide-react';

interface CountryMetric {
    country: string;
    minSalary: number;
    maxSalary: number;
    avgSalary: number;
    headcount: number;
    totalPayroll: number;
}

interface JobTitleMetric {
    jobTitle: string;
    avgSalary: number;
    headcount: number;
}

// Mock Data for initial load/preview before backend integration is fully loaded
const MOCK_COUNTRY_METRICS: CountryMetric[] = [
    { country: 'United States', minSalary: 62000, maxSalary: 198000, avgSalary: 118500, headcount: 1420, totalPayroll: 168270000 },
    { country: 'Singapore', minSalary: 58000, maxSalary: 182000, avgSalary: 112100, headcount: 980, totalPayroll: 109858000 },
    { country: 'Australia', minSalary: 55000, maxSalary: 175000, avgSalary: 105400, headcount: 1050, totalPayroll: 110670000 },
    { country: 'Germany', minSalary: 52000, maxSalary: 168000, avgSalary: 98700, headcount: 1210, totalPayroll: 119427000 },
    { country: 'Canada', minSalary: 51000, maxSalary: 162000, avgSalary: 97800, headcount: 1150, totalPayroll: 112470000 },
    { country: 'United Kingdom', minSalary: 48000, maxSalary: 155000, avgSalary: 92400, headcount: 1340, totalPayroll: 123816000 },
    { country: 'France', minSalary: 45000, maxSalary: 142000, avgSalary: 86500, headcount: 880, totalPayroll: 76120000 },
    { country: 'Japan', minSalary: 42000, maxSalary: 135000, avgSalary: 81200, headcount: 750, totalPayroll: 60900000 },
    { country: 'Brazil', minSalary: 21000, maxSalary: 68000, avgSalary: 40500, headcount: 620, totalPayroll: 25110000 },
    { country: 'India', minSalary: 18000, maxSalary: 59000, avgSalary: 34800, headcount: 600, totalPayroll: 20880000 }
];

const MOCK_JOB_METRICS: Record<string, JobTitleMetric[]> = {
    'United States': [
        { jobTitle: 'Engineering Manager', avgSalary: 168000, headcount: 45 },
        { jobTitle: 'Senior Product Manager', avgSalary: 148000, headcount: 30 },
        { jobTitle: 'Senior Software Engineer', avgSalary: 138000, headcount: 220 },
        { jobTitle: 'Lead Designer', avgTitleSalary: 132000, avgSalary: 130000, headcount: 25 } as any,
        { jobTitle: 'Product Manager', avgSalary: 108000, headcount: 50 },
        { jobTitle: 'Software Engineer', avgSalary: 96000, headcount: 450 },
        { jobTitle: 'DevOps Engineer', avgSalary: 98000, headcount: 110 },
        { jobTitle: 'QA Engineer', avgSalary: 78000, headcount: 150 }
    ],
    'India': [
        { jobTitle: 'Engineering Manager', avgSalary: 52000, headcount: 18 },
        { jobTitle: 'Senior Product Manager', avgSalary: 46000, headcount: 12 },
        { jobTitle: 'Senior Software Engineer', avgSalary: 41000, headcount: 95 },
        { jobTitle: 'Software Engineer', avgSalary: 28500, headcount: 210 },
        { jobTitle: 'DevOps Engineer', avgSalary: 29000, headcount: 40 },
        { jobTitle: 'QA Engineer', avgSalary: 24000, headcount: 65 }
    ],
    'Germany': [
        { jobTitle: 'Engineering Manager', avgSalary: 142000, headcount: 38 },
        { jobTitle: 'Senior Software Engineer', avgSalary: 118000, headcount: 180 },
        { jobTitle: 'Software Engineer', avgSalary: 82000, headcount: 390 },
        { jobTitle: 'DevOps Engineer', avgSalary: 84000, headcount: 85 },
        { jobTitle: 'QA Engineer', avgSalary: 67000, headcount: 115 }
    ]
};

export const InsightsDashboard: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<string>('United States');

    // Compute overall global stats
    const totalEmployees = MOCK_COUNTRY_METRICS.reduce((sum, item) => sum + item.headcount, 0);
    const totalPayroll = MOCK_COUNTRY_METRICS.reduce((sum, item) => sum + item.totalPayroll, 0);
    const averageGlobalSalary = Math.round(totalPayroll / totalEmployees);

    // Active country calculations
    const activeCountryMetric = MOCK_COUNTRY_METRICS.find(m => m.country === selectedCountry) || MOCK_COUNTRY_METRICS[0];
    const jobMetrics = MOCK_JOB_METRICS[selectedCountry] || MOCK_JOB_METRICS['United States'].map(jm => ({
        ...jm,
        avgSalary: Math.round(jm.avgSalary * (activeCountryMetric.avgSalary / 118500))
    }));

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Salary Insights Dashboard</h1>
                    <p className="mt-1.5 text-sm text-slate-500">
                        Payroll analytics, country salary distributions, and role benchmarking.
                    </p>
                </div>

                {/* Global Select Country */}
                <div className="flex items-center gap-2">
                    <Globe className="h-4.5 w-4.5 text-indigo-500" />
                    <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="rounded-lg border-slate-200 bg-white py-2 pl-3 pr-10 text-sm font-medium text-slate-700 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    >
                        {MOCK_COUNTRY_METRICS.map(m => (
                            <option key={m.country} value={m.country}>
                                {m.country}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Global Quick Stats */}
            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {/* KPI 1 */}
                <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-100 transition-all duration-200 hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-sm font-medium text-slate-500">Total Global Headcount</span>
                            <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                                {totalEmployees.toLocaleString()}
                            </h3>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <Users className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-600">
                        <span className="font-semibold text-emerald-600">Active</span>
                        <span>across 10 global regions</span>
                    </div>
                </div>

                {/* KPI 2 */}
                <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-100 transition-all duration-200 hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-sm font-medium text-slate-500">Annualized Payroll</span>
                            <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                                {formatCurrency(totalPayroll)}
                            </h3>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                            <DollarSign className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-600">
                        <span className="font-semibold text-indigo-600">Avg Global Salary:</span>
                        <span className="font-medium text-slate-900">{formatCurrency(averageGlobalSalary)}</span>
                    </div>
                </div>

                {/* KPI 3 */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-tr from-indigo-900 to-indigo-800 p-6 text-white shadow-lg shadow-indigo-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-sm font-medium text-indigo-200">Active Region Focus</span>
                            <h3 className="mt-2 text-3xl font-bold tracking-tight">{selectedCountry}</h3>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-indigo-200">
                            <Globe className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-indigo-200">
                        <span>Headcount: <b>{activeCountryMetric.headcount}</b></span>
                        <span>•</span>
                        <span>Share: <b>{Math.round((activeCountryMetric.headcount / totalEmployees) * 100)}%</b></span>
                    </div>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Country Benchmarking Card */}
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 lg:col-span-1">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900">Country Benchmark</h3>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">USD</span>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <span className="text-xs text-slate-400 uppercase font-medium">Average Salary</span>
                            <div className="mt-1 flex items-baseline gap-2">
                                <span className="text-4xl font-extrabold tracking-tight text-indigo-600">
                                    {formatCurrency(activeCountryMetric.avgSalary)}
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                    <span className="text-sm font-medium text-slate-600">Maximum Salary</span>
                                </div>
                                <span className="text-sm font-semibold text-slate-900">
                                    {formatCurrency(activeCountryMetric.maxSalary)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                                    <span className="text-sm font-medium text-slate-600">Minimum Salary</span>
                                </div>
                                <span className="text-sm font-semibold text-slate-900">
                                    {formatCurrency(activeCountryMetric.minSalary)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-indigo-500" />
                                    <span className="text-sm font-medium text-slate-600">Total Payroll</span>
                                </div>
                                <span className="text-sm font-semibold text-slate-900">
                                    {formatCurrency(activeCountryMetric.totalPayroll)}
                                </span>
                            </div>
                        </div>

                        {/* Micro visualizer chart for salary spread */}
                        <div className="mt-6 pt-4 border-t border-slate-100">
                            <span className="text-xs text-slate-400 uppercase font-medium block mb-2">Salary Spread Visualizer</span>
                            <div className="relative h-6 w-full rounded-full bg-slate-100 overflow-hidden flex items-center">
                                <div className="absolute left-[15%] right-[20%] h-3 rounded-full bg-indigo-500/20 border border-indigo-500/30" />
                                <div className="absolute left-[45%] h-5 w-1 rounded-full bg-indigo-600 shadow" />
                                <span className="absolute left-2 text-[9px] font-bold text-slate-400">{formatCurrency(activeCountryMetric.minSalary)}</span>
                                <span className="absolute right-2 text-[9px] font-bold text-slate-400">{formatCurrency(activeCountryMetric.maxSalary)}</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-2 text-center">
                                Bar represents minimum to maximum range. Center line is the average.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Job Title Averages Card */}
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 lg:col-span-2">
                    <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <h3 className="text-lg font-bold text-slate-900">Benchmark by Job Title in {selectedCountry}</h3>
                        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                            Sorted by Average Salary
                        </span>
                    </div>

                    <div className="overflow-hidden border border-slate-100 rounded-xl">
                        <table className="min-w-full divide-y divide-slate-100 text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-xs font-semibold text-slate-600">Job Title</th>
                                    <th scope="col" className="px-4 py-3 text-xs font-semibold text-slate-600">Avg Annual Salary</th>
                                    <th scope="col" className="px-4 py-3 text-xs font-semibold text-slate-600">Headcount</th>
                                    <th scope="col" className="px-4 py-3 text-xs font-semibold text-slate-600">Benchmark Spread</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {jobMetrics.map((jm, index) => {
                                    // Percentage of max average salary in the list for visualization
                                    const maxAvg = Math.max(...jobMetrics.map(j => j.avgSalary));
                                    const barWidth = `${(jm.avgSalary / maxAvg) * 100}%`;

                                    return (
                                        <tr key={index} className="hover:bg-slate-50 transition-colors duration-150">
                                            <td className="whitespace-nowrap px-4 py-3.5 text-sm font-semibold text-slate-800">
                                                {jm.jobTitle}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3.5 text-sm font-medium text-slate-900">
                                                {formatCurrency(jm.avgSalary)}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-500">
                                                {jm.headcount}
                                            </td>
                                            <td className="px-4 py-3.5 text-sm text-slate-500 w-1/3">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-2 w-28 rounded-full bg-slate-100 overflow-hidden">
                                                        <div className="h-full rounded-full bg-indigo-500" style={{ width: barWidth }} />
                                                    </div>
                                                    <span className="text-xxs font-medium text-slate-400">
                                                        {Math.round((jm.avgSalary / maxAvg) * 100)}%
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
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
                            {MOCK_COUNTRY_METRICS.map((metric) => (
                                <tr
                                    key={metric.country}
                                    className={`hover:bg-slate-50 transition-colors duration-150 cursor-pointer ${metric.country === selectedCountry ? 'bg-indigo-50/30' : ''
                                        }`}
                                    onClick={() => setSelectedCountry(metric.country)}
                                >
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-800 flex items-center gap-2">
                                        <span className={`inline-block h-2.5 w-2.5 rounded-full ${metric.country === selectedCountry ? 'bg-indigo-600' : 'bg-slate-300'}`} />
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
