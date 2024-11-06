const env = {
  API_URL: import.meta.env.VITE_API_URL,
  API_TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 30000,

  JWT_SECRET: import.meta.env.VITE_JWT_SECRET,
  JWT_EXPIRATION: import.meta.env.VITE_JWT_EXPIRATION || '8h',

  APP_NAME: import.meta.env.VITE_APP_NAME || 'AttendSmart',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',

  ENABLE_LOGS: import.meta.env.VITE_ENABLE_LOGS === 'true',
  MAX_UPLOAD_SIZE: parseInt(import.meta.env.VITE_MAX_UPLOAD_SIZE) || 5242880,

  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
  isTest: import.meta.env.MODE === 'test',
};

const requiredEnvVars = ['API_URL', 'JWT_SECRET'];

requiredEnvVars.forEach(key => {
  if (!env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export default env;