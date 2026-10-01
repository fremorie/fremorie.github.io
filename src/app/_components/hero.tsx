'use client'

import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import {useRef} from "react";

import {lora} from "@/fonts/lora";

import {Circle} from "./strokes";
import {ShaderWord} from "./shader-word";
import {scrollFade} from "../_utils/scrollFade";
import {fillLetters} from "../_utils/fillLetters";
import {roomyMasks} from "../_utils/roomyMasks";

gsap.registerPlugin(useGSAP, SplitText, DrawSVGPlugin);

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.set(containerRef.current, { visibility: "visible" });

            const mm = gsap.matchMedia(containerRef);
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const nameSplit = SplitText.create(".title-name,.title-surname", {
                    type: "chars",
                    mask: "chars",
                });
                roomyMasks(nameSplit.masks);
                fillLetters(nameSplit.chars);

                const tl = gsap.timeline();

                tl.from(nameSplit.chars, {
                    yPercent: 130,
                    stagger: 0.04,
                    duration: 0.9,
                    ease: "circ.inOut",
                })

                tl.from('.intro', {opacity: 0, y: 20, duration: 0.8}, '-=0.3')
                tl.from('.intro path', {drawSVG: 0, duration: 0.9, ease: 'power2.inOut'}, '-=0.2')
                tl.from('.label', {opacity: 0, duration: 0.6}, '<')

                scrollFade(containerRef.current!);
            })
        },
        {scope: containerRef}
    );

    return (
        <section
            ref={containerRef}
            className="invisible relative h-svh overflow-hidden flex flex-col items-center justify-center gap-[calc(7*var(--vh))] pb-[calc(9*var(--vh))]"
        >
            <h1 className={`${lora.className} text-[min(calc(15*var(--vh)),15vw)] leading-[1.1]`}>
                <span className="title-name block text-(--accent) italic">Daria</span>
                <span className="block ml-[0.9em]">
                    <ShaderWord className="title-surname font-bold uppercase">Borisiak</ShaderWord>
                </span>
            </h1>

            <p className="intro text-[max(1rem,calc(2.6*var(--vh)))] leading-[1.7] max-w-[30em] text-center text-balance px-6">
                Frontend engineer building{' '}
                <span className="relative whitespace-nowrap">
                    interactive
                    <Circle className="absolute left-[-0.4em] top-1/2 -translate-y-1/2 pointer-events-none w-[calc(100%_+_0.8em)]" />
                </span>
                {' '}things for the web
            </p>

            <span className="label absolute top-10 left-10 text-xs uppercase tracking-[0.3em]">
                Portfolio
            </span>
            <span className="label absolute bottom-10 inset-x-0 text-center text-xs uppercase tracking-[0.3em]">
                scroll ↓
            </span>
        </section>
    )
}