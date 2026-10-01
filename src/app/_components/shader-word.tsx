"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const Contours = dynamic(() => import("./contours").then((module) => module.Contours), { ssr: false });

const desktop = () => matchMedia("(min-width: 1024px)");

const subscribe = (onChange: () => void) => {
    const query = desktop();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
};

const still =
    "max-lg:bg-[url(/contours-still.avif)] max-lg:bg-[length:800px_300px] max-lg:bg-center max-lg:bg-clip-text max-lg:text-transparent";

export function ShaderWord({ className, children }: { className: string; children: string }) {
    const isDesktop = useSyncExternalStore(subscribe, () => desktop().matches, () => false);

    return (
        <span className="group/word relative inline-block">
            <span data-word className={`${className} ${still} group-data-[shader=on]/word:text-transparent`}>
                {children}
                <span data-baseline className="inline-block w-0 h-0 align-baseline" />
            </span>
            {isDesktop && (
                <Contours
                    text
                    scale={2.2}
                    fill={9.8}
                    className="absolute -left-[0.15em] -top-[0.15em] w-[calc(100%+0.3em)] h-[calc(100%+0.3em)] pointer-events-none"
                />
            )}
        </span>
    );
}
