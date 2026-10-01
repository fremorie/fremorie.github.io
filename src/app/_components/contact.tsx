"use client";

import { Underline } from "./strokes";
import { ShaderWord } from "./shader-word";
import {useRef} from "react";

import { lora } from "@/fonts/lora";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import {scrollFade} from "../_utils/scrollFade";
import {fillLetters} from "../_utils/fillLetters";
import {roomyMasks} from "../_utils/roomyMasks";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, SplitText);

const links = [
  { label: "GitHub", href: "https://github.com/fremorie" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/daria-borisyak/" },
];

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
      () => {
        const mm = gsap.matchMedia(containerRef);

        mm.add('(prefers-reduced-motion: no-preference)', () => {
          const split = SplitText.create(".line", {
            type: "chars",
            mask: "chars",
          });
          roomyMasks(split.masks);
          fillLetters(split.chars);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%",
              once: true,
            },
          });

          scrollFade(containerRef.current!);

          tl.from(split.chars, {
            yPercent: 130,
            stagger: 0.04,
            duration: 0.9,
            ease: "circ.inOut",
          })
              .from(".fade", { opacity: 0, y: 20, stagger: 0.1, duration: 0.8 }, "-=0.4")
              .from(".email path", { drawSVG: 0, duration: 0.9, ease: "power2.inOut" }, "-=0.5");
        })
      },
      { scope: containerRef }
  );

  return (
    <section
        ref={containerRef}
      className="relative h-svh pb-[calc(9*var(--vh))] flex flex-col items-center justify-center gap-[calc(5*var(--vh))]"
    >
      <h2 className={`${lora.className} flex flex-col text-[min(calc(12*var(--vh)),12vw)] leading-[1.5]`}>
        <span className="line italic text-(--accent) -my-[0.2em]">Say</span>
        <span className="ml-[0.9em] -my-[0.2em]">
          <ShaderWord className="line font-bold uppercase">hello</ShaderWord>
        </span>
      </h2>

      <p className="fade text-[calc(2.6*var(--vh))] leading-[1.7] max-w-[28em] text-center text-balance px-6">
        Have a project, an idea, or just want to talk about frontend and 3D?
      </p>

      <a
        href="mailto:daria.borisiak@gmail.com"
        className="email fade relative text-[min(calc(4*var(--vh)),5vw)] transition-colors duration-500 hover:text-(--accent)"
      >
        daria.borisiak@gmail.com
        <Underline className="absolute -bottom-[0.25em] left-0 w-full" />
      </a>

      <nav className="fade flex gap-x-6 gap-y-2 sm:gap-x-10 flex-wrap justify-center text-xs uppercase tracking-[0.3em]">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hover:text-(--accent) transition-colors"
          >
            {link.label} ↗
          </a>
        ))}
      </nav>

      <span className="fade absolute bottom-10 left-10 text-xs uppercase tracking-[0.3em]">
        Bremen, Germany
      </span>
    </section>
  );
}
