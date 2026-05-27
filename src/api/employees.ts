import { apiClient } from './client';

export type Employee = {
    id: string;
    name: string;
    department: string;
    status: string;
};

export type EmployeesResponse = {
    data: Employee[];
    total: number;
    page: number;
    limit: number;
};

export type EmployeeFilters = {
    search?: string;
    department?: string;
    status?: string;
    page?: number;
    limit?: number;
};

export async function getEmployees(
    filters: EmployeeFilters
) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
            params.append(key, String(value));
        }
    });

    return apiClient<EmployeesResponse>(
        `/employees?${params.toString()}`
    );
}

export async function createEmployee(
    payload: {
        name: string;
        department: string;
    }
) {
    return apiClient('/employees', {
        method: 'POST',
        data: payload,
    });
}