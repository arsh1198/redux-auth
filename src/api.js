import { API_KEY } from "./credentials";

export const BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
export const SIGNUP_URL = BASE_URL + "signUp?key=" + API_KEY;
export const LOGIN_URL = BASE_URL + "signInWithPassword?key=" + API_KEY;
export const UPDATE_USER_URL = BASE_URL + "update?key=" + API_KEY;
