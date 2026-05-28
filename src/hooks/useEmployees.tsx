import { useQuery } from "@tanstack/react-query";

import type { EmployeeFilters } from "../api/employees";
import { getEmployees } from "../api/employees";
import { useDebounce } from "./useDebounce";

export function useEmployees(filters: EmployeeFilters) {
  const { page, limit, name, department, country } = filters;

  // Debounce only search input
  const debouncedName = useDebounce(name, 500);

  const res = useQuery({
    queryKey: ["employees", page, limit, debouncedName, department, country],

    queryFn: () =>
      getEmployees({
        ...filters,
        name: debouncedName,
      }),

    // Prevents UI flicker during pagination
    placeholderData: (previousData) => previousData,
  });

  return {
    isFetching: res.isFetching,
    isLoading: res.isLoading,
    employees: res.data?.data?.data ?? [],
    total: 10000,
    error: res.error,
  };
}
