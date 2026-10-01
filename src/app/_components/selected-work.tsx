"use client";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { lora } from "@/fonts/lora";

import { Underline } from "./strokes";
import { projects, type Project } from "../_data/projects";
import { leanOnHover } from "../_utils/leanOnHover";
import { scrollFade } from "../_utils/scrollFade";

gsap.registerPlugin(ScrollTrigger);

const [featured, ...rest] = projects;

const shadow = "shadow-[0_18px_40px_-24px_rgba(0,0,0,0.5)]";

export function SelectedWork() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia(containerRef);

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                        once: true,
                    },
                })
                    .from("h2", { opacity: 0, y: 30, duration: 0.8 })
                    .from(".rule", { scaleX: 0, transformOrigin: "left", duration: 0.6, ease: "power2.inOut" }, "-=0.4")
                    .from(".intro", { opacity: 0, y: 20, duration: 0.8 }, "-=0.4")
                    .from(".paper", { opacity: 0, duration: 1 }, "<")
                    .from(".card", { opacity: 0, y: 40, stagger: 0.12, duration: 0.9, ease: "power3.out" }, "<-0.3");
            });

            mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
                scrollFade(containerRef.current!);
            });

            mm.add("(prefers-reduced-motion: no-preference) and (hover: hover)", () => {
                return leanOnHover(containerRef.current!);
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="p-4 sm:p-6 lg:p-10 lg:h-svh"
        >
            <div className="h-full border-2 border-(--line) px-6 py-[calc(8*var(--vh))] lg:py-0 lg:px-[calc(5*var(--vw))] flex flex-col items-center lg:flex-row lg:justify-center gap-[calc(8*var(--vh))] lg:gap-[calc(5*var(--vw))]">
                <div className="w-full max-w-xl lg:w-auto shrink-0">
                    <h2 className={`${lora.className} flex flex-col text-[min(18vw,calc(12*var(--vh)))] lg:text-[min(calc(12*var(--vh)),calc(7.5*var(--vw)))] leading-[1.02]`}>
                        <span>Selected</span>
                        <span className="italic text-(--accent)">work</span>
                    </h2>
                    <span className="rule block w-12 h-px bg-(--font)/40 mt-[calc(5*var(--vh))]" />
                    <p className="intro mt-[calc(4*var(--vh))] text-[max(1rem,calc(2.6*var(--vh)))] leading-[1.6] max-w-[15em]">
                        Interactive experiments and personal projects exploring real-time graphics, shaders and 3D.
                    </p>
                </div>

                <div className="w-full max-w-xl lg:flex-1 lg:max-w-[calc(85*var(--vh))] grid grid-cols-12 gap-x-[calc(2.4*var(--vh))] gap-y-10 lg:gap-y-[calc(3*var(--vh))]">
                    <div className="card group col-span-12 lg:col-start-2 lg:col-span-11 lg:grid lg:grid-cols-subgrid">
                        <div className="relative lg:col-span-6">
                            <div
                                aria-hidden
                                className="paper hidden lg:block absolute -inset-x-[22%] -inset-y-[5%] bg-(--line)/25 [clip-path:polygon(18%_6%,88%_0,100%_22%,84%_100%,0_88%)]"
                            />
                            <Cover
                                project={featured}
                                sizes="(min-width: 1024px) 30vw, 100vw"
                                className="aspect-square"
                            />
                        </div>
                        <Caption
                            project={featured}
                            className="relative mt-6 lg:mt-0 lg:col-span-5 lg:pl-[calc(1.5*var(--vh))] lg:pt-[calc(5*var(--vh))]"
                        />
                    </div>

                    {rest.map((project) => (
                        <div key={project.title} className="card group col-span-12 lg:col-span-4">
                            <Cover
                                project={project}
                                sizes="(min-width: 1024px) 20vw, 100vw"
                                className="aspect-[16/10.5]"
                            />
                            <Caption project={project} className="mt-6 lg:mt-[calc(3*var(--vh))]" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Cover({ project, sizes, className }: { project: Project; sizes: string; className: string }) {
    return (
        <a href={project.href} className={`project lean relative block overflow-hidden ${shadow} ${className}`}>
            <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes={sizes}
                className="object-cover transition-[scale] duration-700 ease-out group-has-[.project:hover]:scale-[1.03]"
            />
        </a>
    );
}

function Caption({ project, className }: { project: Project; className: string }) {
    return (
        <div className={className}>
            <a
                href={project.href}
                className="project relative inline-block text-[clamp(20px,calc(2.8*var(--vh)),26px)] leading-[1.2] transition-colors duration-500 group-has-[.project:hover]:text-(--accent)"
            >
                {project.title}
                <Underline className="absolute -bottom-[0.15em] left-0 w-full origin-left scale-x-0 transition-[scale] duration-700 group-has-[.project:hover]:scale-x-100" />
            </a>
            <p className="mt-1.5 text-[17px] leading-[1.5] text-(--font)/85 max-w-[20em]">
                {project.description}
            </p>
            <a
                href={project.source}
                className="mt-2.5 inline-block text-[11px] uppercase tracking-[0.25em] text-(--font)/50 transition-colors hover:text-(--accent)"
            >
                {project.year} · src ↗
            </a>
        </div>
    );
}
