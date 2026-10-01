"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";

import fragment from "../_shaders/contours.frag.glsl";
import vertex from "../_shaders/contours.vert.glsl";

const rgb = (hex: string) => new THREE.Vector3(...[1, 3, 5].map((i) => parseInt(hex.trim().slice(i, i + 2), 16) / 255));

const lettersOf = (host: HTMLElement) => host.querySelectorAll<HTMLElement>("[data-word] div div");

function drawLetters(mask: HTMLCanvasElement, canvas: HTMLCanvasElement, dpr: number, still: boolean) {
    const host = canvas.parentElement!;
    const word = host.querySelector<HTMLElement>("[data-word]");
    const baseline = host.querySelector<HTMLElement>("[data-baseline]");
    if (!word || !baseline) return;

    const style = getComputedStyle(word);
    const box = canvas.getBoundingClientRect();
    const upper = (text: string) => (style.textTransform === "uppercase" ? text.toUpperCase() : text);
    const ctx = mask.getContext("2d")!;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, mask.width, mask.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    ctx.letterSpacing = style.letterSpacing === "normal" ? "0px" : style.letterSpacing;
    const y = baseline.getBoundingClientRect().bottom - box.top;

    const letters = lettersOf(host);
    if (!letters.length) {
        ctx.fillText(upper(word.textContent ?? ""), word.getBoundingClientRect().left - box.left, y);
        return;
    }
    letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect();
        const clip = letter.parentElement!.getBoundingClientRect();
        ctx.save();
        ctx.beginPath();
        ctx.rect(clip.left - box.left, clip.top - box.top, clip.width, clip.height);
        ctx.clip();
        ctx.fillText(upper(letter.textContent ?? ""), rect.left - box.left, y + (still ? 0 : rect.top - clip.top - letter.offsetTop));
        ctx.restore();
    });
}

export function Contours({
    text = false,
    scale = 1.4,
    fill = 10.1,
    className,
}: {
    text?: boolean;
    scale?: number;
    fill?: number;
    className?: string;
}) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current!;
        const host = canvas.parentElement!;
        const css = getComputedStyle(canvas);
        const mask = document.createElement("canvas");
        const maskTexture = new THREE.CanvasTexture(mask);
        const uniforms = {
            uRes: { value: new THREE.Vector2() },
            uTime: { value: 0 },
            uUnit: { value: 1 },
            uScale: { value: scale },
            uFill: { value: fill },
            uInk: { value: rgb(css.getPropertyValue("--font")) },
            uPaper: { value: rgb(css.getPropertyValue("--bg")) },
            uAccent: { value: rgb(css.getPropertyValue("--accent")) },
            uMouse: { value: new THREE.Vector3() },
            uRadius: { value: 1 },
            uText: { value: text },
            uMask: { value: maskTexture },
        };

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        const camera = new THREE.Camera();
        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms });
        const mesh = new THREE.Mesh(geometry, material);
        const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

        let letters = "";
        const lettersNow = () => [...lettersOf(host)].map((letter) => Math.round(letter.getBoundingClientRect().top)).join();
        const updateMask = () => {
            letters = lettersNow();
            drawLetters(mask, canvas, renderer.getPixelRatio(), still);
            maskTexture.needsUpdate = true;
            host.dataset.shader = "on";
        };

        let pointer: { x: number; y: number } | null = null;
        const onMove = (e: PointerEvent) => {
            if (e.pointerType === "mouse") pointer = { x: e.clientX, y: e.clientY };
        };
        const onLeave = () => (pointer = null);

        const draw = (time: number) => {
            if (text && !still && lettersNow() !== letters) updateMask();
            const lens = uniforms.uMouse.value;
            if (pointer) {
                const rect = canvas.getBoundingClientRect();
                const dpr = renderer.getPixelRatio();
                const k = lens.z < 0.01 ? 1 : 0.12;
                lens.x += ((pointer.x - rect.left) * dpr - lens.x) * k;
                lens.y += ((rect.bottom - pointer.y) * dpr - lens.y) * k;
            }
            lens.z += ((pointer ? 1 : 0) - lens.z) * 0.06;
            uniforms.uTime.value = time / 1000;
            renderer.render(mesh, camera);
        };

        const resize = () => {
            renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
            renderer.getDrawingBufferSize(uniforms.uRes.value);
            uniforms.uUnit.value = document.documentElement.clientHeight * renderer.getPixelRatio();
            uniforms.uRadius.value = 130 * renderer.getPixelRatio();
            if (text) {
                mask.width = uniforms.uRes.value.x;
                mask.height = uniforms.uRes.value.y;
                maskTexture.dispose();
                updateMask();
            }
            draw(performance.now());
        };
        const resizer = new ResizeObserver(resize);
        resizer.observe(canvas);
        if (text) document.fonts.ready.then(resize);

        const watcher = new IntersectionObserver(([entry]) => {
            renderer.setAnimationLoop(entry.isIntersecting && !still ? draw : null);
        });
        watcher.observe(canvas);

        if (!still) {
            window.addEventListener("pointermove", onMove);
            document.documentElement.addEventListener("pointerleave", onLeave);
        }

        return () => {
            renderer.setAnimationLoop(null);
            resizer.disconnect();
            watcher.disconnect();
            window.removeEventListener("pointermove", onMove);
            document.documentElement.removeEventListener("pointerleave", onLeave);
            delete host.dataset.shader;
            maskTexture.dispose();
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [text, scale, fill]);

    return <canvas ref={ref} aria-hidden className={className} />;
}
