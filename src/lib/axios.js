import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
    // Do something before request is sent
    async (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    // Do something with request error
    (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    (response) => response,
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                const response = await axiosInstance.post("/auth/refresh-token", {
                    refreshToken,
                });
                const { token, refreshToken: newRefreshToken } = response.data.data;
                localStorage.setItem("token", token);
                localStorage.setItem("refreshToken", newRefreshToken);
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                // originalRequest.headers["Authorization"] = `Bearer ${token}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                console.error("Token refresh failed: ", err);
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                window.location.href = "/signin";
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    },
);
