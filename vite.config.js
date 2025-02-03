import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import * as dotenv from "dotenv";

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            "/api": {
                target: process.env.LAUNDRY_API_URL,
                changeOrigin: true,
                configure: (proxy, options) => {
                    proxy.on("error", (err, _req, _res) => {
                        console.log("Proxy error:", err);
                    });
                    proxy.on("proxyReq", (proxyReq, req, _res) => {
                        console.log(
                            "Request sent to target:",
                            req.method,
                            req.url,
                        );
                    });
                    proxy.on("proxyRes", (proxyRes, req, _res) => {
                        console.log(
                            "Response received from target:",
                            proxyRes.statusCode,
                            req.url,
                        );
                    });
                },
            },
        },
    },
});
