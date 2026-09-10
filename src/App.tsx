import { Suspense, useCallback, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { Preload } from '@react-three/drei';
import { Leva } from 'leva';

import { Experience } from './Experience';
import { Page } from './Page';
import { useDebug } from './hooks/useDebug';
import { CAMERA_POSITION, CAMERA_TARGET } from './constants';
import './App.css';

/**
 * Sits inside the Suspense boundary, so it can only mount once everything in
 * the scene has actually loaded.
 */
function Ready({ onReady }: { onReady: () => void }) {
    useEffect(onReady, [onReady]);

    return null;
}

function App() {
    const debug = useDebug();
    const [isReady, setIsReady] = useState(false);
    const handleReady = useCallback(() => setIsReady(true), []);

    return (
        <>
            <Canvas
                className={`scene${isReady ? ' scene--ready' : ''}`}
                shadows
                /* the site content covers the canvas, so pointer events have to
                   be read from the page instead of from the canvas itself */
                eventSource={document.body}
                eventPrefix="client"
                camera={{
                    fov: 35,
                    near: 1,
                    far: 500,
                    position: CAMERA_POSITION,
                }}
                onCreated={({ camera }) => camera.lookAt(...CAMERA_TARGET)}
            >
                <Suspense fallback={null}>
                    <Experience />
                    <Preload all />
                    <Ready onReady={handleReady} />
                </Suspense>

                {debug && <Perf position="top-left" />}
            </Canvas>

            <Page />

            <Leva
                hidden={!debug}
                theme={{ sizes: { rootWidth: '350px' } }}
                collapsed
            />
        </>
    );
}

export default App;
