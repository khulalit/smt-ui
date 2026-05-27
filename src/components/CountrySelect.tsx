import { Globe } from 'lucide-react';
import React from 'react';

type CountryMetric = {
  country: string;
  minSalary: number;
  maxSalary: number;
  avgSalary: number;
  headcount: number;
  totalPayroll: number;
};

interface Props {
  selectedCountry: string;
  setSelectedCountry: (c: string) => void;
  countryMetrics: CountryMetric[];
}

export const CountrySelect: React.FC<Props> = ({ selectedCountry, setSelectedCountry, countryMetrics }) => (
  <div className="flex items-center gap-2">
    <Globe className="h-4.5 w-4.5 text-indigo-500" />
    <select
      value={selectedCountry}
      onChange={(e) => setSelectedCountry(e.target.value)}
      className="rounded-lg border-slate-200 bg-white py-2 pl-3 pr-10 text-sm font-medium text-slate-700 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
    >
      {countryMetrics.map((m) => (
        <option key={m.country} value={m.country}>
          {m.country}
        </option>
      ))}
    </select>
  </div>
);
