"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Decal } from "@react-three/drei";
import {
  usePlane,
  PlaneProps,
  Physics,
  useBox,
  BoxProps,
  useSphere,
  SphereProps,
} from "@react-three/cannon";
import { Mesh } from "three";
import { useState } from "react";

export default function App() {
  const [boxes, setBoxes] = useState([
    { position: [8, 0.5, -8], removed: false },
    { position: [6, 0.5, -8], removed: false },
    { position: [4, 0.5, -8], removed: false },
    { position: [2, 0.5, -8], removed: false },
    { position: [0, 0.5, -8], removed: false },
    { position: [-2, 0.5, -8], removed: false },
    { position: [-4, 0.5, -8], removed: false },
    { position: [-6, 0.5, -8], removed: false },
    { position: [-8, 0.5, -8], removed: false },
    { position: [-5, 0.5, -6], removed: false },
    { position: [-6, 0.5, -4], removed: false },
    { position: [-1, 0.5, -6], removed: false },
    { position: [7, 0.5, -4], removed: false },
  ]);

  return (
    <div className="h-screen w-full bg-white">
      <Canvas shadows camera={{ position: [0, 20, 0], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <pointLight castShadow intensity={10} position={[-2, 10, 0]} />

        <Physics>
          <Plane count={boxes.filter((x) => !x.removed).length} />

          <group>
            <Bound position={[10, 1, 0]} rotation={[0, -Math.PI / 2, 0]} />
            <Bound position={[-10, 1, 0]} rotation={[0, -Math.PI / 2, 0]} />
            <Bound position={[0, 1, -10]} />
            <Bound position={[0, 1, 10]} />
          </group>

          <group>
            {boxes.map((x, i) =>
              x.removed ? null : (
                <Box
                  key={i}
                  position={x.position as any}
                  onCollide={(e) =>
                    setBoxes((prev) => {
                      const out = [...prev];
                      out[i].removed = true;
                      return out;
                    })
                  }
                />
              )
            )}
          </group>

          <Sphere />
        </Physics>

        <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
}

function Plane(props: PlaneProps & { count?: number }) {
  const [ref] = usePlane<Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    material: { friction: 0, restitution: 0 },
    ...props,
  }));

  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial shadowSide={1} color="#ffffff" />

      <Html center transform>
        <div className="text-2xl whitespace-nowrap">
          Boxes Remaining: {props.count}
        </div>
      </Html>
    </mesh>
  );
}

function Sphere(props: SphereProps) {
  const [ref] = useSphere<Mesh>(() => ({
    mass: 1,
    position: [4, 1.2, 4],
    velocity: [8, 0, 10],
    angularVelocity: [10, 2, 0],
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

function Bound(props: BoxProps) {
  const args = [20, 2, 0.5] as any;

  const [ref] = useBox<Mesh>(() => ({
    mass: 0,
    fixedRotation: true,
    material: { friction: 0, restitution: 1 },
    args,
    ...props,
  }));

  return (
    <mesh castShadow ref={ref}>
      <boxGeometry args={args} />
      <meshStandardMaterial color="black" />
    </mesh>
  );
}

function Box(props: BoxProps) {
  const args = [1, 1, 1] as any;

  const [ref] = useBox<Mesh>(() => ({
    mass: 0,
    fixedRotation: true,
    material: { friction: 0, restitution: 1 },
    args,
    ...props,
  }));

  return (
    <mesh castShadow ref={ref}>
      <boxGeometry args={args} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}
