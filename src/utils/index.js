import { jwtDecode } from "jwt-decode";

/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - Merges properties of the updated object into the current object.
 * @params {object} currentObject - The original object.
 * @params {object} updatedObject - The object with updated properties.
 * @returns {object} - The merged object with updated properties.
 */
export const objectUpdate = (currentObject, updatedObject) => {
	return {
		...currentObject, ...updatedObject
	}
}

/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - Formats an ISO date string into a readable format with date and time.
 * @params {string} isoString - The ISO date string to be formatted.
 * @returns {string} - The formatted date in "day month year at hours:minutes" format.
 */
export const FormatDate = (isoString) => {
	const date = new Date(isoString);
	const day = date.getUTCDate();
	const month = date.toLocaleString('default', { month: 'long' });
	const year = date.getUTCFullYear();
	const hours = date.getUTCHours();
	const minutes = date.getUTCMinutes().toString().padStart(2, '0');

	return `${day} ${month} ${year} at ${hours}:${minutes}`;
}

/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - Formats an ISO date string into a plain date format without time.
 * @params {string} isoString - The ISO date string to be formatted.
 * @returns {string} - The formatted date in "day month year" format.
 */
export const PlainDate = (isoString) => {
	const date = new Date(isoString);
	const day = date.getUTCDate();
	const month = date.toLocaleString('default', { month: 'long' });
	const year = date.getUTCFullYear();
	return `${day} ${month} ${year}`;
}

/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - Truncates text to a specified word limit, appending ellipses if exceeded.
 * @params {string} text - The text to be truncated.
 * @params {number} wordLimit - The maximum number of words allowed.
 * @returns {string} - The truncated text ending with "..." if word limit exceeded.
 */
export const truncateText = (text, wordLimit) => {
	const words = text.split(' ');
	if (words.length <= wordLimit) return text;
	return words.slice(0, wordLimit).join(' ') + '...';
}

/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - Decodes JWT token to extract user data.
 * @params {object} authData - Object containing access and refresh tokens.
 * @returns {object|null} - Decoded user data with access, refresh tokens and user details, or null on failure.
 */
export const decodedUserData = (authData) => {
	try {
		const { access, refresh } = authData;
		const { user } = jwtDecode(access);
		return { access, refresh, user }
	} catch (error) {
		return null;
	}
}

/**
 * @mwangihub - https://github.com/pmwangihub
 * @summary - Utility object containing multiple utility functions.
 * @returns {object} - The utility object with various functions.
 */
export const utils = {
	objectUpdate,
	FormatDate,
	PlainDate,
	truncateText,
	decodedUserData,
}
