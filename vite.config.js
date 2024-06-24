// vite.config.js
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';

export default defineConfig({
    root: 'src',
    resolve: {
        alias: { // 기본 디렉토리 정의
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: { // 개발 서버 포트 설정
        port: 7600,
    },
    build: {
        outDir: '../dist',
        // console.log 제거
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }
    },
});