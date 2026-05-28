import React from 'react';
import { Plus } from 'lucide-react';

interface EmployeeHeaderProps {
  onAddClick: () => void;
}

export const EmployeeHeader: React.FC<EmployeeHeaderProps> = ({ onAddClick }) => {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Employee Directory</h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Manage your employee profile details, salaries, and region assignments.
        </p>
      </div>
      <div>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          Add Employee
        </button>
      </div>
    </div>
  );
};
