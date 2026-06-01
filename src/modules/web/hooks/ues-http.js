import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";

const useApiHttp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const hasShown401Toast = useRef(false);
  const [adminToken, setAdminToken] = useState(null);

  useEffect(() => {
    const updateToken = () => {
      const storedUser = JSON.parse(localStorage.getItem("adminUserData"));
      setAdminToken(storedUser?.authToken || null);
    };

    updateToken();

    const storageListener = () => {
      updateToken();
    };

    window.addEventListener("storage", storageListener);
    return () => window.removeEventListener("storage", storageListener);
  }, []);

  const sendRequest = useCallback(
    async (requestConfig, applyData = null, handleError = null) => {
      setIsLoading(true);
      setSuccess(null);
      setError(null);

      try {
        const currentToken = JSON.parse(
          localStorage.getItem("webAppUserData")
        )?.authToken;

        const baseUrl = (
          import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"
        ).replace(/\/$/, "");
        const endpoint = requestConfig.url.replace(/^\//, "");
        const requestUrl = `${baseUrl}/${endpoint}`;

        const isFormData = requestConfig.body instanceof FormData;

        const headers = {
          Accept: "application/json",
          ...(currentToken && { Authorization: `Bearer ${currentToken}` }),
          ...requestConfig.headers,
          ...(!isFormData && { "Content-Type": "application/json" }),
        };

        const response = await axios({
          method: requestConfig.method || "GET",
          url: requestUrl,
          headers,
          data: requestConfig.body
            ? isFormData
              ? requestConfig.body
              : JSON.stringify(requestConfig.body)
            : null,
          validateStatus: (status) => status >= 200 && status < 300,
        });

        setSuccess(response.data.message);
        if (applyData) applyData(response.data);
        return response.data;
      } catch (err) {
        const errorData = err.response?.data || err;
        const statusCode = err.response?.status;
        let errorMessage =
          errorData.message || errorData.error || "Request failed";

        // Handle validation errors (422 status code)
        if (statusCode === 422) {
          // Check for common validation error structures
          if (errorData.errors) {
            const firstErrorKey = Object.keys(errorData.errors)[0];
            const firstError = errorData.errors[firstErrorKey];
            errorMessage = Array.isArray(firstError)
              ? firstError[0]
              : firstError;
          } else if (errorData.detail) {
            errorMessage = errorData.detail;
          }
          toast.error(errorMessage);
        } else if (statusCode === 401 || statusCode === 403) {
          localStorage.removeItem("webAppUserData");
          setAdminToken(null);

          if (!hasShown401Toast.current) {
            hasShown401Toast.current = true;
            toast.error(
              statusCode === 401
                ? "Session expired. Please login again."
                : "Your account has been blocked."
            );
            setTimeout(() => (hasShown401Toast.current = false), 5000);
          }

          navigate("/user/login");
        } else {
          if (errorMessage == 'Mobile no. already verified') {
            toast.error('Something went wrong. Please try again.');
          } else {
            toast.error(errorMessage);
          }
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
