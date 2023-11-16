"use client";
// @refresh reset

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Mesh, Shader } from "three";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Physics, usePlane, useSphere } from "@react-three/cannon";

export default function App() {
  return (
    <div className="h-screen w-full bg-black">
      <Canvas shadows camera={{ position: [0, 2, 20], fov: 70 }}>
        <color attach="background" args={[0x9f9f9f]} />
        <ambientLight intensity={0.7} />
        <pointLight castShadow decay={1} position={[0, 20, 8]} intensity={5} />

        <Physics gravity={[0, -2, 0]}>
          <Plane />
          <Sphere />
        </Physics>

        <OrbitControls />
      </Canvas>
    </div>
  );
}

function Plane() {
  const matShader = useRef<Shader>();
  const collided = useRef<boolean>(false);

  const [ref] = usePlane<Mesh>(() => ({
    mass: 0,
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -8, 0],
    onCollideBegin: () => {
      if (collided.current) return;
      collided.current = true;

      if (!matShader.current) return;
      matShader.current.uniforms.iTimeStart.value = clock.getElapsedTime();
    },
  }));

  const { clock } = useThree();

  useFrame(({ clock }) => {
    if (!matShader.current || !collided) return;
    matShader.current.uniforms.iTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[50, 50, 100, 100]} />
      <meshPhongMaterial
        shininess={300}
        onBeforeCompile={(shader) => {
          shader.uniforms.iTime = { value: 0 };
          shader.uniforms.iTimeStart = { value: 0 };
          shader.vertexShader =
            `
              uniform float iTime;
              uniform float iTimeStart;
          ` + shader.vertexShader;

          const token = "#include <begin_vertex>";
          // equation for normals from:
          // https://stackoverflow.com/questions/9577868/glsl-calculate-surface-normal
          const customTransform = `
            vec3 transformed = vec3(position);

            if(iTimeStart > 0.0) {
              float time = (iTime - iTimeStart) * 4.;

              float dx = position.x;
              float dy = position.y;
              float freq = sqrt(dx*dx + dy*dy);
              float amp = min(0.8, 0.8 * (4. / freq) * (1. / time));
              float angle = -time * 2.0 + freq * 2.0;

              if(dx * dx + dy * dy < time * 32.){
                transformed.z += sin(angle)*amp;
                objectNormal = normalize(vec3(0.0,-amp * freq * cos(angle),1.0));
                vNormal = normalMatrix * objectNormal;
              }
            }
          `;
          shader.vertexShader = shader.vertexShader.replace(
            token,
            customTransform
          );
          matShader.current = shader;
        }}
      />
    </mesh>
  );
}

function Sphere() {
  const [ref] = useSphere<Mesh>(() => ({
    mass: 1,
    position: [0, 5, 0],
    material: { restitution: 0.1 },
    args: [2],
  }));

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[4, 32, 32]} />
      <meshStandardMaterial color={0xff0000} />
    </mesh>
  );
}
