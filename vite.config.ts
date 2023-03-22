import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// import { visualizer } from "rollup-plugin-visualizer"
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // visualizer({
    //   open: true, //注意这里要设置为true，否则无效
    //   gzipSize: true,
    // }),
    viteCompression({
      deleteOriginFile: false,
      algorithm: "gzip",
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve("src"),
      "src": path.resolve("src"),
    },
  },

  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // manualChunks: (filePath) => {
        //   if (filePath.includes('node_modules')) {
        //     // 如果这个文件路径，是来自 node_modules的，那么我们就进行发包
        //     return 'vendor';
        //   }
        // }
        manualChunks: {
          react: ["react", "react-router-dom"],
          antd: ["antd"],
          moment: ["moment"],
          jsoneditor: ["jsoneditor"],
        }
      }
    }
  }
})
