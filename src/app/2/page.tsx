"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

import globeTexture from "@/assets/textures/globe-texture.jpg";

export default function Page() {
  return (
    <div id="canvas-container" className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight />
        <Globe position={[0, 0, 0]} />
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
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
