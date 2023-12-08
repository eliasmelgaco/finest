"use client";

import React from "react";
import { Vector3, DoubleSide } from "three";
import { Line } from "@react-three/drei";

interface FloorSectionProps {
  position: Vector3;
  rotation: [number, number, number];
  color: string;
}

const CapLineSegment: React.FC<FloorSectionProps> = ({
  position,
  rotation,
  color,
}) => {
  // Length of the cap line
  const capLength = 0.05; // Adjust as needed
  const pointSize = 0.015; // Size of the point

  // Points for the cap line
  const points = [
    new Vector3(-capLength / 3, 0, 0),
    new Vector3(capLength / 3, 0, 0),
  ];

  return (
    <>
      <Line
        points={points}
        position={position}
        rotation={rotation}
        color={color}
        lineWidth={2}
      />
      <mesh position={position} rotation={[-Math.PI / 2, 0, rotation[1]]}>
        <circleGeometry args={[pointSize / 2, 32]} />
        <meshBasicMaterial color={color} side={DoubleSide} />
      </mesh>
    </>
  );
};

export default CapLineSegment;
