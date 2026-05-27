import React from 'react';
import { formatCurrency } from '../utils/format';

type JobTitleMetric = {
  jobTitle: string;
  avgSalary: number;
  headcount: number;
};

type Props = {
  jobMetrics: JobTitleMetric[];
};

export const JobTitleTable: React.FC<Props> = ({ jobMetrics }) => {
  if (!jobMetrics || jobMetrics.length === 0) return <p>No job data available.</p>;

  const maxAvg = Math.max(...jobMetrics.map((j) => j.avgSalary));

  return (
    <div className="overflow-hidden border border-slate-100 rounded-xl col-span-2">
      <table className="min-w-full divide-y divide-slate-100 text-left">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-xs font-semibold text-slate-600">Job Title</th>
            <th className="px-4 py-3 text-xs font-semibold text-slate-600">Avg Annual Salary</th>
            <th className="px-4 py-3 text-xs font-semibold text-slate-600">Headcount</th>
            <th className="px-4 py-3 text-xs font-semibold text-slate-600">Benchmark Spread</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {jobMetrics.map((jm, index) => {
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
  );
};
