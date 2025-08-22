export const API_BASE = process.env.REACT_APP_API_URL;
export const APP_NAME = process.env.REACT_APP_APP_NAME;

if (!API_BASE) {
  console.warn('REACT_APP_API_URL is not set. Using default: http://localhost:8000');
}