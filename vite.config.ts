/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import checker from 'vite-plugin-checker'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:3000',
                    rewrite(path) {
                        return path.replace(/^\/api/, '')
                    },
                },
            },
        },
        plugins: [
            vue(),
            // localResolve(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
            // checker({ typescript: true })
        ],
        base: './',
        envDir: './env',
        envPrefix: 'APP',
        resolve: {
            alias: [
                { find: '@', replacement: path.resolve(__dirname, 'src') }, // don't use 'src' directly, it can cause bugs
            ],
        },
        test: {
            globals: true,
            // mockReset: true,
            // clearMocks: true,
            restoreMocks: true,
            deps: {
                inline: [/element-plus/], // test中不能识别css
            },
            environment: 'happy-dom'
        },
    }
})
