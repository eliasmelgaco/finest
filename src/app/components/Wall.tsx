"use client";

import React from "react";
import { Color, Euler, TextureLoader, Vector3 } from "three";

// const textureLoader = new TextureLoader();
// const wallTexture = textureLoader.load("/wall-texture.jpg");

interface WallProps {
  orientation: "horizontal" | "vertical";
  coordinates: [number, number, number];
  height: number;
  width: number;
  thickness: number;
  color: number;
}

const Wall: React.FC<WallProps> = ({
  orientation,
  coordinates,
  height,
  width,
  thickness,
  color,
}) => {
  let meshX = 0;
  let meshY = coordinates[1] + height / 2; // deep
  let meshZ = 0;

  if (orientation === "horizontal") {
    meshX = coordinates[0] + width / 2;
    meshZ = coordinates[2] - thickness / 2;
  }

  if (orientation === "vertical") {
    meshX = coordinates[0] - thickness / 2;
    meshZ = coordinates[2] + width / 2;
  }

  const meshPosition = new Vector3(meshX, meshY, meshZ);

  // const size: [
  //   width?: number | undefined,
  //   height?: number | undefined,
  //   depth?: number | undefined
  // ] = [width, height, thickness];

  return (
    <mesh
      position={meshPosition}
      rotation={new Euler(0, orientation === "horizontal" ? 0 : Math.PI / 2, 0)}
    >
      <boxGeometry args={[width, height, thickness]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Wall;
