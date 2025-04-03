"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

interface FavortesContextType {
  favorites: number[];
  toggleFavorite: (id: number) => void | undefined;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavortesContextType>({
  favorites: [],
  toggleFavorite: (id: number) => undefined,
  isFavorite: (id: number) => false,
});

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const emptyNumberArray: number[] = [];
  let [favorites, setFavorites] = useState(emptyNumberArray);

  useEffect(() => {
    //load from storage on window load
    const storedFavorites =
      (JSON.parse(localStorage.getItem("favorites") as string) as number[]) ||
      [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    //save the changed favorites to local storage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (toggledID: number) => {
    favorites.indexOf(toggledID) === -1
      ? setFavorites([...favorites, toggledID])
      : setFavorites(favorites.filter((id) => id !== toggledID));
  };

  const isFavorite = (recipeID: number) => {
    return favorites.indexOf(recipeID) !== -1;
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites() {
  return useContext(FavoritesContext);
}
