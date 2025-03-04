type AppRoutes = {
  home: string;
  recipes: string;
  directions: string;
  // long term: directions needs to be a dynamic link.
  // directions: (id: string) => string;
};

export const routes: AppRoutes = {
  home: "/",
  recipes: "/recipes",
  directions: "/directions",
  // directions: (id) => `/directions/${id}`,
};
