import { useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

import { Environment } from './Environment';
import { Kisa } from './monsters/Kisa';
import { Stage } from './Stage';
import { useCameraRig } from './hooks/useCameraRig';
import { NARROW_VIEWPORT } from './constants';

export function Experience() {
    const kisaRef = useRef<THREE.Group>(null);
    const width = useThree((state) => state.size.width);

    /*
     * On a narrow screen the page stacks into one column and its content runs
     * the full width, so Kisa shrinks and tucks closer to the corner. Page.css
     * reserves the band she sits in.
     */
    const isNarrow = width > 0 && width <= NARROW_VIEWPORT;

    useCameraRig(kisaRef, { margin: isNarrow ? 24 : 48 });

    return (
        <>
            <Kisa ref={kisaRef} scale={isNarrow ? 0.7 : 1} />

            <Stage />
            <Environment />
        </>
    );
}
