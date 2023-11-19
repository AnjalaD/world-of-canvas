"use client";
// @refresh reset

import { BufferGeometry, EllipseCurve, Mesh, Line } from "three";
import { useRef } from "react";

import { Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

import sunTexture from "./sun.jpg";
import mercuryTexture from "./mercury.jpg";
import venusTexture from "./venus.jpg";
import earthTexture from "./earth.jpg";
import marsTexture from "./mars.jpg";
import jupiterTexture from "./jupiter.jpg";
import saturnTexture from "./saturn.jpg";
import uranusTexture from "./uranus.jpg";
import neptuneTexture from "./neptune.jpg";

extend({ ThreeLine: Line });

const sun = {
  name: "Sun",
  textureSrc: sunTexture.src,
  radiusKm: 695700 / 10,
  dayHours: 648,
  yearHours: 0,
  distanceKm: 0,
};

const planets = [
  {
    name: "Mercury",
    textureSrc: mercuryTexture.src,
    radiusKm: 2439.7,
    dayHours: 4222.6,
    yearHours: 88.0 * 24,
    distanceKm: 57910000,
  },
  {
    name: "Venus",
    textureSrc: venusTexture.src,
    radiusKm: 6051.8,
    dayHours: 2802,
    yearHours: 224.7 * 24,
    distanceKm: 108200000,
  },
  {
    name: "Earth",
    textureSrc: earthTexture.src,
    radiusKm: 6371,
    dayHours: 23.9,
    yearHours: 365.2 * 24,
    distanceKm: 149600000,
  },
  {
    name: "Mars",
    textureSrc: marsTexture.src,
    radiusKm: 3389.5,
    dayHours: 24.7,
    yearHours: 687.0 * 24,
    distanceKm: 227900000,
  },
  {
    name: "Jupiter",
    textureSrc: jupiterTexture.src,
    radiusKm: 69911,
    dayHours: 9.9,
    yearHours: 4331 * 24,
    distanceKm: 778500000,
  },
  {
    name: "Saturn",
    textureSrc: saturnTexture.src,
    radiusKm: 58232,
    dayHours: 10.7,
    yearHours: 10747 * 24,
    distanceKm: 1433000000,
  },
  {
    name: "Uranus",
    textureSrc: uranusTexture.src,
    radiusKm: 25362,
    dayHours: 17.2,
    yearHours: 30589 * 24,
    distanceKm: 2877000000,
  },
  {
    name: "Neptune",
    textureSrc: neptuneTexture.src,
    radiusKm: 24622,
    dayHours: 16.1,
    yearHours: 59800 * 24,
    distanceKm: 4503000000,
  },
];

const radiusFactor = 0.0001;
const timeFactor = 10000;
const distanceFactor = 0.00000015;

export default function App() {
  return (
    <div className="h-screen w-full bg-black">
      <Canvas camera={{ position: [0, 20, 50], fov: 90 }}>
        <ambientLight />

        <Planet {...sun} />

        {planets.map((planet) => (
          <Planet key={planet.name} {...planet} />
        ))}

        <OrbitControls />
      </Canvas>
    </div>
  );
}

type PlanetProps = (typeof planets)[number];
function Planet({
  radiusKm,
  distanceKm,
  dayHours,
  yearHours,
  name,
  textureSrc,
}: PlanetProps) {
  const distance = distanceKm * distanceFactor;
  const radius = radiusKm * radiusFactor;

  const ref = useRef<Mesh>(null);

  const texture = useTexture(textureSrc);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    // set rotation around self
    const t = clock.getElapsedTime() * timeFactor;
    ref.current.rotation.y = t / dayHours;

    // set rotation around sun
    if (distance === 0) return; // sun is not moving around itself (it is the center

    ref.current.position.x = distance * Math.cos(t / yearHours);
    ref.current.position.z = distance * Math.sin(t / yearHours);
  });

  return (
    <group>
      <mesh ref={ref} position={[distance, 0, 0]}>
        <sphereGeometry args={[radius, 50, 50]} />
        <meshStandardMaterial map={texture} />
        {/* <Html>{name}</Html> */}
      </mesh>
      <threeLine
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        geometry={new BufferGeometry().setFromPoints(
          new EllipseCurve(
            0,
            0,
            distance,
            distance,
            0,
            2 * Math.PI,
            false,
            0
          ).getPoints(50)
        )}
      >
        <lineBasicMaterial transparent color="white" opacity={0.2} />
      </threeLine>
    </group>
  );
}
