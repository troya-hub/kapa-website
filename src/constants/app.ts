export const REGISTER_URL = "https://app.kapa99.com/register?coupon=300savings";
export const LOGIN_URL = "https://app.kapa99.com/login";

export const getRegisterUrlWithParams = (params: Record<string, string>) => {
	const queryString = new URLSearchParams(params).toString();
	return `${REGISTER_URL}?${queryString}`;
};
