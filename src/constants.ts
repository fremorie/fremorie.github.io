/**
 * Shared by the canvas background and the fog, so the horizon disappears.
 * Kept in step with the page background in App.css.
 */
export const BACKGROUND = '#a4988e';

/**
 * Shared by the light itself and the pupil response, so they can't drift apart.
 */
export const DIRECTIONAL_LIGHT_POSITION: [number, number, number] = [
    22, 18, 30,
];

/** The lighting is fixed, so these are plain constants. */
export const AMBIENT_LIGHT_INTENSITY = 1.5;
export const DIRECTIONAL_LIGHT_INTENSITY = 6.5;
export const ENVIRONMENT_MAP_INTENSITY = 0.2;

/**
 * Where the layout stacks and Kisa has to make room for it. Kept in step with
 * the breakpoint in Page.css.
 */
export const NARROW_VIEWPORT = 900;

export const CAMERA_POSITION: [number, number, number] = [-10, 13, 102];
export const CAMERA_TARGET: [number, number, number] = [31, 25.5, 0];
