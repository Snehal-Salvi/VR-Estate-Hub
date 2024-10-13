import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";

const VRTour = ({ image, onClose }) => {
  // Create a ref for the plane mesh
  const planeRef = React.useRef();

  // Load the texture using a TextureLoader
  const texture = new TextureLoader().load(image);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Canvas style={{ height: "100%", width: "100%" }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <mesh ref={planeRef}>
          <planeGeometry args={[5, 5]} />
          <meshStandardMaterial attach="material" map={texture} />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default VRTour;
