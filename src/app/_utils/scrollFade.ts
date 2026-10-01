import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function scrollFade(section: HTMLElement) {
    gsap
        .timeline({
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        })
        .fromTo(section, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "none" })
        .to(section, { opacity: 1, duration: 0.3 })
        .to(section, { opacity: 0, duration: 0.35, ease: "none" });
}
