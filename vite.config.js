import { defineConfig, normalizePath } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
const variablePath = normalizePath(path.resolve("./src/assets/css/variable.scss")); // globel css

// https://vitejs.dev/config/
export default defineConfig (({ mode }) => {
  return {
    server: {
      port: 3001,
    },
    plugins: [ react()],
    // css 
    css: {
      modules: {
        generateScopedName: "[name]__[local]___[hash:base64:5]",
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "${variablePath}";`, // additionalData 
        },
      },
    },
    resolve: {
      alias: [
        {
          find: /^~/, 
          replacement: '',
        },
        {
          find: '@', 
          replacement: path.resolve(__dirname, './src')
        }
      ],
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: "assets/[name].js", 
          chunkFileNames: "assets/[name]-[hash].js", 
          assetFileNames: "assets/[name]-[hash]-zhujiaofan.[ext]",
        },
      },
    },
  };
});
