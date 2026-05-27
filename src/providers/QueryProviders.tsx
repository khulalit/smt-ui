import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 1000 * 60, // 1 minute
            refetchOnWindowFocus: false,
        },
    },
});

type Props = {
    children: React.ReactNode;
};

export const QueryProvider = ({ children }: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};