"use client";

import React from "react";
import { Text } from "@react-three/drei";
import { Vector3, Euler } from "three";

interface TextWithBackgroundProps {
  position: [number, number, number];
  rotation?: Euler;
  text: string;
  color: string;
  backgroundColor?: string;
  fontSize?: number;
}

const TextWithBackground: React.FC<TextWithBackgroundProps> = ({
  position,
  rotation = new Euler(-Math.PI / 2, 0, 0),
  text,
  color,
  backgroundColor = "rgba(255, 255, 255, 0.5)",
  fontSize = 0.1,
}) => {
  const textPadding = 0.005;
  const textWidth = text.length * fontSize * 0.55; // Approximate width of text
  const planeWidth = textWidth + textPadding;
  const planeHeight = fontSize * 1.2;
  const vectorPosition = new Vector3(...position);

  return (
    <group position={vectorPosition}>
      <mesh position={[0, position[1] - 0.0002, 0]} rotation={rotation}>
        <planeGeometry args={[planeWidth, planeHeight]} />
        <meshBasicMaterial color={backgroundColor} />
      </mesh>
      <Text
        fontSize={fontSize}
        color={color}
        rotation={rotation}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
};

export default TextWithBackground;
