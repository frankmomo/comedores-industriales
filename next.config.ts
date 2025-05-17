// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // ❌ Desactiva Turbopack (causante del error con 'fs')
  },
  images: {
    domains: [], // Agrega dominios externos aquí si usas imágenes remotas
  },
};

module.exports = nextConfig;
