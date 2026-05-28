import React from 'react';
import { X, Plus, Edit2, User, Mail, Briefcase, Building, Globe, DollarSign, Calendar } from 'lucide-react';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalMode: 'add' | 'edit';
  formData: {
    fullName: string;
    email: string;
    jobTitle: string;
    department: string;
    country: string;
    salary: string;
    hireDate: string;
  };
  formErrors: Record<string, string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  departments: string[];
  countries: string[];
}

export const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  onClose,
  modalMode,
  formData,
  formErrors,
  onInputChange,
  onSubmit,
  departments,
  countries
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-slate-100 transition-all duration-300">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>

          <h3 className="text-xl font-bold text-slate-950 flex items-center gap-2 mb-6">
            {modalMode === 'add' ? (
              <>
                <Plus className="h-5.5 w-5.5 text-indigo-600" /> Add New Employee
              </>
            ) : (
              <>
                <Edit2 className="h-5 w-5 text-indigo-600" /> Edit Employee Details
              </>
            )}
          </h3>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-4.5 w-4.5 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={onInputChange}
                  placeholder="e.g. John Doe"
                  className={`w-full rounded-lg border py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    formErrors.fullName ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'
                  }`}
                />
              </div>
              {formErrors.fullName && (
                <span className="text-xs text-red-500 mt-1 block">{formErrors.fullName}</span>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4.5 w-4.5 text-slate-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onInputChange}
                  placeholder="e.g. john.doe@company.com"
                  className={`w-full rounded-lg border py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    formErrors.email ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'
                  }`}
                />
              </div>
              {formErrors.email && (
                <span className="text-xs text-red-500 mt-1 block">{formErrors.email}</span>
              )}
            </div>

            {/* Grid layout for Title & Department */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Job Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Job Title
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Briefcase className="h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={onInputChange}
                    placeholder="e.g. Software Engineer"
                    className={`w-full rounded-lg border py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                      formErrors.jobTitle ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'
                    }`}
                  />
                </div>
                {formErrors.jobTitle && (
                  <span className="text-xs text-red-500 mt-1 block">{formErrors.jobTitle}</span>
                )}
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Department
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Building className="h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={onInputChange}
                    className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-10 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Grid layout for Country & Salary */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Country */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Region / Country
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Globe className="h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={onInputChange}
                    className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-10 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none"
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Salary */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Annual Salary (USD)
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <DollarSign className="h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={onInputChange}
                    placeholder="e.g. 85000"
                    className={`w-full rounded-lg border py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                      formErrors.salary ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'
                    }`}
                  />
                </div>
                {formErrors.salary && (
                  <span className="text-xs text-red-500 mt-1 block">{formErrors.salary}</span>
                )}
              </div>
            </div>

            {/* Hire Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Hire Date
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Calendar className="h-4.5 w-4.5 text-slate-400" />
                </div>
                <input
                  type="date"
                  name="hireDate"
                  value={formData.hireDate}
                  onChange={onInputChange}
                  className={`w-full rounded-lg border py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    formErrors.hireDate ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'
                  }`}
                />
              </div>
              {formErrors.hireDate && (
                <span className="text-xs text-red-500 mt-1 block">{formErrors.hireDate}</span>
              )}
            </div>

            {/* Form Actions */}
            <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 transition-all duration-200 focus:outline-none"
              >
                {modalMode === 'add' ? 'Save Employee' : 'Update Details'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
