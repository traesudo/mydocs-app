// components/GLBViewer.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

interface GLBViewerProps {
    url: string;
}

const GLBViewer: React.FC<GLBViewerProps> = ({ url }) => {
    const { scene } = useGLTF(url);
    return (
        <Canvas style={{ height: '100vh' }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <primitive object={scene} />
            <OrbitControls />
        </Canvas>
    );
};

export default GLBViewer;
