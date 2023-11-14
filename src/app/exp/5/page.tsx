"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements, useLoader } from "@react-three/fiber";
import { AdditiveBlending, BackSide, TextureLoader } from "three";
import { Stars } from "@react-three/drei";

import globeTexture from "@/assets/textures/globe-texture.jpg";
import globeVertexShader from "@/assets/shaders/globe-pix-vert.glsl";
import globeFragmentShader from "@/assets/shaders/globe-pix-frag.glsl";
import atmosphereVertexShader from "@/assets/shaders/atmosphere-vert.glsl";
import atmosphereFragmentShader from "@/assets/shaders/atmosphere-frag.glsl";

export default function Page() {
  return (
    <div id="canvas-container" className="h-screen w-full">
      <Canvas camera={{ fov: 45, position: [0, 0, 20], near: 0.1, far: 10000 }}>
        <ambientLight />
        <Globe position={[0, 0, 0]} />
        <Atmosphere position={[0, 0, 0]} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
}

function Globe(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame(
    (state, delta) => (meshRef.current.rotation.y += delta / (hovered ? 2 : 20))
  );

  const texture = useLoader(TextureLoader, globeTexture.src);

  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <sphereGeometry args={[5, 50, 50]} />
      <shaderMaterial
        vertexShader={globeVertexShader}
        fragmentShader={globeFragmentShader}
        uniforms={{
          globeTexture: { value: texture },
        }}
      />
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
