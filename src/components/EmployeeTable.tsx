import React from "react";
import { Mail, Calendar, Edit2, Trash2 } from "lucide-react";
import type { Employee } from "../pages/EmployeeDirectory";

interface EmployeeTableProps {
  employees: Employee[];
  onEditClick: (employee: Employee) => void;
  onDeleteClick: (id: string) => void;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onEditClick,
  onDeleteClick,
}) => {
  // Color Coding for Department Badges
  const getDeptBadgeClass = (dept: string) => {
    switch (dept) {
      case "Engineering":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "HR":
        return "bg-purple-50 text-purple-700 border-purple-100";
      case "Sales":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Marketing":
        return "bg-pink-50 text-pink-700 border-pink-100";
      case "Finance":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "Product":
        return "bg-indigo-50 text-indigo-700 border-indigo-100";
      case "Design":
        return "bg-cyan-50 text-cyan-700 border-cyan-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="overflow-hidden rounded-t-2xl border-b border-slate-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-semibold text-slate-600"
              >
                Employee
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-semibold text-slate-600"
              >
                Job Details
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-semibold text-slate-600"
              >
                Department
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-semibold text-slate-600"
              >
                Region
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-semibold text-slate-600"
              >
                Salary
              </th>
              {/* <th scope="col" className="px-6 py-3 text-xs font-semibold text-slate-600 text-right">Actions</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-slate-50 transition-colors duration-150"
                >
                  {/* Name/Email */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-700 font-bold text-sm">
                        {emp.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {emp.fullName}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {emp.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* Job Title / Hire Date */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-slate-800">
                      {emp.jobTitle}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="h-3 w-3" />
                      Hired {new Date(emp.hireDate).toLocaleDateString()}
                    </div>
                  </td>
                  {/* Department Badge */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getDeptBadgeClass(emp.department)}`}
                    >
                      {emp.department}
                    </span>
                  </td>
                  {/* Country */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                    {emp.country}
                  </td>
                  {/* Salary */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-slate-900">
                    {formatCurrency(emp.salary)}
                  </td>
                  {/* Actions */}
                  {/* <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEditClick(emp)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors"
                        title="Edit Employee"
                      >
                        <Edit2 className="h-4.5 w-4.5" />
                      </button>
                      <button
                        onClick={() => onDeleteClick(emp.id)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-red-600 transition-colors"
                        title="Delete Employee"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="text-sm font-medium text-slate-400">
                    No employees found matching the filters.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
