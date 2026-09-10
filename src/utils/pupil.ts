import * as THREE from 'three';

export function getLightAlignment(
    gazeDotLightDirection: number,
    alignmentMin: number,
    alignmentMax: number,
) {
    return THREE.MathUtils.smoothstep(
        gazeDotLightDirection,
        alignmentMin,
        alignmentMax,
    );
}

type ExposureInput = {
    lightAlignment: number;
    gazeIndependentLightShare: number;
};

/** How much light reaches the eye, given where it is looking. */
export function getExposure({
    lightAlignment,
    gazeIndependentLightShare,
}: ExposureInput) {
    const gazeDependentLightShare = 1 - gazeIndependentLightShare;

    return gazeIndependentLightShare + gazeDependentLightShare * lightAlignment;
}

export function getPupilOpenness(
    exposure: number,
    exposureMin: number,
    exposureMax: number,
) {
    const constriction = THREE.MathUtils.smoothstep(
        exposure,
        exposureMin,
        exposureMax,
    );

    return 1 - constriction;
}
