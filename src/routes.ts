type AppRoutes = {
  home: string;
  shoppingCart: string;
  // Add more routes as needed. Example
  //   recipe: (id: string) => string;
};

export const routes: AppRoutes = {
  home: "/",
  shoppingCart: "/shopping-cart",
  // Add more routes as needed. Example:
  //   recipe: (id) => `/recipes/${id}`,
};
