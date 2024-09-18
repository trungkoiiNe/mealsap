import { create } from 'zustand'

const useStore = create((set) => ({
  favorites: [],
  addFavorite: (meal) => set((state) => ({
    favorites: [...state.favorites, meal]
  })),
  removeFavorite: (mealId) => set((state) => ({
    favorites: state.favorites.filter(meal => meal.id !== mealId)
  })),
}))

export default useStore
