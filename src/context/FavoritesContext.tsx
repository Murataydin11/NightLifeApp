import React, { createContext, useContext, useMemo, useState } from 'react';

type EventItem = {
  id: string;
  title: string;
  place: string;
  date: string;
  price: string;
  type: string;
};

type FavoritesContextType = {
  favorites: EventItem[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (event: EventItem) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<EventItem[]>([]);

  const isFavorite = (id: string) => favorites.some((e) => e.id === id);

  const toggleFavorite = (event: EventItem) => {
    setFavorites((prev) => {
      const exists = prev.some((e) => e.id === event.id);
      if (exists) return prev.filter((e) => e.id !== event.id);
      return [...prev, event];
    });
  };

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite }),
    [favorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider');
  return ctx;
}