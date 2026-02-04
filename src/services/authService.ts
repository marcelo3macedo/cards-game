export const authService = {
  getSessionToken: (): string | null => {
    const cookies = document.cookie.split(';');
    const sessionCookie = cookies.find((item) => item.trim().startsWith('user_session='));
    return sessionCookie ? sessionCookie.split('=')[1] : null;
  },

  isAuthenticated: (): boolean => {
    const cookies = document.cookie.split(';');
    return cookies.some((item) => item.trim().startsWith('user_session='));
  },

  saveSession: (token: string) => {
    document.cookie = `user_session=${token}; path=/; max-age=86400; SameSite=Strict`;
  },

  logout: () => {
    document.cookie = "user_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};
