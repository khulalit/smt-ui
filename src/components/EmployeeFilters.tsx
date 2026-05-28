import React from 'react';
import { Search, Filter } from 'lucide-react';

interface EmployeeFiltersProps {
  setSearchTerm: (term: string) => void;
  selectedDept: string;
  setSelectedDept: (dept: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  departments: string[];
  countries: string[];
}

export const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({
  setSearchTerm,
  selectedDept,
  setSelectedDept,
  selectedCountry,
  setSelectedCountry,
  departments,
  countries,
}) => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 rounded-2xl bg-white p-4 shadow-sm border border-slate-100 md:grid-cols-4">
      {/* Search Bar */}
      <div className="relative md:col-span-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4.5 w-4.5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search name, job title, email..."
          onChange={(e) => {
            console.log(e.target.value)
            setSearchTerm(e.target.value);

          }}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all duration-155"
        />
      </div>

      {/* Filter Department */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Filter className="h-4 w-4 text-slate-400" />
        </div>
        <select
          value={selectedDept}
          onChange={(e) => {
            setSelectedDept(e.target.value);
          }}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-700 focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all duration-155 appearance-none"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Filter Country */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Filter className="h-4 w-4 text-slate-400" />
        </div>
        <select
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
          }}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-700 focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all duration-155 appearance-none"
        >
          <option value="">All Regions</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
