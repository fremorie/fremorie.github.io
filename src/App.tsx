import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { Preload } from '@react-three/drei';
import { Leva } from 'leva';

import { Experience } from './Experience';
import { useDebug } from './hooks/useDebug';
import { CAMERA_POSITION, CAMERA_TARGET } from './constants';
import './App.css';

function App() {
    const debug = useDebug();

    return (
        <>
            <Canvas
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
                </Suspense>

                {debug && <Perf position="top-left" />}
            </Canvas>

            <Leva
                hidden={!debug}
                theme={{ sizes: { rootWidth: '350px' } }}
                collapsed
            />
        </>
    );
}

export default App;
