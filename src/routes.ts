type AppRoutes = {
  home: string;
  recipes: string;
  directions: (recipe: number) => string;
  // long term: directions needs to be a dynamic link.
  // directions: (id: string) => string;
};

export const routes: AppRoutes = {
  home: "/",
  recipes: "/recipes",
  directions: (recipe: number) => "/directions/" + recipe,
};
