import { apiClient } from './client';

export type InsightsResponse = {
    totalEmployees: number;
    activeEmployees: number;
    departments: number;
};

export function getInsights() {
    return apiClient<InsightsResponse>('/insights');
}