import { mergeConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import baseConig from './vite.config.base'

export default mergeConfig(
  {
    mode: 'development',
    server: {
      port: 5000,
      fs: {
        strict: true,
      },
      cors: true, // 默认启用并允许任何源
      open: true, // 在服务器启动时自动在浏览器中打开应用程序 //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
      proxy: {
        '/api': {
          target: 'http://192.168.1.156:8080',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      eslint({
        // cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
        cache: false,
      }),
    ],
  },
  baseConig
)
