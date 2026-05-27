import { useQuery } from '@tanstack/react-query';

import type { EmployeeFilters } from '../api/employees';
import { getEmployees } from '../api/employees';

export function useEmployees(
    filters: EmployeeFilters
) {
    return useQuery({
        queryKey: ['employees', filters],
        queryFn: () => getEmployees(filters),

        // prevents table flicker on pagination
        placeholderData: (previousData) => previousData,
    });
}