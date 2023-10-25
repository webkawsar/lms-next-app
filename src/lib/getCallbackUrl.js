export const getCallbackUrl = (fullPath) => {
  if (fullPath) {
    const paresedRoute = fullPath.split("/");
    const route = paresedRoute[paresedRoute.length - 1];
    return route;
  }

  return false;
};
