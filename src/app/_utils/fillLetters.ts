import gsap from "gsap";

export function fillLetters(chars: Element[]) {
    const words = new Set<HTMLElement>();

    chars.forEach((char) => {
        let word = char.parentElement;
        while (word && getComputedStyle(word).backgroundImage === "none") word = word.parentElement;
        if (!word) return;
        words.add(word);

        const style = getComputedStyle(word);
        const [width, height] = style.backgroundSize.split(" ").map(parseFloat);
        const box = word.getBoundingClientRect();
        const rect = char.getBoundingClientRect();

        gsap.set(char, {
            backgroundImage: style.backgroundImage,
            backgroundSize: style.backgroundSize,
            backgroundPosition: `${(box.width - width) / 2 - (rect.left - box.left)}px ${(box.height - height) / 2 - (rect.top - box.top)}px`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
        });
    });

    if (words.size) gsap.set([...words], { backgroundImage: "none" });
}
