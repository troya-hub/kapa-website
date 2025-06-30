export const PRICING_URL = "/pricing";
export const APP_REGISTER_URL = "https://app.kapa99.com/register";
export const LOGIN_URL = "https://app.kapa99.com/login";

export const getRegisterUrlWithParams = (params: Record<string, string>) => {
	const queryString = new URLSearchParams(params).toString();
	const baseUrl = "https://app.kapa99.com/register";
	return `${baseUrl}?${queryString}`;
};
