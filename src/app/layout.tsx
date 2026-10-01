import React from "react";
import type { Metadata } from "next";
import "./globals.css";

import { molengo } from "@/fonts/molengo";
import noise from "@/../public/noise.png";

export const metadata: Metadata = {
    title: "Daria Borisiak — Portfolio",
    description: "Frontend engineer in Bremen building interactive things for the web: Three.js, WebGL and shaders.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className="antialiased">
            <body
                className={`${molengo.className} isolate bg-(--bg) text-(--font)`}
                style={
                    {
                        "--accent": "#FF4A1C",
                        "--font": "#3C3C3C",
                        "--line": "#C6C6C6",
                        "--bg": "#ffffff",
                        "--vh": "min(1vh, 10px)",
                        "--vw": "min(1vw, 16px)",
                    }
                }
            >
                <div
                    className="fixed inset-0 bg-repeat opacity-10 mix-blend-hard-light -z-10 pointer-events-none"
                    style={{ backgroundImage: `url(${noise.src})` }}
                />
                {children}
            </body>
        </html>
    );
}
