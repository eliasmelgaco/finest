import React from "react";
import { TextureLoader } from "three";

interface FloorProps {
  position: [number, number, number];
  size: [number, number]; // Largura e Profundidade do piso
}

const textureLoader = new TextureLoader();
const floorTexture = textureLoader.load("/floor-texture.jpg");

const Floor: React.FC<FloorProps> = ({ position, size }) => {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[...size, 1]} />
      <meshStandardMaterial map={floorTexture} />
    </mesh>
  );
};

export default Floor;
