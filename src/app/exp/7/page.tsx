"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  usePlane,
  PlaneProps,
  Physics,
  useSphere,
  SphereProps,
} from "@react-three/cannon";
import { Mesh } from "three";

export default function App() {
  return (
    <div className="h-screen w-full bg-white">
      <Canvas shadows camera={{ position: [10, 15, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <pointLight castShadow intensity={10} position={[-2, 10, 0]} />

        <Physics>
          <Plane />
          <Sphere />
        </Physics>

        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}

function Plane(props: PlaneProps) {
  const [ref] = usePlane<Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    material: { friction: 0, restitution: 1 },
    ...props,
  }));

  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial shadowSide={1} color="#ffffff" />
    </mesh>
  );
}

function Sphere(props: SphereProps) {
  const [ref] = useSphere<Mesh>(() => ({
    mass: 1,
    position: [0, 5, 0],
    material: { friction: 0, restitution: 1 },
    ...props,
  }));

  return (
    <mesh castShadow ref={ref}>
      <sphereGeometry />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
