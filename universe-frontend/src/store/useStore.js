import { create } from 'zustand';

const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');
const initialUser = storedUser ? JSON.parse(storedUser) : null;
const initialIsAuthenticated = !!storedToken;

const useStore = create((set) => ({
  user: initialUser,
  token: storedToken,
  isAuthenticated: initialIsAuthenticated,
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
