import gsap from "gsap";

export function leanOnHover(root: HTMLElement) {
    const cleanups = Array.from(root.querySelectorAll<HTMLElement>(".card")).map((card) => {
        const image = card.querySelector(".lean");
        const x = gsap.quickTo(image, "x", { duration: 0.8, ease: "power3" });
        const y = gsap.quickTo(image, "y", { duration: 0.8, ease: "power3" });

        const onEnter = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            x(((e.clientX - rect.left) / rect.width - 0.5) * 24);
            y(((e.clientY - rect.top) / rect.height - 0.5) * 18);
        };
        const onLeave = () => {
            x(0);
            y(0);
        };

        const links = card.querySelectorAll<HTMLElement>(".project");
        links.forEach((link) => {
            link.addEventListener("mouseenter", onEnter);
            link.addEventListener("mouseleave", onLeave);
        });
        return () => {
            links.forEach((link) => {
                link.removeEventListener("mouseenter", onEnter);
                link.removeEventListener("mouseleave", onLeave);
            });
        };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
}
