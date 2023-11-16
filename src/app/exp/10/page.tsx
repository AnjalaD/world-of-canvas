"use client";
// @refresh reset
import { Canvas, useFrame } from "@react-three/fiber";
import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { Vector2 } from "three";
import { useEffect, useRef } from "react";

export default function App() {
  return (
    <div className="h-screen w-full bg-black">
      <Canvas shadows camera={{ position: [0, 0, 1], fov: 100 }}>
        <Plane />
      </Canvas>
    </div>
  );
}

function Plane() {
  const uniforms = useRef({
    iTime: { value: 1.0 },
    iResolution: { value: new Vector2() },
    iMouse: { value: new Vector2() },
  });

  useEffect(() => {
    uniforms.current.iResolution.value.x = window.innerWidth;
    uniforms.current.iResolution.value.y = window.innerHeight;

    const mouseMove = (e: MouseEvent) => {
      uniforms.current.iMouse.value.x = e.clientX;
      uniforms.current.iMouse.value.y = e.clientY;
    };

    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  useFrame(({ clock }) => {
    uniforms.current.iTime.value = clock.getElapsedTime();
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}
