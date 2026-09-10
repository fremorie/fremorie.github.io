import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

type EyeLidOptions = {
    /** rotation.x for each lid when the eye is shut */
    topClosed?: number;
    bottomClosed?: number;
    /** how much further than the rest pose each lid pulls back in surprise */
    widen?: number;
    /** seconds for one half of the blink (close or open) */
    duration?: number;
    /** seconds of open-eyed pause between blinks */
    interval?: number;
    /** seconds the eyes stay wide before settling */
    hold?: number;
    /** bumped by whatever startles her; each change plays the reaction once */
    startles?: number;
};

/**
 * Owns both the idle blink and the startled widen, because they animate the
 * same two rotations and would otherwise fight over them.
 */
export function useEyeLids({
    topClosed = 0.15,
    bottomClosed = -0.15,
    widen = 0.22,
    duration = 0.2,
    interval = 4,
    hold = 0.9,
    startles = 0,
}: EyeLidOptions = {}) {
    const topEyeLidRef = useRef<THREE.Mesh>(null);
    const bottomEyeLidRef = useRef<THREE.Mesh>(null);

    const blink = useRef<gsap.core.Timeline | null>(null);
    const restPose = useRef<{ top: number; bottom: number } | null>(null);

    useEffect(() => {
        const top = topEyeLidRef.current;
        const bottom = bottomEyeLidRef.current;
        if (!top || !bottom) return;

        // rest pose comes from the JSX rotation, so we always return exactly to it
        const topOpen = top.rotation.x;
        const bottomOpen = bottom.rotation.x;
        restPose.current = { top: topOpen, bottom: bottomOpen };

        const tl = gsap.timeline({
            delay: 1,
            repeat: -1,
            repeatDelay: interval,
            defaults: { duration, ease: 'power2.inOut' },
        });

        tl.to(top.rotation, { x: topClosed }, 0)
            .to(bottom.rotation, { x: bottomClosed }, 0)
            .to(top.rotation, { x: topOpen }, '>')
            .to(bottom.rotation, { x: bottomOpen }, '<');

        blink.current = tl;

        return () => {
            tl.kill();
            blink.current = null;
            // if we're killed mid-blink, don't leave the eyes stuck shut
            gsap.set(top.rotation, { x: topOpen });
            gsap.set(bottom.rotation, { x: bottomOpen });
        };
    }, [topClosed, bottomClosed, duration, interval]);

    useEffect(() => {
        if (!startles) return;

        const top = topEyeLidRef.current;
        const bottom = bottomEyeLidRef.current;
        const rest = restPose.current;
        if (!top || !bottom || !rest) return;

        // a blink mid-startle would drag the lids back down, so park it and
        // pick it up again once she's recovered
        blink.current?.pause(0);
        gsap.killTweensOf([top.rotation, bottom.rotation]);

        const reaction = gsap.timeline({
            onComplete: () => blink.current?.restart(true),
        });

        reaction
            .to(
                top.rotation,
                { x: rest.top - widen, duration: 0.1, ease: 'power3.out' },
                0,
            )
            .to(
                bottom.rotation,
                { x: rest.bottom + widen, duration: 0.1, ease: 'power3.out' },
                0,
            )
            .to(
                top.rotation,
                { x: rest.top, duration: 0.45, ease: 'power2.inOut' },
                `+=${hold}`,
            )
            .to(
                bottom.rotation,
                { x: rest.bottom, duration: 0.45, ease: 'power2.inOut' },
                '<',
            );

        return () => {
            reaction.kill();
        };
    }, [startles, widen, hold]);

    return { topEyeLidRef, bottomEyeLidRef };
}
