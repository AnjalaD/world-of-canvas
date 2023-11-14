"use client";

import { useRef } from "react";
import { Canvas, ThreeElements, useFrame, useLoader } from "@react-three/fiber";
import { MeshPortalMaterial, OrbitControls, Stars } from "@react-three/drei";
import { AdditiveBlending, BackSide, TextureLoader } from "three";

import globeTexture from "@/assets/textures/globe-texture.jpg";
import atmosphereVertexShader from "@/assets/shaders/atmosphere-vert.glsl";
import atmosphereFragmentShader from "@/assets/shaders/atmosphere-frag.glsl";

export default function App() {
  return (
    <div className="h-screen w-full bg-green-200">
      <Canvas camera={{ fov: 75, position: [0, 0, 20] }} eventPrefix="client">
        <OrbitControls enableZoom={false} enablePan={false} />

        <mesh rotation={[0, -Math.PI, 0]}>
          <planeGeometry args={[12, 16]} />
          <meshBasicMaterial color={"#121221"} />
        </mesh>

        <mesh>
          <planeGeometry args={[12, 16]} />
          <MeshPortalMaterial>
            <color attach="background" args={[0x000000]} />

            <Globe position={[0, 0, -4]} />
            <Atmosphere position={[0, 0, -4]} />
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
          </MeshPortalMaterial>
        </mesh>
      </Canvas>
    </div>
  );
}

function Globe(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);

  const texture = useLoader(TextureLoader, globeTexture.src);

  useFrame(() => (meshRef.current.rotation.y += 0.001));

  return (
    <mesh {...props} ref={meshRef}>
      <sphereGeometry args={[5, 50, 50]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

function Atmosphere(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);

  return (
    <mesh {...props} ref={meshRef} scale={1.1}>
      <sphereGeometry args={[5, 50, 50]} />
      <shaderMaterial
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        blending={AdditiveBlending}
        side={BackSide}
      />
    </mesh>
  );
}
