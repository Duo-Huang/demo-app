import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        plugins: [
            vue(),
            // checker({ typescript: true })
        ],
        base: './',
        envDir: './env',
        envPrefix: "APP",
        resolve: {
            alias: [
                { find: '@', replacement: 'src' }
            ]
        },
        test: {
            globals: true,
            mockReset: true,
            clearMocks: true
        }
    }
})
