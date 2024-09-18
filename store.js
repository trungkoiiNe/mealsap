import { create } from "zustand";

const useStore = create((set, get) => ({
  user: null,
  userFavorites: {},
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null, userFavorites: {} }),
  addFavorite: (meal) =>
    set((state) => {
      const userId = state.user?.username;
      if (!userId) return state; // Don't modify state if no user is logged in
      const userFavs = state.userFavorites[userId] || [];
      return {
        userFavorites: {
          ...state.userFavorites,
          [userId]: [...userFavs, meal],
        },
      };
    }),
  removeFavorite: (mealId) =>
    set((state) => {
      const userId = state.user?.username;
      if (!userId) return state; // Don't modify state if no user is logged in
      const userFavs = state.userFavorites[userId] || [];
      return {
        userFavorites: {
          ...state.userFavorites,
          [userId]: userFavs.filter((meal) => meal.id !== mealId),
        },
      };
    }),
  getUserFavorites: () => {
    const state = get();
    const userId = state.user?.username;
    return state.userFavorites[userId] || [];
  },
  toggleStarIcon: () => set((state) => ({ isStarFilled: !state.isStarFilled })),
}));

export default useStore;
