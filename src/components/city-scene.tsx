"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const MODEL_URL = "/assets/models/wide-city.glb";

/** Re-grade a mesh's materials into the brand's grayscale ink palette. */
function gradeMaterials(node: THREE.Mesh) {
  const mats = Array.isArray(node.material) ? node.material : [node.material];
  mats.forEach((raw) => {
    const mat = raw as THREE.MeshStandardMaterial;
    if (!mat || mat.userData.__graded) return;
    mat.userData.__graded = true;

    const src = mat.color ? mat.color.clone() : new THREE.Color(0x8a8a8a);
    const lum = 0.2126 * src.r + 0.7152 * src.g + 0.0722 * src.b;
    const contrasted = THREE.MathUtils.clamp((lum - 0.5) * 1.35 + 0.5, 0, 1);
    const graded = Math.pow(contrasted, 1.28);
    const shade = 0.028 + graded * 0.93;

    mat.color = new THREE.Color(shade, shade, shade);
    if ("metalness" in mat) mat.metalness = 0.26;
    if ("roughness" in mat) mat.roughness = 0.58;
    if (mat.emissive) mat.emissive = new THREE.Color(0x000000);
    if ("envMapIntensity" in mat) mat.envMapIntensity = 0.95;
    if ("map" in mat) mat.map = null;
    mat.needsUpdate = true;
  });
}

function City() {
  const gltf = useGLTF(MODEL_URL);

  const { object, scale, position } = useMemo(() => {
    const object = gltf.scene;
    object.updateMatrixWorld(true);

    const box = new THREE.Box3();
    const corner = new THREE.Vector3();
    let wx = 0;
    let wz = 0;
    let wsum = 0;

    object.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (!mesh.isMesh) return;
      gradeMaterials(mesh);
      if (!mesh.geometry) return;

      mesh.geometry.computeBoundingBox();
      const b = mesh.geometry.boundingBox!;
      const dx = b.max.x - b.min.x;
      const dy = b.max.y - b.min.y;
      const dz = b.max.z - b.min.z;

      // Hide the wide flat ground slab so towers rise from the scene's own base.
      if (dx * dz > 20 && dy < 0.6) {
        mesh.visible = false;
        return;
      }

      (
        [
          [b.min.x, b.min.y, b.min.z],
          [b.max.x, b.max.y, b.max.z],
        ] as const
      ).forEach(([x, y, z]) => {
        corner.set(x, y, z).applyMatrix4(mesh.matrixWorld);
        box.expandByPoint(corner);
      });

      corner
        .set((b.min.x + b.max.x) / 2, 0, (b.min.z + b.max.z) / 2)
        .applyMatrix4(mesh.matrixWorld);
      const w = dy * dy;
      wx += corner.x * w;
      wz += corner.z * w;
      wsum += w;
    });

    const size = new THREE.Vector3();
    box.getSize(size);
    const footprint = Math.max(size.x, size.z) || 1;
    const scale = 16 / footprint;
    const clusterX = wsum ? wx / wsum : 0;
    const clusterZ = wsum ? wz / wsum : 0;

    // Offset the skyline right + down + back so the hero copy (upper-left)
    // sits over open paper, and the city reads as a discreet backdrop.
    const OFF_X = 4.6;
    const OFF_Y = -2.6;
    const OFF_Z = -2.2;

    return {
      object,
      scale,
      position: [
        -clusterX * scale + OFF_X,
        -box.min.y * scale + OFF_Y,
        -clusterZ * scale + OFF_Z,
      ] as [number, number, number],
    };
  }, [gltf]);

  return <primitive object={object} scale={scale} position={position} />;
}

/** Camera framings the rig glides between as the page scrolls (progress 0→1). */
const SCENES: { p: number; pos: [number, number, number]; look: [number, number, number] }[] = [
  { p: 0.0, pos: [0, 7.6, 19], look: [1.5, 2.2, 0] }, // hero — wide establishing
  { p: 0.34, pos: [7.5, 4.4, 14.5], look: [3, 3, -3] }, // services — low 3/4 push-in
  { p: 0.68, pos: [-7.5, 11, 15.5], look: [0, 3.6, -2] }, // why-us — high left aerial
  { p: 1.0, pos: [0.5, 9, 21], look: [1.2, 3, -1] }, // contact — calm wide pull-back
];

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

/** Scroll-choreographed camera with a gentle pointer parallax layered on top. */
function CameraRig() {
  const { camera, pointer } = useThree();
  const progress = useRef(0);
  const reduced = useRef(false);

  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetLook = useMemo(() => new THREE.Vector3(), []);
  const currentLook = useMemo(() => new THREE.Vector3(1.5, 2.2, 0), []);
  const a = useMemo(() => new THREE.Vector3(), []);
  const b = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useFrame((_, dt) => {
    const pr = reduced.current ? 0 : progress.current;

    // Find the scene segment for the current scroll progress and blend.
    let i = 0;
    while (i < SCENES.length - 2 && pr > SCENES[i + 1].p) i++;
    const s0 = SCENES[i];
    const s1 = SCENES[i + 1];
    const t = smoothstep((pr - s0.p) / (s1.p - s0.p || 1));

    targetPos.copy(a.set(...s0.pos)).lerp(b.set(...s1.pos), t);
    targetLook.copy(a.set(...s0.look)).lerp(b.set(...s1.look), t);

    if (!reduced.current) {
      targetPos.x += pointer.x * 0.8;
      targetPos.y += pointer.y * 0.5;
    }

    const ease = 1 - Math.exp(-3 * dt);
    camera.position.lerp(targetPos, ease);
    currentLook.lerp(targetLook, ease);
    camera.lookAt(currentLook);
  });

  return null;
}

export default function CityScene() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 7.6, 19], fov: 42, near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.6]}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.98;
        }}
      >
        <fogExp2 attach="fog" args={["#f3f3f0", 0.036]} />
        <hemisphereLight args={["#ffffff", "#191919", 1.4]} />
        <directionalLight position={[12, 16, 8]} intensity={1.76} />
        <directionalLight position={[-14, 9, -12]} intensity={0.6} />
        <pointLight
          position={[-9, 5, 10]}
          intensity={1.55}
          distance={50}
          decay={2}
          color="#f3f3f3"
        />

        {/* Neutral studio environment for reflective, premium edges (self-contained). */}
        <Environment resolution={256} background={false}>
          <color attach="background" args={["#585858"]} />
          <Lightformer
            intensity={2}
            position={[0, 8, 2]}
            scale={[14, 14, 1]}
            rotation-x={Math.PI / 2}
            color="#ffffff"
          />
          <Lightformer
            intensity={1.1}
            position={[-7, 3, 5]}
            scale={[6, 8, 1]}
            color="#dcdcdc"
          />
          <Lightformer
            intensity={0.8}
            position={[7, 2, 4]}
            scale={[5, 6, 1]}
            color="#bcbcbc"
          />
        </Environment>

        <Suspense fallback={null}>
          <City />
        </Suspense>
        <CameraRig />
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
