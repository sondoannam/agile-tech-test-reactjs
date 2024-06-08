export const ROUTE_PATH = {
  Home: '/',
};

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}
