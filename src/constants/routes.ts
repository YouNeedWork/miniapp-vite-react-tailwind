export const ROUTES = {
  HOME: '/',
  EARN: '/earn',
  FRIENDS: '/friends',
  ME: '/me'
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];