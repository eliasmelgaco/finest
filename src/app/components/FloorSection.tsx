"use client";

import React from "react";

interface FloorSectionProps {
  position: [number, number, number];
  size: [number, number]; // Width, Depth
  color: number;
}

const FloorSection: React.FC<FloorSectionProps> = ({
  position,
  size,
  color,
}) => {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[...size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default FloorSection;
