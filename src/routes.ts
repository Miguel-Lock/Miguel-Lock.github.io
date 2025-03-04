type AppRoutes = {
  home: string;
  shoppingCart: string;
  recipes: string;
  // Add more routes as needed. Example
  //   recipe: (id: string) => string;
};

export const routes: AppRoutes = {
  home: "/",
  shoppingCart: "/shopping-cart",
  recipes: "/recipes",
  // Add more routes as needed. Example:
  //   recipe: (id) => `/recipes/${id}`,
};
