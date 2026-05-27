import React from 'react';
import { formatCurrency } from '../utils/format';

type CountryMetric = {
  country: string;
  minSalary: number;
  maxSalary: number;
  avgSalary: number;
  headcount: number;
  totalPayroll: number;
};

type Props = {
  activeCountryMetric: CountryMetric;
  totalEmployees: number;
};

export const CountryBenchmarkCard: React.FC<Props> = ({ activeCountryMetric, totalEmployees }) => (
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
        {/* Micro visualizer chart for salary spread */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-400 uppercase font-medium block mb-2">
            Salary Spread Visualizer
          </span>
          <div className="relative h-6 w-full rounded-full bg-slate-100 overflow-hidden flex items-center">
            <div className="absolute left-[15%] right-[20%] h-3 rounded-full bg-indigo-500/20 border border-indigo-500/30" />
            <div className="absolute left-[45%] h-5 w-1 rounded-full bg-indigo-600 shadow" />
            <span className="absolute left-2 text-[9px] font-bold text-slate-400">
              {formatCurrency(activeCountryMetric.minSalary)}
            </span>
            <span className="absolute right-2 text-[9px] font-bold text-slate-400">
              {formatCurrency(activeCountryMetric.maxSalary)}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 text-center">
            Bar represents minimum to maximum range. Center line is the average.
          </p>
        </div>
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 text-xs text-indigo-200">
      <span>Headcount: <b>{activeCountryMetric.headcount}</b></span>
      <span>•</span>
      <span>Share: <b>{Math.round((activeCountryMetric.headcount / totalEmployees) * 100)}%</b></span>
    </div>
  </div>
);
