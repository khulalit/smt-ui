import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EmployeePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  indexOfFirstItem: number;
  indexOfLastItem: number;
  onPageChange: (page: number) => void;
}

/**
 * Build an array of page numbers and 'ellipsis' markers.
 * Always shows first page, last page, and a window of ±1 around current.
 */
function getPageRange(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push('ellipsis');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push('ellipsis');

  pages.push(total);
  return pages;
}

export const EmployeePagination: React.FC<EmployeePaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  indexOfFirstItem,
  indexOfLastItem,
  onPageChange
}) => {
  const [goToValue, setGoToValue] = useState('');

  const handleGoTo = () => {
    const page = parseInt(goToValue, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
      setGoToValue('');
    }
  };

  const pages = getPageRange(currentPage, totalPages);

  return (
    <div className="flex items-center justify-between border-t border-slate-100 bg-white px-6 py-4 sm:px-6">
      {/* Mobile Pagination */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="inline-flex items-center text-sm text-slate-500">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Showing{' '}
            <span className="font-semibold text-slate-800">
              {totalItems === 0 ? 0 : indexOfFirstItem + 1}
            </span>{' '}
            to{' '}
            <span className="font-semibold text-slate-800">
              {Math.min(indexOfLastItem, totalItems)}
            </span>{' '}
            of <span className="font-semibold text-slate-800">{totalItems.toLocaleString()}</span> employees
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Page buttons */}
          <nav
            className="inline-flex -space-x-px rounded-lg border border-slate-200 bg-white shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center rounded-l-lg p-2 text-slate-400 hover:bg-slate-50 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {pages.map((p, idx) =>
              p === 'ellipsis' ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="inline-flex items-center px-3 py-2 text-sm text-slate-400 select-none"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`inline-flex items-center px-3.5 py-2 text-sm font-medium transition-colors ${
                    currentPage === p
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              )
            )}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex items-center rounded-r-lg p-2 text-slate-400 hover:bg-slate-50 disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>

          {/* Go to page — only shown when there are many pages */}
          {totalPages > 7 && (
            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <span>Go to</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={goToValue}
                onChange={(e) => setGoToValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleGoTo();
                }}
                placeholder={String(currentPage)}
                className="w-16 rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-center text-sm text-slate-700 focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                onClick={handleGoTo}
                className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
              >
                Go
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
