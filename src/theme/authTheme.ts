/** Native iOS SimpleAuthLandingView — RGB(0.55, 0.35, 0.75) */
export const AUTH_BACKGROUND = '#8C59BF';

/** Pink gradient on Create Account — matches native AuthView.swift */
export const AUTH_CREATE_ACCOUNT_GRADIENT = ['#F24D80', '#FF6699'] as const;

/** Legacy gradient (prefer AUTH_BACKGROUND solid for auth landing) */
export const AUTH_GRADIENT = [AUTH_BACKGROUND, AUTH_BACKGROUND, AUTH_BACKGROUND] as const;
