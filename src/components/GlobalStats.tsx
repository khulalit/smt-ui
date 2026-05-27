import React from 'react';
import { formatCurrency } from '../utils/format';

interface GlobalStatsProps {
  totalEmployees: number;
  totalPayroll: number;
  averageGlobalSalary: number;
  selectedCountry: string;
  countryHeadCount: number;
}

export const GlobalStats: React.FC<GlobalStatsProps> = ({ totalEmployees, totalPayroll, averageGlobalSalary, selectedCountry, countryHeadCount }) => (
  <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
    {/* KPI 1 */}
    <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-100 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium text-slate-500">Total Global Headcount</span>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{totalEmployees.toLocaleString()}</h3>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
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
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{formatCurrency(totalPayroll)}</h3>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z" /></svg>
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
      </div>
      <div className='mt-4 text-sm text-white/80'>
        HeadCoun: <span>{countryHeadCount}</span>
      </div>
    </div>
  </div>
);
