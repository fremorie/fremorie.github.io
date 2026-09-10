import { useRef } from 'react';
import * as THREE from 'three';

import { Environment } from './Environment';
import { Kisa } from './monsters/Kisa';
import { Stage } from './Stage';
import { useCameraRig } from './hooks/useCameraRig';

export function Experience() {
    const kisaRef = useRef<THREE.Group>(null);

    useCameraRig(kisaRef);

    return (
        <>
            <Kisa ref={kisaRef} />

            <Stage />
            <Environment />
        </>
    );
}
