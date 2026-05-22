import axios from "axios";
import { registrationStatusActions } from "../../store/state-slices/registration-status-check";
import { getAuthToken } from "../auth";

const baseUrl = process.env.REACT_APP_BASE_WEB;

export default async function httpRequest(requestConfig) {
    let bearerToken = getAuthToken();
    const url = baseUrl + requestConfig.url;

    try {
        const response = await axios({
            method: requestConfig.method || "GET",
            url: url,
            headers: requestConfig.cancelToken
                ? {}
                : bearerToken
                    ? {
                        Authorization: `Bearer ${bearerToken}`,
                        "Content-Type": "application/vnd.api+json",
                        "Accept": "application/vnd.api+json",
                    }
                    : {
                        "Content-Type": "application/vnd.api+json",
                        "Accept": "application/vnd.api+json",
                    },
            data: requestConfig.body || null,
            cancelToken: requestConfig.cancelToken
        });

        const data = response.data;
        console.log("423", data);
        console.log("423", response.status);
        const urlEndPoint = window.location.pathname.split("/").pop();

        if (response.status === 200 || response.status === 201) {
            // Handle success
        } else if (response.status === 308) {
            if (data?.data?.type !== "onboard") {
                localStorage.setItem("plan_expiry_response_status", data.message);
                localStorage.setItem("user_block_type", data?.data?.type || '');
            } else if (data?.data?.type === "onboard") {
                localStorage.setItem("unOnboard_msg", data.message);
                localStorage.setItem("unOnboard_type", data?.data?.type || '');
            }
        } else if (response.status === 308 && urlEndPoint !== "settings") {
            localStorage.setItem("plan_expiry_response_status", data.message);
        } else if (response.status === 423) {
            localStorage.setItem("blocked_status_msg", data.message);
            localStorage.setItem("blocked_status", JSON.stringify(data.data));
        } else {
            localStorage.setItem("blocked_status_msg", data.message);
        }

        return data;

    } catch (error) {
        console.error("Error during the request:", error);
        if (error.response) {
            // Handle error based on status code
            const { status, data } = error.response;
            const urlEndPoint = window.location.pathname.split("/").pop();

            if (status === 308) {
                if (data?.data?.type !== "onboard") {
                    localStorage.setItem("plan_expiry_response_status", data.message);
                    localStorage.setItem("user_block_type", data?.data?.type || '');
                } else if (data?.data?.type === "onboard") {
                    localStorage.setItem("unOnboard_msg", data.message);
                    localStorage.setItem("unOnboard_type", data?.data?.type || '');
                }
            } else if (status === 308 && urlEndPoint !== "settings") {
                localStorage.setItem("plan_expiry_response_status", data.message);
            } else if (status === 423) {
                localStorage.setItem("blocked_status_msg", data.message);
                localStorage.setItem("blocked_status", JSON.stringify(data.data));
            } else {
                localStorage.setItem("blocked_status_msg", data.message);
            }

            return data;
        } else {
            // Network or other errors
            console.error("Network error or other issues:", error.message);
        }
    }
}

// Check login
export function checkLogin() {
    let bearerToken = getAuthToken();
    if (bearerToken) {
        return httpRequest({ url: "/auth/check-login" });
    } else {
        return Promise.resolve(null);
    }
}
