import axios from 'axios';

/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - Retrieves the base URL from environment variables.
 */
export const BASE_URL = import.meta.env.VITE_HOST;


/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - Retrieves the access token from local storage.
 * @params {} - None
 * @returns {string|null} - The access token if it exists, otherwise null.
 */
export const getAccessToken = () => {
	const userData = localStorage.getItem("authData");
	try {
		const authData = userData ? JSON.parse(userData) : null;
		return authData && authData.access ? authData.access : null;
	} catch (error) {
		return null;
	}
};

/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - Creates an Axios instance with default headers and optional access token.
 * @params {string} contentType - The Content-Type of the request headers, default is "application/json".
 * @returns {object} - An Axios instance with the specified configuration.
 */
const http = (contentType = "application/json") => {
	const headers = {
		"X-Origin": "react",
		"Content-Type": contentType,
		Accept: "application/json",
	};

	const accessToken = getAccessToken();
	if (accessToken) {
		headers.Authorization = `Bearer ${accessToken}`;
	}
	let response = axios.create({
		baseURL: BASE_URL,
		headers: headers,
		withCredentials: true,
	});
	return response;
};

/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - Makes a request to refresh the access token.
 * @params {} - None
 * @returns {Promise} - A promise that resolves to the response of the refresh token API call.
 */
export const refreshTokenApi = () => http().post(`accounts/token/refresh/`);

export default http;
