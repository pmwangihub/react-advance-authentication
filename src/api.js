import http from "./http";

/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - Authenticates a user with login credentials.
 * @params {object} object - The login credentials (e.g., username and password).
 * @returns {Promise} - A promise that resolves with the server's response for login.
 */
export const loginApi = (object) => http().post("/accounts/token/", object);

/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - Registers a new user account.
 * @params {object} object - The registration data (e.g., email, password).
 * @returns {Promise} - A promise that resolves with the server's response for registration.
 */
export const registerApi = (object) => http().post("accounts/register/", object);

/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - Uploads an image file to the server.
 * @params {File} imageData - The image file to be uploaded.
 * @returns {Promise} - A promise that resolves with the server's response for the image upload.
 */
export const uploadImageApi = (imageData) => {
    const formData = new FormData();
    formData.append("file", imageData);
    return http("multipart/form-data").post("upload/image/", formData);
};

/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - Logs out the currently authenticated user.
 * @params {} - None
 * @returns {Promise} - A promise that resolves with the server's response for logout.
 */
export const logoutApi = () => http().post("accounts/logout/", {});

/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - Updates the authenticated user's profile information.
 * @params {object} object - The user data to be updated.
 * @returns {Promise} - A promise that resolves with the server's response for the update.
 */
export const updateUserApi = (object) => http().put("accounts/update-user/", object);

/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - Deletes the user's account.
 * @params {object} object - The account data required to delete the user account.
 * @returns {Promise} - A promise that resolves with the server's response for account deletion.
 */
export const deleteAccountApi = (object) => http().post("accounts/delete-account/", object);

/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - Activates the user's account using a unique activation key.
 * @params {string} key - The activation key to verify and activate the account.
 * @returns {Promise} - A promise that resolves with the server's response for account activation.
 */
export const accountEmailActivateApi = (key) => http().get(`/accounts/activate/${key}/`);

/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - Initiates login via Google OAuth.
 * @params {} - None
 * @returns {Promise} - A promise that resolves with the server's response for Google login.
 */
export const loginWithGoogleApi = () => http().get(`/accounts/login-google/?client=react`);

/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - Retrieves secured user information for the authenticated user.
 * @params {} - None
 * @returns {Promise} - A promise that resolves with the server's response containing secured user information.
 */
export const userSecuredInfoApi = () => http().get(`/accounts/user-secured-info/`);
