/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './src/**/*.{ts,tsx}',
];
export const prefix = "";
export const theme = {
  extend: {
    colors: {
      greySpot: '#121212',
    },
  },
};
export const plugins = [];
export const useFileSystemPublicRoutes = false;
export const env = {
  NEXT_PUBLIC_SPOTIFY_ID: process.env.NEXT_PUBLIC_SPOTIFY_ID,
  NEXT_PUBLIC_SPOTIFY_SECRET: process.env.NEXT_PUBLIC_SPOTIFY_SECRET,
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
};