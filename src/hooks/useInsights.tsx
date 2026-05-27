import { useQuery } from '@tanstack/react-query';

import { getInsights } from '../api/insights';

export function useInsights() {

    const res = useQuery({
        queryKey: ['insights'],
        queryFn: getInsights,
    });

    return { isFetching: res.isFetching, data: res?.data?.data, error: res.error } as any
}