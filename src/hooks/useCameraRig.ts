import { useLayoutEffect, useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

import { CAMERA_POSITION, CAMERA_TARGET } from '../constants';
import { useIsPointerInWindow } from './useIsPointerInWindow';

type CameraRigOptions = {
    /** gap kept between the subject and the left and bottom edges, in pixels */
    margin?: number;
    /** furthest the camera slides left or right of its rest position, in world units */
    horizontalReach?: number;
    /** furthest the camera slides up or down from its rest position, in world units */
    verticalReach?: number;
    /** how fast the camera catches up, in 1/seconds */
    smoothing?: number;
};

/**
 * Parks `subjectRef` in the bottom-left corner and keeps it there at any window
 * size, then lets the camera drift a little towards the cursor.
 *
 * The rig is translated rather than rotated — eye and target move together — so
 * the subject keeps its distance and therefore its size on screen, and so its
 * position on screen stays solvable in one pass. Moving the camera rather than
 * the subject also leaves her inside the directional light's shadow frustum,
 * which is a tight box around the origin. The floor and the fogged background
 * are featureless, so sliding across them doesn't show.
 */
export function useCameraRig(
    subjectRef: RefObject<THREE.Object3D | null>,
    {
        margin = 64,
        horizontalReach = 0.8,
        verticalReach = 0.45,
        smoothing = 2,
    }: CameraRigOptions = {},
) {
    const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;
    const size = useThree((state) => state.size);
    const isPointerInWindow = useIsPointerInWindow();

    const basis = useMemo(() => {
        const eye = new THREE.Vector3(...CAMERA_POSITION);
        const forward = new THREE.Vector3(...CAMERA_TARGET)
            .sub(eye)
            .normalize();
        const right = new THREE.Vector3()
            .crossVectors(forward, camera.up)
            .normalize();
        const up = new THREE.Vector3().crossVectors(right, forward).normalize();

        return { eye, forward, right, up };
    }, [camera]);

    const restPosition = useMemo(
        () => new THREE.Vector3(...CAMERA_POSITION),
        [],
    );
    const restTarget = useMemo(() => new THREE.Vector3(...CAMERA_TARGET), []);
    const tiltedPosition = useMemo(() => new THREE.Vector3(), []);

    const corner = useRef(new THREE.Vector3());
    const toCorner = useRef(new THREE.Vector3());

    useLayoutEffect(() => {
        const subject = subjectRef.current;
        if (!subject || !size.width || !size.height) return;

        const box = new THREE.Box3().setFromObject(subject);
        if (box.isEmpty()) return;

        const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
        const aspect = size.width / size.height;

        // where the subject's nearest edge should land, just inside the corner
        const edgeX = -1 + (2 * margin) / size.width;
        const edgeY = -1 + (2 * margin) / size.height;

        let slideRight = Infinity;
        let slideUp = Infinity;

        for (let index = 0; index < 8; index++) {
            corner.current.set(
                index & 1 ? box.max.x : box.min.x,
                index & 2 ? box.max.y : box.min.y,
                index & 4 ? box.max.z : box.min.z,
            );
            toCorner.current.subVectors(corner.current, basis.eye);

            const depth = toCorner.current.dot(basis.forward);
            if (depth <= 0) continue;

            // sliding the rig by `s` moves a point that far across the view, so
            // each corner gives the largest slide it can take before it crosses
            // the edge; the tightest of the eight is the one that has to hold
            slideRight = Math.min(
                slideRight,
                toCorner.current.dot(basis.right) -
                    edgeX * depth * tanHalfFov * aspect,
            );
            slideUp = Math.min(
                slideUp,
                toCorner.current.dot(basis.up) - edgeY * depth * tanHalfFov,
            );
        }

        if (!Number.isFinite(slideRight) || !Number.isFinite(slideUp)) return;

        restPosition
            .set(...CAMERA_POSITION)
            .addScaledVector(basis.right, slideRight)
            .addScaledVector(basis.up, slideUp);
        restTarget
            .set(...CAMERA_TARGET)
            .addScaledVector(basis.right, slideRight)
            .addScaledVector(basis.up, slideUp);

        // a resize is a layout change, not an animation, so take up the new
        // framing straight away instead of gliding to it
        camera.position.copy(restPosition);
        camera.lookAt(restTarget);
    }, [subjectRef, camera, size, margin, basis, restPosition, restTarget]);

    useFrame(({ pointer }, delta) => {
        tiltedPosition.copy(restPosition);

        if (isPointerInWindow.current) {
            tiltedPosition
                .addScaledVector(basis.right, pointer.x * horizontalReach)
                .addScaledVector(basis.up, pointer.y * verticalReach);
        }

        camera.position.lerp(tiltedPosition, 1 - Math.exp(-smoothing * delta));
        camera.lookAt(restTarget);
    });
}
