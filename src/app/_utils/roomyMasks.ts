import gsap from "gsap";

export function roomyMasks(masks: Element[]) {
    gsap.set(masks, { padding: "0.2em", margin: "-0.2em" });
}
