export const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const ENV = {
  API_BASE_URL: getEnvVar("VITE_API_BASE_URL"),
  PKG: getEnvVar("VITE_PKG"),
  ROOCH_APP: getEnvVar("VITE_ROOCH_APP"),
} as const;
