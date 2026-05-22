import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';

const useApiHttp = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const hasShown401Toast = useRef(false);
    const [adminToken, setAdminToken] = useState(null);

    // Improved token synchronization
    useEffect(() => {
        const updateToken = () => {
            const storedUser = JSON.parse(localStorage.getItem("adminUserData"));
            setAdminToken(storedUser?.authToken || null);
        };

        // Initial token load
        updateToken();

        // Listen for storage changes
        const storageListener = () => {
            updateToken();
        };

        window.addEventListener('storage', storageListener);
        return () => window.removeEventListener('storage', storageListener);
    }, []);

    // const sendRequest = useCallback(
    //     async (requestConfig, applyData = null, handleError = null) => {
    //         setIsLoading(true);
    //         setSuccess(null);
    //         setError(null);

    //         try {
    //             // Get fresh token for each request
    //             const currentToken = JSON.parse(localStorage.getItem("adminUserData"))?.authToken;

    //             const baseUrl = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3001")
    //                 .replace(/\/$/, "");
    //             const endpoint = requestConfig.url.replace(/^\//, "");
    //             const requestUrl = `${baseUrl}/${endpoint}`;

    //             const headers = {
    //                 "Content-Type": "application/json",
    //                 Accept: "application/json",
    //                 ...(currentToken && { Authorization: `Bearer ${currentToken}` })
    //             };

    //             const response = await axios({
    //                 method: requestConfig.method || "GET",
    //                 url: requestUrl,
    //                 headers,
    //                 data: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
    //             });

    //             if (response.status >= 200 && response.status < 300) {
    //                 setSuccess(response.data.message);
    //                 if (applyData) applyData(response.data);
    //                 return response.data;
    //             }
    //             throw response;

    //         } catch (err) {
    //             const errorData = err.response?.data || err;
    //             const errorMessage = errorData.message || errorData.error || "Request failed";

    //             if (err.response?.status === 401) {
    //                 // Clear auth data immediately
    //                 localStorage.removeItem("adminUserData");
    //                 setAdminToken(null);

    //                 if (!hasShown401Toast.current) {
    //                     hasShown401Toast.current = true;
    //                     toast.error("Session expired. Please login again.");
    //                     setTimeout(() => {
    //                         hasShown401Toast.current = false;
    //                     }, 5000);
    //                 }

    //                 navigate("/admin/login");
    //             } else {
    //                 toast.error(errorMessage);
    //                 if (handleError) handleError(errorData);
    //             }

    //             setError(errorMessage);
    //             return null;
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     },
    //     [navigate] // Removed adminToken from dependencies
    // );
    const sendRequest = useCallback(
        async (requestConfig, applyData = null, handleError = null) => {
            setIsLoading(true);
            setSuccess(null);
            setError(null);

            try {
                const currentToken = JSON.parse(localStorage.getItem("adminUserData"))?.authToken;

                const baseUrl = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3001").replace(/\/$/, "");
                const endpoint = requestConfig.url.replace(/^\//, "");
                const requestUrl = `${baseUrl}/${endpoint}`;

                // Determine if body is FormData
                const isFormData = requestConfig.body instanceof FormData;

                const headers = {
                    Accept: "application/json",
                    ...(currentToken && { Authorization: `Bearer ${currentToken}` }),
                    ...requestConfig.headers, // Allow manual headers passed by caller
                    ...(!isFormData && { "Content-Type": "application/json" }), // Only set Content-Type JSON if not FormData
                };

                const response = await axios({
                    method: requestConfig.method || "GET",
                    url: requestUrl,
                    headers,
                    data: requestConfig.body
                        ? (isFormData ? requestConfig.body : JSON.stringify(requestConfig.body))
                        : null,
                });

                if (response.status >= 200 && response.status < 300) {
                    setSuccess(response.data.message);
                    if (applyData) applyData(response.data);
                    return response.data;
                }
                throw response;

            } catch (err) {
                const errorData = err.response?.data || err;
                const errorMessage = errorData.message || errorData.error || "Request failed";
                if (err.response?.status === 422) {
                    // toast.error(errorMessage);
                }

                if (err.response?.status === 401) {
                    localStorage.removeItem("adminUserData");
                    setAdminToken(null);

                    if (!hasShown401Toast.current) {
                        hasShown401Toast.current = true;
                        toast.error("Session expired. Please login again.");
                        setTimeout(() => {
                            hasShown401Toast.current = false;
                        }, 5000);
                    }

                    navigate("/admin/login");
                } else {
                    toast.error(errorMessage);
                    if (handleError) handleError(errorData);
                }

                setError(errorMessage);
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [navigate]
    );


    return { isLoading, success, error, sendRequest };
};

export default useApiHttp;



// import { useState, useCallback, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// let hasShown401Toast = false;
// const useApiHttp = () => {
//     const navigate = useNavigate();
//     const [isLoading, setIsLoading] = useState(false);
//     const [success, setSuccess] = useState(null);
//     const [error, setError] = useState(null);
//     //   const hasShown401Toast = useRef(false);

//     const storedUser = JSON.parse(localStorage.getItem("adminUserData"));

//     const AdminbearerToken = storedUser?.authToken;

//     const sendRequest = useCallback(
//         async (requestConfig, applyData = null, handleError = null) => {
//             setIsLoading(true);
//             setSuccess(null);
//             setError(null);

//             const headers = {
//                 "Content-Type": "application/vnd.api+json",
//                 Accept: "application/vnd.api+json",
//             };

//             if (AdminbearerToken) {
//                 headers.Authorization = `Bearer ${AdminbearerToken}`;
//             }

//             // Ensure the URL is correctly constructed
//             const baseUrl = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3001").replace(/\/$/, "");
//             const endpoint = requestConfig.url.replace(/^\//, "");
//             const requestUrl = `${baseUrl}/${endpoint}`;

//             try {
//                 const response = await axios({
//                     method: requestConfig.method || "GET",
//                     url: requestUrl,
//                     headers,
//                     data: requestConfig.body || null,
//                 });

//                 const data = response.data;

//                 if (data.status_code === 200 || data.status_code === 201) {
//                     setSuccess(data.message);
//                     // toast.success(data.message || "Request successful!");
//                 } else {
//                     throw data;
//                 }

//                 if (applyData) {
//                     applyData(data);
//                 }
//             } catch (err) {
//                 const errorMessage =
//                     err.response?.data?.message || err.message || "Something went wrong!";

//                 if (err.response?.status === 401) {
//                     //   if (!hasShown401Toast.current) {
//                     //     hasShown401Toast.current = true;
//                     //     toast.error(errorMessage);
//                     //   }
//                     if (!hasShown401Toast) {
//                         hasShown401Toast = true;
//                         toast.error(errorMessage);
//                         setTimeout(() => {
//                             hasShown401Toast = false; // Reset after some time (optional)
//                         }, 5000);
//                     }
//                     // Remove the token from localStorage or localStorage if needed
//                     localStorage.removeItem("adminUserData");
//                     navigate("/");
//                 } else {
//                     toast.error(errorMessage);
//                     handleError && handleError?.(err);
//                 }

//                 setError(errorMessage);
//             } finally {
//                 setIsLoading(false);
//             }
//         },
//         [AdminbearerToken, navigate]
//     );

//     return {
//         isLoading,
//         success,
//         error,
//         sendRequest,
//     };
// };

// export default useApiHttp;
