import { create } from 'zustand';

const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');
let initialUser = null;
try {
  initialUser = storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null;
} catch (e) {
  console.error("Failed to parse stored user", e);
  localStorage.removeItem('user');
}
const initialIsAuthenticated = !!storedToken;

const useStore = create((set) => ({
  user: initialUser,
  token: storedToken,
  isAuthenticated: initialIsAuthenticated,
  globalLoading: false,
  setGlobalLoading: (isLoading) => set({ globalLoading: isLoading }),
  setAuth: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token, isAuthenticated: true });
  },
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },
  theme: 'dark',
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    return { theme: newTheme };
  }),
}));

export default useStore;
