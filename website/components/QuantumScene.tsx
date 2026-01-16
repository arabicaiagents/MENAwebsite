/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Line, Stars, Environment, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const DigitalTile = ({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) => {
    const mesh = useRef<THREE.Mesh>(null);
    
    useFrame((state) => {
        if (mesh.current) {
            const t = state.clock.getElapsedTime();
            mesh.current.rotation.x = Math.sin(t * speed) * 0.5;
            mesh.current.rotation.y = Math.cos(t * speed) * 0.5;
            mesh.current.position.y = position[1] + Math.sin(t + position[0]) * 0.2;
        }
    });

    return (
        <Icosahedron args={[0.5, 0]} position={position} ref={mesh}>
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} wireframe />
        </Icosahedron>
    );
};

export const DigitalMosaicScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#1C69D4" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#E07A5F" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            {/* Central Hub */}
            <Sphere args={[1.5, 64, 64]}>
                <MeshDistortMaterial 
                    color="#1C69D4" 
                    envMapIntensity={1} 
                    clearcoat={1} 
                    roughness={0}
                    metalness={0.2}
                    distort={0.3} 
                    speed={1.5} 
                />
            </Sphere>
            
            {/* Floating Tiles (Abstract Zellige) */}
            <group>
                <DigitalTile position={[3, 1, 0]} color="#E07A5F" speed={0.5} />
                <DigitalTile position={[-3, -1, 1]} color="#E07A5F" speed={0.6} />
                <DigitalTile position={[2, -2, -1]} color="#2D3033" speed={0.4} />
                <DigitalTile position={[-2, 2, -2]} color="#2D3033" speed={0.7} />
                <DigitalTile position={[0, 3, 0]} color="#E07A5F" speed={0.3} />
            </group>
        </Float>

        <Environment preset="city" />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};

const NetworkNode = ({ position, delay }: { position: [number, number, number], delay: number }) => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if(ref.current) {
            const t = state.clock.getElapsedTime();
            const scale = 1 + Math.sin(t * 2 + delay) * 0.2;
            ref.current.scale.set(scale, scale, scale);
        }
    });
    return (
        <mesh position={position} ref={ref}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#1C69D4" />
        </mesh>
    )
}

export const GlobalConnectionScene: React.FC = () => {
    return (
        <div className="w-full h-full absolute inset-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <group rotation={[0.2, 0.5, 0]}>
                    {/* Globe Wireframe */}
                    <Sphere args={[2, 32, 32]}>
                        <meshBasicMaterial color="#E07A5F" wireframe transparent opacity={0.1} />
                    </Sphere>
                    
                    {/* Connecting Nodes (Morocco -> London -> Dubai -> Paris) */}
                    <NetworkNode position={[0.2, 0.5, 1.9]} delay={0} /> {/* Morocco approx */}
                    <NetworkNode position={[0.1, 1.2, 1.5]} delay={1} /> {/* London approx */}
                    <NetworkNode position={[1.5, 0.3, 1.2]} delay={2} /> {/* Dubai approx */}
                    
                    {/* Arcs */}
                    <Line points={[[0.2, 0.5, 1.9], [0.1, 1.2, 1.5]]} color="#1C69D4" lineWidth={1} transparent opacity={0.5} />
                    <Line points={[[0.2, 0.5, 1.9], [1.5, 0.3, 1.2]]} color="#1C69D4" lineWidth={1} transparent opacity={0.5} />
                </group>
                <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                     <group position={[2, 0, 0]}>
                        <DigitalTile position={[0,0,0]} color="#1C69D4" speed={1}/>
                     </group>
                </Float>
                <Environment preset="studio" />
            </Canvas>
        </div>
    )
}