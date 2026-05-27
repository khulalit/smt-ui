import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

//
// REQUEST INTERCEPTOR
//
apiClient.interceptors.request.use(
    (config) => {
        // attach auth token

        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//
// RESPONSE INTERCEPTOR
//
apiClient.interceptors.response.use(
    (response) => {
        // directly return data if preferred
        return response;
    },

    async (error) => {
        //
        // Handle global API errors here
        //

        if (error.response?.status === 401) {
            //
            // EXAMPLE:
            // logout user
            // redirect to login
            //

            localStorage.removeItem('token');

            // window.location.href = '/login';
        }

        //
        // Normalize error message
        //

        const message =
            error.response?.data?.message ||
            error.message ||
            'Something went wrong';

        return Promise.reject(new Error(message));
    }
);