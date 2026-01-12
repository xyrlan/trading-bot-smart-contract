import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // Configuração vazia para Turbopack (silencia warning do Next.js 16)
  turbopack: {},
  
  webpack: (config) => {
    // Suporte para WebAssembly (necessário para algumas bibliotecas Solana)
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    
    // Ignora avisos de módulos node em ambiente browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };
    
    return config;
  },
};

export default nextConfig;
